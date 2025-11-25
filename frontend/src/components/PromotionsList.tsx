'use client';

import { useState } from 'react';
import { usePromotions, useToggleFavorite } from '../hooks/usePromotions';
import PromotionCard from './PromotionCard';
import toast from 'react-hot-toast';

export default function PromotionsList() {
  const [search, setSearch] = useState('');
  const [merchant, setMerchant] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePromotions({ q: search, merchant, page });
  const toggleFavorite = useToggleFavorite();

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await toggleFavorite.mutateAsync({ id, isFavorite });
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg">
        Error loading promotions
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search promotions..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All merchants</option>
          <option value="CoffeePlus">CoffeePlus</option>
          <option value="TechStore">TechStore</option>
        </select>
      </div>

      {/* Promotions Grid */}
      <div className="space-y-6">
        {data?.data.length === 0 ? (
          <div className="text-center p-12 text-gray-500 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No promotions found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          data?.data.map((promotion) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 bg-white rounded-xl shadow-lg p-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-600 font-medium">
            Page {page} of {data.pagination.totalPages}
          </span>
          <button
            disabled={page === data.pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}