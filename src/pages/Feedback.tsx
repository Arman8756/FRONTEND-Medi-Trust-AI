import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { feedbackApi, Feedback as FeedbackType, FeedbackAverages } from '../api/feedbackApi';
import { FeedbackFormCard } from '../components/feedback/FeedbackFormCard';
import { RatingsOverviewCard } from '../components/feedback/RatingsOverviewCard';
import { BlockchainFeedbackTable } from '../components/feedback/BlockchainFeedbackTable';
import { TopRatedCard } from '../components/feedback/TopRatedCard';
import { ContactDoctorCard } from '../components/feedback/ContactDoctorCard';
import { FeedbackSuccessModal } from '../components/feedback/FeedbackSuccessModal';
import { Toast } from '../components/shared/Toast';

export const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [averages, setAverages] = useState<FeedbackAverages>({
    Doctor: 0,
    Hospital: 0,
    TotalFeedbacks: 0
  });
  const [topRated, setTopRated] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<'pending' | 'success'>('pending');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const loadData = async () => {
    try {
      const [feedbackList, avgData, topRatedData] = await Promise.all([
        feedbackApi.getFeedbackList(),
        feedbackApi.getAverages(),
        feedbackApi.getTopRated()
      ]);
      
      setFeedbacks(feedbackList);
      setAverages(avgData);
      setTopRated(topRatedData);
    } catch (error) {
      showToast('Failed to load feedback data', 'error');
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitFeedback = async (data: {
    entity: string;
    role: 'Doctor' | 'Hospital';
    rating: number;
    review: string;
    wallet: string;
  }) => {
    setIsLoading(true);
    try {
      await feedbackApi.submitFeedback(data);
      setTxStatus('pending');
      setTxModalOpen(true);

      setTimeout(() => {
        setTxStatus('success');
        setTimeout(async () => {
          setTxModalOpen(false);
          showToast('Feedback submitted successfully!');
          await loadData();
        }, 1500);
      }, 2000);
    } catch (error) {
      showToast('Failed to submit feedback', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshAverages = async () => {
    setIsLoading(true);
    try {
      const avgData = await feedbackApi.getAverages();
      setAverages(avgData);
      showToast('Stats refreshed', 'info');
    } catch (error) {
      showToast('Failed to refresh stats', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyTxHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash);
    showToast('TxHash copied to clipboard!');
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gray-50/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold mb-2 gradient-text flex items-center gap-3">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Feedback & Reputation Center
          </h1>
          <p className="text-lg text-gray-600">
            Transparent, blockchain-verified ratings for healthcare providers
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-1 space-y-6">
            <FeedbackFormCard
              onSubmit={handleSubmitFeedback}
              isLoading={isLoading}
            />
            
            <ContactDoctorCard
              onSuccess={(msg) => showToast(msg, 'success')}
              onError={(msg) => showToast(msg, 'error')}
            />
          </div>

          {/* Right Column - Overview & Top Rated */}
          <div className="lg:col-span-2 space-y-6">
            <RatingsOverviewCard
              averages={averages}
              onRefresh={handleRefreshAverages}
              isLoading={isLoading}
            />
            
            <TopRatedCard topRated={topRated} />
          </div>
        </div>

        {/* Blockchain Feedback Table */}
        <BlockchainFeedbackTable
          feedbacks={feedbacks}
          onCopyTxHash={handleCopyTxHash}
        />
      </motion.div>

      {/* Success Modal */}
      <FeedbackSuccessModal
        isOpen={txModalOpen}
        onClose={() => setTxModalOpen(false)}
        status={txStatus}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};
