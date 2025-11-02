import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MedicalReportTemplate } from '../components/reports/MedicalReportTemplate';
import { FileIcon } from '../components/shared/SvgIcons';

export const ReportGenerator: React.FC = () => {
  const [showReport, setShowReport] = useState(false);

  // Sample report data
  const sampleLabReport = {
    reportId: 'LAB-2025-001234',
    reportType: 'Laboratory Report',
    reportTitle: 'Complete Blood Count (CBC) Analysis',
    date: '2025-01-15',
    hospital: 'Apollo Hospitals, Delhi',
    doctor: 'Dr. Rajesh Kumar, MD',
    patient: {
      name: 'Rahul Verma',
      age: 29,
      gender: 'Male',
      patientId: 'PT-2025-5678',
      bloodGroup: 'O+',
      contact: '+91 98765 43210'
    },
    testResults: [
      {
        parameter: 'Hemoglobin',
        value: '15.2',
        unit: 'g/dL',
        normalRange: '13.5-17.5',
        status: 'normal' as const
      },
      {
        parameter: 'WBC Count',
        value: '7,200',
        unit: '/μL',
        normalRange: '4,000-11,000',
        status: 'normal' as const
      },
      {
        parameter: 'RBC Count',
        value: '5.2',
        unit: 'million/μL',
        normalRange: '4.5-5.9',
        status: 'normal' as const
      },
      {
        parameter: 'Platelets',
        value: '250,000',
        unit: '/μL',
        normalRange: '150,000-450,000',
        status: 'normal' as const
      },
      {
        parameter: 'ESR',
        value: '8',
        unit: 'mm/hr',
        normalRange: '0-15',
        status: 'normal' as const
      },
      {
        parameter: 'Blood Glucose',
        value: '118',
        unit: 'mg/dL',
        normalRange: '70-100',
        status: 'warning' as const
      }
    ],
    clinicalFindings: `Hospital Course: Patient admitted with acute appendicitis. Underwent successful laparoscopic appendectomy. Post-operative recovery uneventful. Pain managed with oral analgesics. Tolerating regular diet. Wound healing well.

Discharge Medications:
• Paracetamol 500mg (2x daily for 5 days)
• Amoxicillin 500mg (3x daily for 7 days)

Follow-up: OPD visit in 1 week for suture removal and wound check.`,
    diagnosis: `Primary Diagnosis: Acute Appendicitis (Post-operative)

The patient presented with classic symptoms of appendicitis. Laboratory findings showed elevated WBC count. Imaging confirmed inflamed appendix. Surgical intervention was successful with no complications.`,
    aiAnalysis: `🤖 AI-POWERED HEALTH INSIGHTS

✓ OVERALL ASSESSMENT: GOOD HEALTH
Your blood work shows mostly healthy results with one parameter requiring attention.

📊 KEY FINDINGS:
• Hemoglobin: 15.2 g/dL - Excellent oxygen-carrying capacity
• WBC Count: 7,200/μL - Strong immune system
• RBC Count: 5.2 million/μL - Healthy red blood cell production
• Platelets: 250,000/μL - Good blood clotting ability

⚠️ ATTENTION REQUIRED:
• Blood Glucose: 118 mg/dL (Slightly elevated)
  → Indicates pre-diabetic range
  → Recommend lifestyle modifications
  → Follow-up testing in 3 months

💡 PERSONALIZED RECOMMENDATIONS:
• Monitor blood sugar levels regularly
• Reduce refined sugar intake
• Increase physical activity (30 min daily)
• Consider consulting an endocrinologist

🎯 RISK ASSESSMENT: LOW
No immediate health concerns detected. Continue healthy lifestyle practices.`,
    recommendations: [
      'Continue current healthy lifestyle and balanced diet',
      'Monitor blood glucose levels - retest in 3 months',
      'Maintain regular exercise routine (30 minutes daily)',
      'Stay well hydrated (8-10 glasses of water daily)',
      'Reduce intake of refined sugars and processed foods',
      'Schedule next complete health check-up in 6 months'
    ],
    blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385'
  };

  const sampleRadiologyReport = {
    reportId: 'RAD-2025-005678',
    reportType: 'Radiology Report',
    reportTitle: 'Chest X-Ray Examination',
    date: '2025-01-15',
    hospital: 'Max Super Speciality Hospital, Mumbai',
    doctor: 'Dr. Priya Sharma, MD (Radiology)',
    patient: {
      name: 'Anjali Patel',
      age: 45,
      gender: 'Female',
      patientId: 'PT-2025-9012',
      bloodGroup: 'A+',
      contact: '+91 98765 43211'
    },
    clinicalFindings: `TECHNIQUE: PA and lateral views of the chest were obtained.

FINDINGS:
• Lungs: Clear bilateral lung fields. No focal consolidation, pleural effusion, or pneumothorax.
• Heart: Normal cardiac silhouette. Cardiothoracic ratio within normal limits.
• Mediastinum: Normal mediastinal contours. No widening or mass.
• Bones: No acute osseous abnormality. Degenerative changes in thoracic spine.
• Soft Tissues: Unremarkable.

IMPRESSION: Normal chest radiograph. No acute cardiopulmonary disease.`,
    diagnosis: `RADIOLOGICAL DIAGNOSIS: Normal Study

No evidence of:
• Pneumonia or lung infection
• Pleural effusion
• Pneumothorax
• Cardiac enlargement
• Mediastinal mass

Mild degenerative changes noted in thoracic spine, age-appropriate.`,
    aiAnalysis: `🤖 AI RADIOLOGY ANALYSIS

✓ OVERALL ASSESSMENT: NORMAL STUDY
No acute abnormalities detected in chest X-ray examination.

📊 DETAILED ANALYSIS:
• Lung Fields: Clear bilaterally - No signs of infection or fluid
• Cardiac Silhouette: Normal size and shape
• Mediastinum: No abnormal widening or masses
• Bone Structure: Age-appropriate changes only

💡 CLINICAL CORRELATION:
The chest X-ray shows no acute pathology. The mild degenerative changes in the thoracic spine are consistent with normal aging and do not require immediate intervention.

✅ CONCLUSION:
This is a reassuring normal chest X-ray. No follow-up imaging required unless clinically indicated.`,
    recommendations: [
      'No immediate medical intervention required',
      'Maintain good respiratory health practices',
      'Continue regular health check-ups',
      'Report any new respiratory symptoms promptly',
      'Consider annual chest X-ray if risk factors present'
    ],
    blockchainHash: '0x8a0fade2d1e68b8bg77bc5fbe8fade2d1e68b8bg77bc5fbe8d3d3fc8c22b02496'
  };

  const [selectedReport, setSelectedReport] = useState(sampleLabReport);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality will be implemented with jsPDF library');
    // TODO: Implement PDF generation
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <FileIcon className="text-blue-600" size={48} />
          Medical Report Generator
        </h1>
        <p className="text-gray-600 text-lg">
          AI-Powered Professional Medical Reports
        </p>
      </motion.div>

      {/* Report Type Selector */}
      {!showReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Report Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setSelectedReport(sampleLabReport);
                  setShowReport(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="text-4xl mb-3">🧪</div>
                <h3 className="text-xl font-bold mb-2">Laboratory Report</h3>
                <p className="text-sm text-blue-100">Blood tests, CBC, metabolic panels</p>
              </button>

              <button
                onClick={() => {
                  setSelectedReport(sampleRadiologyReport);
                  setShowReport(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="text-4xl mb-3">📷</div>
                <h3 className="text-xl font-bold mb-2">Radiology Report</h3>
                <p className="text-sm text-purple-100">X-Ray, MRI, CT Scan reports</p>
              </button>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3">✨ Features:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Professional medical report layout
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> AI-powered health insights
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Color-coded test results
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Blockchain verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Print & PDF export ready
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Report Display */}
      {showReport && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowReport(false)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              ← Back to Report Types
            </button>
          </div>

          <MedicalReportTemplate
            data={selectedReport}
            onPrint={handlePrint}
            onDownload={handleDownload}
          />
        </motion.div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};
