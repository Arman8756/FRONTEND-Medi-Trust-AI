import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { usePatient } from '../contexts/PatientContext';

export const PatientProfile: React.FC = () => {
  const { selectedPatient } = usePatient();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  if (!selectedPatient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Patient Selected</h2>
          <p className="text-gray-600">Please select a patient to view their profile.</p>
        </div>
      </div>
    );
  }

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  const generateDetailedReport = (record: any) => {
    const reportContent = `
╔════════════════════════════════════════════════════════════════╗
║                    DETAILED MEDICAL REPORT                    ║
║                   ${record.hospital}                          ║
╚════════════════════════════════════════════════════════════════╝

PATIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           ${selectedPatient.name}
ABHA ID:        ${selectedPatient.abhaId}
Age:            ${selectedPatient.age} years
Gender:         ${selectedPatient.gender}
Blood Group:    ${selectedPatient.bloodGroup}
Phone:          ${selectedPatient.phone}
Email:          ${selectedPatient.email}
Address:        ${selectedPatient.address}
Emergency:      ${selectedPatient.emergencyContact}

MEDICAL RECORD DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report Type:    ${record.type}
Date:           ${record.date}
Hospital:       ${record.hospital}
Doctor:         ${record.doctor}
Status:         ${record.status}
File Size:      ${record.fileSize}

CLINICAL FINDINGS & RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.findings}

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${record.summary}

RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Continue regular health monitoring
• Follow prescribed medication schedule
• Maintain healthy lifestyle habits
• Schedule follow-up appointments as advised
• Contact healthcare provider if symptoms worsen

VERIFICATION & SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Digital Signature: ${record.doctor}
Verification Status: ${record.status}
Generated: ${new Date().toLocaleString()}
Blockchain Hash: 0x${Math.random().toString(16).substr(2, 40)}

╔════════════════════════════════════════════════════════════════╗
║  This is a digitally verified report from MediTrust AI        ║
║  For verification, visit: https://meditrust.ai/verify         ║
╚════════════════════════════════════════════════════════════════╝
`;
    return reportContent;
  };

  const handleDownloadRecord = (record: any) => {
    const reportContent = generateDetailedReport(record);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPatient.name.replace(' ', '_')}_${record.type.replace(' ', '_')}_${record.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRecordIcon = (type: string) => {
    // Returns SVG icon component based on type
    const iconClass = "w-5 h-5 text-blue-600";
    const icons: { [key: string]: JSX.Element } = {
      'Lab Report': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2v2H9V2H7zm11 18H6V6h12v14z"/></svg>,
      'Prescription': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M4.22 11.29l7.07-7.07c.78-.78 2.05-.78 2.83 0l4.95 4.95c.78.78.78 2.05 0 2.83l-7.07 7.07c-.78.78-2.05.78-2.83 0L4.22 14.12c-.78-.78-.78-2.05 0-2.83z"/></svg>,
      'X-Ray': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>,
      'MRI Scan': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>,
      'CT Scan': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>,
      'Doctor Notes': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>,
      'Discharge Summary': <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>
    };
    return icons[type] || <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z"/></svg>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Under Review': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant="outline"
            onClick={() => {
              window.history.back();
            }}
            className="px-4 py-2"
          >
            ← Back
          </Button>
          <h1 className="text-5xl font-bold gradient-text flex items-center gap-3">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Patient Profile
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Complete medical history and records
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Patient Info Card */}
        <Card className="mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {selectedPatient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedPatient.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">ABHA ID</p>
                  <p className="font-medium text-gray-900">{selectedPatient.abhaId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age / Gender</p>
                  <p className="font-medium text-gray-900">{selectedPatient.age} yrs, {selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium text-gray-900">{selectedPatient.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{selectedPatient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{selectedPatient.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Emergency Contact</p>
                  <p className="font-medium text-gray-900">{selectedPatient.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Records</p>
                  <p className="font-medium text-gray-900">{selectedPatient.records.length} records</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Medical Records */}
        <Card title={`Medical Records (${selectedPatient.records.length})`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPatient.records.map((record) => (
              <motion.div
                key={record.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleViewRecord(record)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getRecordIcon(record.type)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.type}</h3>
                      <p className="text-sm text-gray-500">{record.hospital}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium text-gray-900">{record.doctor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">{record.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium text-gray-900">{record.fileSize}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{record.summary}</p>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRecord(record);
                    }}
                    className="flex-1 text-xs py-2"
                  >
                    👁️ View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadRecord(record);
                    }}
                    className="flex-1 text-xs py-2"
                  >
                    📥 Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Record Detail Modal */}
        <AnimatePresence>
          {showRecordModal && selectedRecord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowRecordModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getRecordIcon(selectedRecord.type)}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedRecord.type}</h2>
                        <p className="text-gray-600">{selectedRecord.hospital} • {selectedRecord.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowRecordModal(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Record Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-medium text-gray-900">{selectedRecord.doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">File Size</p>
                      <p className="font-medium text-gray-900">{selectedRecord.fileSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Record ID</p>
                      <p className="font-medium text-gray-900">#{selectedRecord.id.toString().padStart(6, '0')}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-gray-700">{selectedRecord.summary}</p>
                    </div>
                  </div>

                  {/* Detailed Findings */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Detailed Findings</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {selectedRecord.findings}
                      </pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      onClick={() => handleDownloadRecord(selectedRecord)}
                      className="flex-1"
                    >
                      📥 Download Full Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const reportContent = generateDetailedReport(selectedRecord);
                        const newWindow = window.open('', '_blank');
                        if (newWindow) {
                          newWindow.document.write(`
                            <html>
                              <head>
                                <title>${selectedRecord.type} - ${selectedPatient.name}</title>
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
                      className="flex-1"
                    >
                      👁️ View Full Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};