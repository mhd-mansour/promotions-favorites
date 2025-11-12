import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Promotion, Favorite } from '../entities';
import { PaginationQueryDto, PromotionResponseDto, PaginatedPromotionsDto } from '../dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async findAll(query: PaginationQueryDto, userId: string): Promise<PaginatedPromotionsDto> {
    const { page = 1, limit = 10, q, merchant, expiresBefore, expiresAfter } = query;
    const skip = (page - 1) * limit;

    let queryBuilder: SelectQueryBuilder<Promotion> = this.promotionRepository
      .createQueryBuilder('promotion');

    // Apply filters
    if (q) {
      queryBuilder.andWhere(
        '(promotion.title LIKE :search OR promotion.merchant LIKE :search)',
        { search: `%${q}%` }
      );
    }

    if (merchant) {
      queryBuilder.andWhere('promotion.merchant = :merchant', { merchant });
    }

    if (expiresBefore) {
      queryBuilder.andWhere('promotion.expiresAt <= :expiresBefore', { expiresBefore: new Date(expiresBefore) });
    }

    if (expiresAfter) {
      queryBuilder.andWhere('promotion.expiresAt >= :expiresAfter', { expiresAfter: new Date(expiresAfter) });
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination and get results
    const promotions = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('promotion.createdAt', 'DESC')
      .getMany();

    // Get user favorites
    const favoritePromotionIds = await this.getUserFavoriteIds(userId);

    // Transform to response DTOs
    const data = promotions.map(promotion => this.toResponseDto(promotion, favoritePromotionIds.has(promotion.id)));

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, userId: string): Promise<PromotionResponseDto | null> {
    const promotion = await this.promotionRepository.findOne({ where: { id } });
    if (!promotion) return null;

    const favoritePromotionIds = await this.getUserFavoriteIds(userId);
    return this.toResponseDto(promotion, favoritePromotionIds.has(id));
  }

  private async getUserFavoriteIds(userId: string): Promise<Set<string>> {
    const favorites = await this.favoriteRepository.find({
      where: { userId },
      select: ['promotionId'],
    });
    return new Set(favorites.map(f => f.promotionId));
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