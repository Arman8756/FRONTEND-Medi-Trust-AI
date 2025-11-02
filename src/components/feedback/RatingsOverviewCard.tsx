import { motion } from 'framer-motion';
import { FeedbackAverages } from '../../api/feedbackApi';

interface RatingsOverviewCardProps {
  averages: FeedbackAverages;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const RatingsOverviewCard = ({ averages, onRefresh, isLoading }: RatingsOverviewCardProps) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '★' : '★'}
          </span>
        ))}
        <span className="ml-2 text-lg font-bold text-gray-700">{rating.toFixed(1)}/5</span>
      </div>
    );
  };

  const getPercentage = (rating: number) => (rating / 5) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-50/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 shadow-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v4h8V3h-8z"/>
          </svg>
          Ratings Overview
        </h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:bg-gray-300 transition-all shadow-lg text-sm"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Doctor Rating */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Doctors
            </span>
            {renderStars(averages.Doctor)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercentage(averages.Doctor)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{getPercentage(averages.Doctor).toFixed(0)}% satisfaction</p>
        </div>

        {/* Hospital Rating */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
              </svg>
              Hospitals
            </span>
            {renderStars(averages.Hospital)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getPercentage(averages.Hospital)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{getPercentage(averages.Hospital).toFixed(0)}% satisfaction</p>
        </div>

        {/* Total Feedbacks */}
        <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200/60">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Feedbacks</span>
            <span className="text-3xl font-bold text-blue-600">{averages.TotalFeedbacks}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
