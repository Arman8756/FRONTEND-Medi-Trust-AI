import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'pending' | 'success';
}

export const FeedbackSuccessModal = ({ isOpen, onClose, status }: FeedbackSuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {status === 'success' ? (
                  <span className="text-4xl">✅</span>
                ) : (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="text-4xl"
                  >
                    ⏳
                  </motion.span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {status === 'success' ? 'Process Success!' : 'Processing...'}
              </h3>
              <p className="text-sm text-gray-600">
                {status === 'success' 
                  ? 'Your feedback has been successfully submitted and recorded'
                  : 'Please wait while we process your feedback'
                }
              </p>
            </div>

            {status === 'success' && (
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
