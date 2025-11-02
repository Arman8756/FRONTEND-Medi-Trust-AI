import { motion, AnimatePresence } from 'framer-motion';
import { DetailedReport } from '../../data/detailedReportsData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DetailedReport | null;
}

export const ReportModal = ({ isOpen, onClose, report }: ReportModalProps) => {
  if (!report) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-green-600 bg-green-100';
      case 'Borderline':
        return 'text-yellow-600 bg-yellow-100';
      case 'Abnormal':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getParameterBadge = (status: string) => {
    switch (status) {
      case 'Normal':
        return '✓';
      case 'Borderline':
        return '⚠';
      case 'Abnormal':
        return '✗';
      default:
        return '○';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{report.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      {report.date}
                    </span>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {report.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {/* Report Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Doctor</p>
                  <p className="font-semibold text-gray-900">{report.doctor}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Hospital</p>
                  <p className="font-semibold text-gray-900">{report.hospital}</p>
                </div>
              </div>

              {/* AI Summary */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  AI Summary
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border-2 border-purple-200">
                  <p className="text-gray-800 leading-relaxed">{report.aiSummary}</p>
                </div>
              </div>

              {/* Parameters */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Test Parameters
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {report.parameters.map((param, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-lg p-4 border-2 ${
                        param.status === 'Normal' ? 'border-green-200 hover:border-green-300' :
                        param.status === 'Borderline' ? 'border-yellow-200 hover:border-yellow-300' :
                        'border-red-200 hover:border-red-300'
                      } transition-colors`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`text-2xl ${
                            param.status === 'Normal' ? 'text-green-600' :
                            param.status === 'Borderline' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {getParameterBadge(param.status)}
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{param.name}</p>
                            <p className="text-sm text-gray-600">
                              Normal Range: {param.normalRange} {param.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {param.value}
                          </p>
                          {param.unit && (
                            <p className="text-sm text-gray-600">{param.unit}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Recommendations
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border-2 border-green-200">
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">►</span>
                        <span className="text-gray-800">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Follow-up */}
              {report.nextFollowUp && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Next Follow-up</p>
                  <p className="text-lg font-bold text-gray-900">{report.nextFollowUp}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Report
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
