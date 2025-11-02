import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, UserIcon, CalendarIcon, FileIcon, CheckIcon, AlertIcon } from '../shared/SvgIcons';

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  patientId: string;
  bloodGroup?: string;
  contact?: string;
}

interface TestResult {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'warning' | 'critical';
}

interface ReportData {
  reportId: string;
  reportType: string;
  reportTitle: string;
  date: string;
  hospital: string;
  doctor: string;
  patient: PatientInfo;
  testResults?: TestResult[];
  clinicalFindings?: string;
  diagnosis?: string;
  recommendations?: string[];
  aiAnalysis?: string;
  blockchainHash?: string;
}

interface MedicalReportTemplateProps {
  data: ReportData;
  onPrint?: () => void;
  onDownload?: () => void;
}

export const MedicalReportTemplate: React.FC<MedicalReportTemplateProps> = ({ 
  data, 
  onPrint, 
  onDownload 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-50 text-green-700 border-green-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckIcon className="text-green-600" size={16} />;
      case 'warning': return <AlertIcon className="text-yellow-600" size={16} />;
      case 'critical': return <AlertIcon className="text-red-600" size={16} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <HeartIcon className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">MediTrust AI</h1>
              <p className="text-blue-100">{data.hospital}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Report ID</div>
            <div className="text-lg font-mono font-bold">{data.reportId}</div>
          </div>
        </div>
      </div>

      {/* Report Title */}
      <div className="bg-blue-50 border-b-4 border-blue-600 p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {data.reportTitle}
        </h2>
        <p className="text-center text-gray-600 mt-2">{data.reportType}</p>
      </div>

      {/* Patient Information */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <UserIcon className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Patient Information</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Patient Name</div>
            <div className="text-lg font-semibold text-gray-800">{data.patient.name}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Patient ID</div>
            <div className="text-lg font-semibold text-gray-800">{data.patient.patientId}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Age / Gender</div>
            <div className="text-lg font-semibold text-gray-800">
              {data.patient.age} yrs / {data.patient.gender}
            </div>
          </div>
          {data.patient.bloodGroup && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Blood Group</div>
              <div className="text-lg font-semibold text-red-600">{data.patient.bloodGroup}</div>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Report Date</div>
            <div className="text-lg font-semibold text-gray-800">{data.date}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Doctor</div>
            <div className="text-lg font-semibold text-gray-800">{data.doctor}</div>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {data.testResults && data.testResults.length > 0 && (
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileIcon className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Test Results</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b-2 border-blue-600">
                  <th className="text-left p-3 font-semibold text-gray-700">Parameter</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Value</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Unit</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Normal Range</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.testResults.map((result, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-800">{result.parameter}</td>
                    <td className="p-3 text-center font-bold text-gray-900">{result.value}</td>
                    <td className="p-3 text-center text-gray-600">{result.unit}</td>
                    <td className="p-3 text-center text-gray-600">{result.normalRange}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        {result.status.toUpperCase()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Clinical Findings */}
      {data.clinicalFindings && (
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Clinical Findings & Results</h3>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {data.clinicalFindings}
            </p>
          </div>
        </div>
      )}

      {/* Diagnosis */}
      {data.diagnosis && (
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Diagnosis</h3>
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed font-medium">
              {data.diagnosis}
            </p>
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {data.aiAnalysis && (
        <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <h3 className="text-xl font-bold text-gray-800">AI-Powered Analysis</h3>
          </div>
          <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {data.aiAnalysis}
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-600"
              >
                <CheckIcon className="text-green-600 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">{rec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Signature */}
          <div>
            <div className="border-t-2 border-gray-400 pt-2 mt-8 inline-block">
              <p className="font-semibold text-gray-800">{data.doctor}</p>
              <p className="text-sm text-gray-600">Authorized Medical Practitioner</p>
            </div>
          </div>

          {/* Blockchain Verification */}
          {data.blockchainHash && (
            <div className="text-right">
              <div className="inline-block bg-blue-100 p-4 rounded-lg border border-blue-300">
                <p className="text-xs text-gray-600 mb-1">Blockchain Verified</p>
                <p className="text-xs font-mono text-blue-800 break-all">
                  {data.blockchainHash}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-500 text-center">
            This is a computer-generated report and does not require a physical signature. 
            Report authenticity can be verified using the blockchain hash above.
          </p>
        </div>
      </div>

      {/* Action Buttons (Hidden in Print) */}
      <div className="p-6 bg-white border-t border-gray-200 flex gap-4 justify-center print:hidden">
        <button
          onClick={onPrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
          </svg>
          Print Report
        </button>
        <button
          onClick={onDownload}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};
