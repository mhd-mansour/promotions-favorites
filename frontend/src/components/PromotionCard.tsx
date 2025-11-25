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

interface PromotionCardProps {
  promotion: Promotion;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
}

export default function PromotionCard({ promotion, onToggleFavorite }: PromotionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-start gap-6">
        <div className="relative">
          <img 
            src={promotion.thumbnailUrl} 
            alt={promotion.title}
            className="w-24 h-24 rounded-xl object-cover shadow-md"
          />
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {promotion.daysUntilExpiry}d
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{promotion.title}</h3>
            <button
              onClick={() => onToggleFavorite?.(promotion.id, promotion.isFavorite)}
              className={`p-3 rounded-full transition-all duration-200 ${
                promotion.isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100 scale-110' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {promotion.merchant}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{promotion.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {promotion.rewardAmount} {promotion.rewardCurrency}
              </span>
              <span className="text-sm text-gray-500">reward</span>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">Expires in</div>
              <div className="text-lg font-semibold text-orange-600">
                {promotion.daysUntilExpiry} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}