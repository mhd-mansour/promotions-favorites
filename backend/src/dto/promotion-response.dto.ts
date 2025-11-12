export class PromotionResponseDto {
  id: string;
  title: string;
  titleAr?: string;
  merchant: string;
  merchantAr?: string;
  rewardAmount: number;
  rewardCurrency: string;
  description: string;
  descriptionAr?: string;
  terms: string;
  termsAr?: string;
  thumbnailUrl: string;
  expiresAt: Date;
  createdAt: Date;
  isFavorite: boolean;
  daysUntilExpiry?: number;
}

export class PaginatedPromotionsDto {
  data: PromotionResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class FavoritesMetadataDto {
  totalFavorites: number;
  totalPotentialRewards: number;
  activeFavorites: number;
  expiredFavorites: number;
}