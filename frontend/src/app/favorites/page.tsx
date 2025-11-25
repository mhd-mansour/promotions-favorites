'use client';

import { useState } from 'react';
import { useFavorites, useToggleFavorite } from '../../hooks/usePromotions';
import PromotionCard from '../../components/PromotionCard';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active');
  const { data, isLoading, error } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await toggleFavorite.mutateAsync({ id, isFavorite });
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove favorite');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
        <div className="text-center p-8 text-red-600 bg-red-50 rounded-xl shadow-lg">
          Error loading favorites
        </div>
      </div>
    );
  }

  const activeFavorites = data?.data?.filter((fav: any) => fav.daysUntilExpiry > 0) || [];
  const expiredFavorites = data?.data?.filter((fav: any) => fav.daysUntilExpiry <= 0) || [];

  const currentFavorites = activeTab === 'active' ? activeFavorites : expiredFavorites;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Link href="/" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">←</span>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                My Favorites
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {data?.metadata && (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {data.metadata.totalFavorites}
                </div>
                <div className="text-gray-600 font-medium">Total Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${data.metadata.totalPotentialRewards}
                </div>
                <div className="text-gray-600 font-medium">Potential Rewards</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-2 mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Active ({activeFavorites.length})
            </button>
            <button
              onClick={() => setActiveTab('expired')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'expired'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Expired ({expiredFavorites.length})
            </button>
          </div>
        </div>

        {/* Favorites List */}
        <div className="space-y-6">
          {currentFavorites.length === 0 ? (
            <div className="text-center p-12 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
              <div className="text-8xl mb-6">
                {activeTab === 'active' ? '💝' : '⏰'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeTab === 'active' 
                  ? 'No active favorites yet' 
                  : 'No expired favorites'
                }
              </h3>
              {activeTab === 'active' && (
                <Link href="/" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
                  Browse Promotions
                </Link>
              )}
            </div>
          ) : (
            currentFavorites.map((favorite: any) => (
              <PromotionCard
                key={favorite.id}
                promotion={favorite}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}