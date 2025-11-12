import { z } from 'zod';

export const PromotionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  merchant: z.string().min(1),
  rewardAmount: z.number().positive(),
  rewardCurrency: z.string().length(3),
  description: z.string().min(1),
  terms: z.string().min(1),
  thumbnailUrl: z.string().url(),
  expiresAt: z.date(),
  createdAt: z.date(),
  isFavorite: z.boolean(),
  daysUntilExpiry: z.number().optional(),
});

export const PaginationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(10),
  q: z.string().optional(),
  merchant: z.string().optional(),
  expiresBefore: z.string().datetime().optional(),
});