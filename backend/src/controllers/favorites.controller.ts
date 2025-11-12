import { Controller, Post, Delete, Get, Param, UseGuards, Req, Query, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { FavoritesService } from '../services/favorites.service';
import { AuthGuard } from '../guards/auth.guard';
import { PaginationQueryDto, ApiResponseDto, ErrorCode } from '../dto';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

@Controller('promotions')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':promotionId/favorite')
  async addFavorite(
    @Param('promotionId') promotionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const result = await this.favoritesService.addFavorite(promotionId, req.user.id);
      return new ApiResponseDto(200, 'Promotion favorited successfully', result);
    } catch (error) {
      if (error.status === 404) {
        return new ApiResponseDto(404, error.message, null, ErrorCode.PROMOTION_NOT_FOUND);
      }
      if (error.status === 400) {
        return new ApiResponseDto(400, error.message, null, ErrorCode.PROMOTION_EXPIRED);
      }
      return new ApiResponseDto(500, 'Failed to favorite promotion', null, ErrorCode.INTERNAL_ERROR);
    }
  }

  @Delete(':promotionId/favorite')
  async removeFavorite(
    @Param('promotionId') promotionId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const result = await this.favoritesService.removeFavorite(promotionId, req.user.id);
      return new ApiResponseDto(200, 'Promotion unfavorited successfully', result);
    } catch (error) {
      if (error.status === 404) {
        return new ApiResponseDto(404, error.message, null, ErrorCode.PROMOTION_NOT_FOUND);
      }
      return new ApiResponseDto(500, 'Failed to unfavorite promotion', null, ErrorCode.INTERNAL_ERROR);
    }
  }

  @Get('favorites')
  async getFavorites(
    @Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      const result = await this.favoritesService.getUserFavorites(query, req.user.id);
      return new ApiResponseDto(200, 'Favorites retrieved successfully', result);
    } catch (error) {
      return new ApiResponseDto(500, 'Failed to retrieve favorites', null, ErrorCode.INTERNAL_ERROR);
    }
  }
}