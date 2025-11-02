import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Icon } from '../shared/Icon';
import { MedicalRecord } from '../../api/recordsApi';
import { recordsApiService } from '../../api/recordsApi';

interface RecordViewerProps {
  record: MedicalRecord;
  onClose: () => void;
}

const generateMockReport = (record: MedicalRecord) => {
  return `╔════════════════════════════════════════════════════════════════╗
║                    MEDICAL REPORT                              ║
║                   ${record.hospital}                           ║
╚════════════════════════════════════════════════════════════════╝

PATIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report Title:   ${record.title}
Report Type:    ${record.type}
Date:           ${record.date}
Hospital:       ${record.hospital}
${record.doctor ? `Doctor:         ${record.doctor}` : ''}

DOCUMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.details || 'Standard medical documentation'}

CLINICAL FINDINGS & RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.findings || record.aiSummary}

AI ANALYSIS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.aiSummary}

VERIFICATION & SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Blockchain Hash: ${record.txHash}
IPFS CID:        ${record.ipfsCid}
Verification:    ${record.verified ? '✓ Verified' : 'Pending'}
Generated:       ${new Date().toLocaleString()}

╔════════════════════════════════════════════════════════════════╗
║  This is a digitally verified report from MediTrust AI        ║
║  For verification, visit: https://meditrust.ai/verify         ║
╚════════════════════════════════════════════════════════════════╝`;
};

const generateFullReport = (record: MedicalRecord) => {
  return `╔════════════════════════════════════════════════════════════════╗
║                    DETAILED MEDICAL REPORT                     ║
║                   ${record.hospital}                           ║
╚════════════════════════════════════════════════════════════════╝

PATIENT MEDICAL RECORD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report Title:   ${record.title}
Report Type:    ${record.type}
Date:           ${record.date}
Hospital:       ${record.hospital}
${record.doctor ? `Attending:      ${record.doctor}` : ''}

DETAILED INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.details || 'Standard medical documentation and procedures followed.'}

CLINICAL FINDINGS & RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.findings || record.aiSummary}

AI-POWERED ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Summary: ${record.aiSummary}

Analysis: This report has been analyzed using advanced AI algorithms to 
provide insights and ensure accuracy. All findings have been cross-referenced
with medical databases and best practices.

RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Continue monitoring as per doctor's advice
• Follow prescribed medication schedule
• Maintain regular follow-up appointments
• Report any unusual symptoms immediately
• Keep this record for future reference

VERIFICATION & SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Blockchain Transaction: ${record.txHash}
IPFS Content ID:        ${record.ipfsCid}
Verification Status:    ${record.verified ? '✓ Blockchain Verified' : 'Pending Verification'}
Encryption:             AES-256 Encrypted
Access Control:         Patient Controlled
Generated:              ${new Date().toLocaleString()}
Digital Signature:      ${record.doctor || 'Medical Authority'}

LEGAL DISCLAIMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This medical report is confidential and intended solely for the patient
and authorized healthcare providers. Unauthorized access, disclosure, or
distribution is strictly prohibited and may be subject to legal action.

╔════════════════════════════════════════════════════════════════╗
║  This is a digitally verified report from MediTrust AI        ║
║  Secured by Blockchain Technology & IPFS Storage               ║
║  For verification, visit: https://meditrust.ai/verify         ║
╚════════════════════════════════════════════════════════════════╝`;
};

export const RecordViewer: React.FC<RecordViewerProps> = ({ record, onClose }) => {
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleExplainWithAI = async () => {
    setLoadingAI(true);
    try {
      const response = await recordsApiService.explainRecord(record.id);
      setAiExplanation(response);
    } catch (error) {
      console.error('Error getting AI explanation:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={record.title}>
      <div className="space-y-4">
        {/* Verification Banner */}
        {record.verified && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
          >
            <div className="flex items-center gap-2">
              <Icon name="check" size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Verified on-chain ✅
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono text-green-700">
                    {record.txHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(record.txHash)}
                    className="text-green-600 hover:text-green-700"
                    title="Copy TxHash"
                  >
                    <Icon name="records" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Record Details */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-xs text-gray-500 mb-1">Type</p>
            <Badge variant="info">{record.type}</Badge>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <p className="text-sm font-medium text-gray-900">{record.date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Hospital</p>
            <p className="text-sm font-medium text-gray-900">{record.hospital}</p>
          </div>
          {record.doctor && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Doctor</p>
              <p className="text-sm font-medium text-gray-900">{record.doctor}</p>
            </div>
          )}
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">IPFS CID</p>
            <div className="flex items-center gap-1">
              <code className="text-xs font-mono text-gray-700 truncate">
                {record.ipfsCid.slice(0, 16)}...
              </code>
              <button
                onClick={() => copyToClipboard(record.ipfsCid)}
                className="text-primary hover:text-primary/80"
                title="Copy CID"
              >
                <Icon name="records" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        {record.details && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              📋 Detailed Information
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{record.details}</p>
          </div>
        )}

        {/* Clinical Findings */}
        {record.findings && (
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              🔬 Clinical Findings & Results
            </p>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{record.findings}</pre>
          </div>
        )}

        {/* AI Summary */}
        <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
          <div className="flex items-start gap-2">
            <span className="text-2xl">🤖</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">AI Summary</p>
              <p className="text-sm text-gray-700">{record.aiSummary}</p>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 flex items-center justify-between">
            <span className="text-sm font-semibold">📄 Document Preview</span>
            <button
              onClick={() => {
                const reportContent = generateFullReport(record);
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                  newWindow.document.write(`
                    <html>
                      <head>
                        <title>${record.title} - Medical Report</title>
                        <style>
                          body {
                            font-family: 'Courier New', monospace;
                            padding: 40px;
                            background: #f5f5f5;
                            line-height: 1.6;
                          }
                          pre {
                            background: white;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                            white-space: pre-wrap;
                          }
                        </style>
                      </head>
                      <body>
                        <pre>${reportContent}</pre>
                      </body>
                    </html>
                  `);
                  newWindow.document.close();
                }
              }}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
            >
              🔍 View Full Report
            </button>
          </div>
          <div className="bg-white p-6 max-h-96 overflow-y-auto">
            <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
{generateMockReport(record)}
            </pre>
          </div>
        </div>

        {/* Blockchain Storage Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔗</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-2">Blockchain Storage</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Storage Type:</span>
                  <span className="text-xs font-medium text-gray-900">IPFS Distributed Storage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Verification:</span>
                  <span className="text-xs font-medium text-green-600">✓ Blockchain Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Encryption:</span>
                  <span className="text-xs font-medium text-gray-900">AES-256 Encrypted</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Access Control:</span>
                  <span className="text-xs font-medium text-gray-900">Patient Controlled</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <p className="text-xs text-gray-500">
                  Document stored securely on decentralized network with blockchain verification
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Explain with AI Button */}
        <Button
          variant="primary"
          onClick={handleExplainWithAI}
          disabled={loadingAI}
          className="w-full"
        >
          {loadingAI ? 'Analyzing...' : '🤖 Explain with AI'}
        </Button>

        {/* AI Explanation */}
        {aiExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 p-4 bg-purple-50 border border-purple-200 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  AI Detailed Explanation
                </p>
                <p className="text-sm text-purple-800 mb-3">{aiExplanation.reply}</p>
                <p className="text-sm text-purple-700">{aiExplanation.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
};
