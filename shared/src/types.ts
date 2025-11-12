export interface Promotion {
  id: string;
  title: string;
  merchant: string;
  rewardAmount: number;
  rewardCurrency: string;
  description: string;
  terms: string;
  thumbnailUrl: string;
  expiresAt: Date;
  createdAt: Date;
  isFavorite: boolean;
  daysUntilExpiry?: number;
}

export interface Favorite {
  id: string;
  userId: string;
  promotionId: string;
  createdAt: Date;
  promotion: Promotion;
}

export enum ErrorCode {
  PROMOTION_NOT_FOUND = 'PROMOTION_NOT_FOUND',
  PROMOTION_EXPIRED = 'PROMOTION_EXPIRED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  errorCode?: ErrorCode;
  traceId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface FavoritesMetadata {
  totalFavorites: number;
  totalPotentialRewards: number;
  activeFavorites: number;
  expiredFavorites: number;
}