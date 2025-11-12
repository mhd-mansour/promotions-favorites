import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion, Favorite, AuditEvent, AuditAction } from '../entities';
import { PromotionResponseDto, FavoritesMetadataDto, PaginatedPromotionsDto, PaginationQueryDto } from '../dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(AuditEvent)
    private auditRepository: Repository<AuditEvent>,
  ) {}

  async addFavorite(promotionId: string, userId: string): Promise<PromotionResponseDto> {
    // Check if promotion exists and is not expired
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId } });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    if (new Date() > promotion.expiresAt) {
      throw new BadRequestException('Cannot favorite expired promotion');
    }

    // Check if already favorited (idempotent)
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { userId, promotionId },
    });

    if (!existingFavorite) {
      // Create favorite
      const favorite = this.favoriteRepository.create({ userId, promotionId });
      await this.favoriteRepository.save(favorite);

      // Create audit event
      await this.createAuditEvent(userId, promotionId, AuditAction.FAVORITED);
    }

    return this.toResponseDto(promotion, true);
  }

  async removeFavorite(promotionId: string, userId: string): Promise<PromotionResponseDto> {
    const promotion = await this.promotionRepository.findOne({ where: { id: promotionId } });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    // Remove favorite (idempotent)
    const result = await this.favoriteRepository.delete({ userId, promotionId });
    
    if (result.affected && result.affected > 0) {
      // Create audit event only if favorite was actually removed
      await this.createAuditEvent(userId, promotionId, AuditAction.UNFAVORITED);
    }

    return this.toResponseDto(promotion, false);
  }

  async getUserFavorites(query: PaginationQueryDto, userId: string): Promise<PaginatedPromotionsDto & { metadata: FavoritesMetadataDto }> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Get user favorites with promotions, sorted by soonest expiry
    const favoritesQuery = this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.promotion', 'promotion')
      .where('favorite.userId = :userId', { userId })
      .orderBy('promotion.expiresAt', 'ASC');

    const total = await favoritesQuery.getCount();
    const favorites = await favoritesQuery.skip(skip).take(limit).getMany();

    const promotions = favorites.map(f => f.promotion);
    const data = promotions.map(promotion => this.toResponseDto(promotion, true));

    // Calculate metadata
    const allFavorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.promotion', 'promotion')
      .where('favorite.userId = :userId', { userId })
      .getMany();

    const now = new Date();
    const activeFavorites = allFavorites.filter(f => f.promotion.expiresAt > now);
    const expiredFavorites = allFavorites.filter(f => f.promotion.expiresAt <= now);
    const totalPotentialRewards = activeFavorites.reduce((sum, f) => sum + Number(f.promotion.rewardAmount), 0);

    const metadata: FavoritesMetadataDto = {
      totalFavorites: allFavorites.length,
      totalPotentialRewards,
      activeFavorites: activeFavorites.length,
      expiredFavorites: expiredFavorites.length,
    };

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      metadata,
    };
  }

  private async createAuditEvent(userId: string, promotionId: string, action: AuditAction): Promise<void> {
    const auditEvent = this.auditRepository.create({
      userId,
      promotionId,
      action,
    });
    await this.auditRepository.save(auditEvent);
  }

  private toResponseDto(promotion: Promotion, isFavorite: boolean): PromotionResponseDto {
    const now = new Date();
    const expiresAt = new Date(promotion.expiresAt);
    const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      id: promotion.id,
      title: promotion.title,
      titleAr: promotion.titleAr,
      merchant: promotion.merchant,
      merchantAr: promotion.merchantAr,
      rewardAmount: promotion.rewardAmount,
      rewardCurrency: promotion.rewardCurrency,
      description: promotion.description,
      descriptionAr: promotion.descriptionAr,
      terms: promotion.terms,
      termsAr: promotion.termsAr,
      thumbnailUrl: promotion.thumbnailUrl,
      expiresAt: promotion.expiresAt,
      createdAt: promotion.createdAt,
      isFavorite,
      daysUntilExpiry: daysUntilExpiry > 0 ? daysUntilExpiry : undefined,
    };
  }
}