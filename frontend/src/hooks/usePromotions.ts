import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

interface Promotion {
  id: string;
  title: string;
  merchant: string;
  rewardAmount: number;
  rewardCurrency: string;
  description: string;
  thumbnailUrl: string;
  expiresAt: string;
  isFavorite: boolean;
  daysUntilExpiry: number;
}

interface PromotionsResponse {
  data: Promotion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function usePromotions(params?: { q?: string; merchant?: string; page?: number }) {
  return useQuery({
    queryKey: ['promotions', params],
    queryFn: async (): Promise<PromotionsResponse> => {
      const searchParams = new URLSearchParams();
      if (params?.q) searchParams.set('q', params.q);
      if (params?.merchant) searchParams.set('merchant', params.merchant);
      if (params?.page) searchParams.set('page', params.page.toString());
      
      const response = await axios.get(`${API_BASE}/promotions?${searchParams}`);
      return response.data.data;
    },
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE}/promotions/favorites`);
      return response.data.data;
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      console.log('Toggle favorite:', id, 'isFavorite:', isFavorite);
      if (isFavorite) {
        const response = await axios.delete(`${API_BASE}/promotions/${id}/favorite`);
        console.log('Delete response:', response);
      } else {
        const response = await axios.post(`${API_BASE}/promotions/${id}/favorite`);
        console.log('Add response:', response);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (error) => {
      console.error('Toggle favorite error:', error);
    },
  });
}