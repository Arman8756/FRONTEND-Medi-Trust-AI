import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { Badge } from '../components/shared/Badge';
import { UserIcon, ChartIcon, PillIcon, ActivityIcon, HeartIcon } from '../components/shared/SvgIcons';
import { ReportModal } from '../components/shared/ReportModal';
import { detailedReportsData, DetailedReport } from '../data/detailedReportsData';

export const HealthDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3M');
  const [selectedReportSummary, setSelectedReportSummary] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<DetailedReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewFullReport = (reportId: number) => {
    const report = detailedReportsData.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
  };

  // Mock patient data
  const patientData = {
    name: 'Rahul Verma',
    age: 29,
    gender: 'Male',
    bloodGroup: 'O+',
    healthScore: 85,
    lastCheckup: '2025-10-28',
    emergencyContact: '+91 98765 43200',
    allergies: ['Penicillin', 'Peanuts'],
    ongoingConditions: ['Mild Hypertension'],
    currentMedications: [
      { name: 'Metformin 500mg', timing: '2x daily with meals', color: 'blue' },
      { name: 'Aspirin 75mg', timing: '1x daily morning', color: 'green' },
      { name: 'Vitamin D3', timing: 'Weekly', color: 'yellow' }
    ]
  };

  const vitalsTrend = [
    { month: 'Aug', bp: 128, sugar: 105, weight: 72, hr: 75 },
    { month: 'Sep', bp: 125, sugar: 98, weight: 71, hr: 72 },
    { month: 'Oct', bp: 122, sugar: 95, weight: 70, hr: 70 },
    { month: 'Nov', bp: 120, sugar: 92, weight: 69, hr: 68 }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Complete Blood Count',
      date: '2025-10-25',
      type: 'Lab Report',
      status: 'Normal',
      summary: 'All parameters within normal range',
      aiSummary: `═══════════════════════════════════════════════════════════
  AI ANALYSIS: COMPLETE BLOOD COUNT
═══════════════════════════════════════════════════════════

▶ OVERALL ASSESSMENT: EXCELLENT
Your blood work shows healthy results across all parameters.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  KEY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✓ Hemoglobin: 15.2 g/dL (Normal)
    → Excellent oxygen-carrying capacity
    
  ✓ WBC Count: 7,200/μL (Normal)
    → Strong immune system
    
  ✓ RBC Count: 5.2 million/μL (Normal)
    → Healthy red blood cell production
    
  ✓ Platelets: 250,000/μL (Normal)
    → Good blood clotting ability
    
  ✓ ESR: 8 mm/hr (Normal)
    → No signs of inflammation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CLINICAL INTERPRETATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your blood health is excellent. All cell counts are within 
optimal ranges, indicating:

  • Strong immune function
  • Good oxygen delivery to tissues
  • Healthy blood clotting
  • No signs of anemia or infection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ► Continue current healthy lifestyle
  ► Maintain balanced diet rich in iron and vitamins
  ► Stay hydrated (8-10 glasses water daily)
  ► Regular exercise (30 minutes daily)
  ► Next CBC recommended in 6 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ★ STATUS: No immediate action required
  ★ VERDICT: Keep up the good work!

═══════════════════════════════════════════════════════════`
    },
    {
      id: 2,
      title: 'Lipid Profile',
      date: '2025-10-20',
      type: 'Lab Report',
      status: 'Borderline',
      summary: 'Cholesterol slightly elevated',
      aiSummary: `═══════════════════════════════════════════════════════════
  AI ANALYSIS: LIPID PROFILE
═══════════════════════════════════════════════════════════

▶ OVERALL ASSESSMENT: BORDERLINE - NEEDS ATTENTION
Your cholesterol levels are slightly elevated and require 
lifestyle modifications.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  KEY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ⚠ Total Cholesterol: 210 mg/dL (Borderline High)
    Target: <200 mg/dL
    
  ⚠ LDL (Bad Cholesterol): 135 mg/dL (Borderline High)
    Target: <100 mg/dL
    
  ⚠ HDL (Good Cholesterol): 45 mg/dL (Low)
    Target: >60 mg/dL
    
  ✓ Triglycerides: 165 mg/dL (Normal)
    Target: <150 mg/dL
    
  ⚠ Cholesterol/HDL Ratio: 4.7 (Moderate Risk)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CLINICAL INTERPRETATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your cholesterol is in the borderline zone. While not 
critical, it increases your risk of:

  • Heart disease
  • Arterial plaque buildup
  • Stroke risk

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  IMMEDIATE ACTION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] DIETARY CHANGES:
    ► Reduce saturated fats (red meat, butter, cheese)
    ► Increase fiber (oats, beans, vegetables)
    ► Add omega-3 (fish, walnuts, flaxseeds)
    ► Limit processed foods

[2] LIFESTYLE MODIFICATIONS:
    ► Exercise 30 minutes daily (walking, jogging)
    ► Lose 5-10% body weight if overweight
    ► Quit smoking if applicable
    ► Reduce alcohol consumption

[3] FOLLOW-UP PLAN:
    ► Retest in 3 months
    ► Consider statin medication if no improvement
    ► Consult cardiologist if family history exists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ★ GOOD NEWS: This is reversible with lifestyle changes!
  ★ PRIORITY: Start dietary modifications immediately

═══════════════════════════════════════════════════════════`
    },
    {
      id: 3,
      title: 'Chest X-Ray',
      date: '2025-10-15',
      type: 'Imaging',
      status: 'Normal',
      summary: 'Clear lung fields, no abnormalities',
      aiSummary: `═══════════════════════════════════════════════════════════
  AI ANALYSIS: CHEST X-RAY
═══════════════════════════════════════════════════════════

▶ OVERALL ASSESSMENT: NORMAL
Your chest X-ray shows healthy lungs and heart with no 
concerning findings.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  KEY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✓ Lung Fields: Clear bilaterally
    → No infiltrates, masses, or fluid
    
  ✓ Heart Size: Normal cardiac silhouette
    → No enlargement detected
    
  ✓ Mediastinum: Normal width and contour
    
  ✓ Diaphragm: Normal position and shape
    
  ✓ Bones: No fractures or lesions visible
    
  ✓ Soft Tissues: Normal appearance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CLINICAL INTERPRETATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your chest X-ray is completely normal, indicating:

  • Healthy lung tissue with no signs of infection
  • No pneumonia, tuberculosis, or lung disease
  • Normal heart size (no heart failure)
  • No fluid accumulation in lungs
  • No tumors or masses detected
  • Healthy bone structure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CONDITIONS RULED OUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This normal result rules out:

  ✗ Pneumonia
  ✗ Tuberculosis
  ✗ Lung cancer
  ✗ Heart failure
  ✗ Pleural effusion
  ✗ Pneumothorax

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ► No immediate follow-up needed
  ► Continue healthy lifestyle
  ► Avoid smoking and secondhand smoke
  ► Regular exercise for lung health
  ► Next chest X-ray only if symptoms develop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ★ EXCELLENT RESULT
  ★ VERDICT: Your respiratory system is healthy!

═══════════════════════════════════════════════════════════`
    }
  ];

  const aiInsights = [
    {
      type: 'observation',
      icon: ChartIcon,
      title: 'Blood Pressure Improving',
      message: 'Your BP has decreased by 8 points over the last 3 months. Great progress!',
      severity: 'positive'
    },
    {
      type: 'risk',
      icon: ActivityIcon,
      title: 'Cholesterol Watch',
      message: 'Cholesterol levels are borderline. Consider dietary changes and regular exercise.',
      severity: 'warning'
    },
    {
      type: 'recommendation',
      icon: HeartIcon,
      title: 'Upcoming Check-up',
      message: 'Schedule your quarterly health check-up within 2 weeks.',
      severity: 'info'
    }
  ];

  const accessStatus = [
    { entity: 'Dr. Sharma (Apollo Hospital)', access: 'Full Access', expires: '30 days', status: 'active' },
    { entity: 'Max Lab', access: 'Lab Reports Only', expires: '15 days', status: 'active' },
    { entity: 'Fortis Hospital', access: 'Pending Approval', expires: '-', status: 'pending' }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold gradient-text mb-2 flex items-center justify-center gap-3">
          <UserIcon className="text-blue-600" size={48} />
          Health Summary Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Complete health overview powered by AI insights
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Basic Health Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Health Score */}
              <div className="text-center">
                <div className={`text-6xl font-bold ${getHealthScoreColor(patientData.healthScore)}`}>
                  {patientData.healthScore}
                </div>
                <p className="text-sm text-gray-600 mt-2">Health Score</p>
                <Badge variant={patientData.healthScore >= 80 ? 'success' : 'warning'}>
                  {getHealthScoreLabel(patientData.healthScore)}
                </Badge>
              </div>

              {/* Last Checkup */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Last Check-up</p>
                <p className="text-lg font-semibold text-gray-900">{patientData.lastCheckup}</p>
                <p className="text-sm text-gray-500 mt-1">3 days ago</p>
              </div>

              {/* Ongoing Conditions */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Ongoing Conditions</p>
                {patientData.ongoingConditions.map((condition, idx) => (
                  <Badge key={idx} variant="warning" className="mr-1 mb-1">
                    {condition}
                  </Badge>
                ))}
              </div>

              {/* Allergies */}
              <div>
                <p className="text-sm text-gray-600 mb-2">⚠️ Allergies (Critical)</p>
                {patientData.allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="error" className="mr-1 mb-1">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <PillIcon className="text-blue-600" size={20} />
                Current Medications
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {patientData.currentMedications.map((med, idx) => (
                  <div key={idx} className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-200/60 shadow-lg">
                    <p className="font-medium text-gray-900 text-sm">{med.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{med.timing}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 2. Health Timeline & 3. Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Health Timeline Overview" className="h-full">
              <div className="space-y-4">
                {/* Time Range Selector */}
                <div className="flex gap-2">
                  {['1M', '3M', '6M', '1Y'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedTimeRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Horizontal Progress Bars */}
                <div className="space-y-4">
                  {vitalsTrend.map((data, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-red-500 h-3 rounded-full transition-all"
                                style={{ width: `${(data.bp / 140) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-20">BP: {data.bp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-12"></span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-500 h-3 rounded-full transition-all"
                                style={{ width: `${(data.sugar / 140) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-20">Sugar: {data.sugar}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Large Bar Charts */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {/* Blood Pressure Bar Chart */}
                  <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <HeartIcon className="text-red-600" size={24} />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">BP</h4>
                        <p className="text-xs text-gray-500">mmHg</p>
                      </div>
                    </div>
                    <div className="relative h-52 pt-8 flex items-end justify-around gap-3">
                      {vitalsTrend.map((data, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full flex flex-col items-center">
                            <div className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg font-bold shadow-lg mb-2">
                              {data.bp}
                            </div>
                            <div
                              className="bg-red-500 rounded-t-lg transition-all hover:bg-red-600 cursor-pointer w-full"
                              style={{ height: `${(data.bp / 140) * 150}px` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 mt-3">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blood Sugar Bar Chart */}
                  <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <ActivityIcon className="text-blue-600" size={24} />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Sugar</h4>
                        <p className="text-xs text-gray-500">mg/dL</p>
                      </div>
                    </div>
                    <div className="relative h-52 pt-8 flex items-end justify-around gap-3">
                      {vitalsTrend.map((data, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full flex flex-col items-center">
                            <div className="bg-blue-500 text-white text-sm px-2 py-1 rounded-lg font-bold shadow-lg mb-2">
                              {data.sugar}
                            </div>
                            <div
                              className="bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer w-full"
                              style={{ height: `${(data.sugar / 140) * 150}px` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 mt-3">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weight & Heart Rate Boxes */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-lg text-center">
                    <svg className="w-8 h-8 mx-auto text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    </svg>
                    <p className="text-sm text-gray-600 mt-2">Weight</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">69 kg</p>
                    <p className="text-sm text-green-600 mt-1">↓ 3 kg</p>
                  </div>
                  <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/60 shadow-lg text-center">
                    <HeartIcon className="text-pink-600 mx-auto" size={32} />
                    <p className="text-sm text-gray-600 mt-2">Heart Rate</p>
                    <p className="text-2xl font-bold text-pink-600 mt-1">68 bpm</p>
                    <p className="text-sm text-green-600 mt-1">↓ 7 bpm</p>
                  </div>
                </div>

                {/* Trend Summary */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <ChartIcon className="text-green-600" size={20} />
                    <strong>Trend:</strong> Your vitals are improving! All parameters showing positive trends.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Recent Medical Reports" className="h-full">
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{report.title}</p>
                          <p className="text-xs text-gray-500">{report.date} • {report.type}</p>
                        </div>
                        <Badge
                          variant={
                            report.status === 'Normal' ? 'success' :
                            report.status === 'Borderline' ? 'warning' : 'error'
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{report.summary}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          className="text-xs py-1 px-3"
                          onClick={() => setSelectedReportSummary(
                            selectedReportSummary === report.id ? null : report.id
                          )}
                        >
                          {selectedReportSummary === report.id ? 'Close' : 'AI Summary'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-xs py-1 px-3"
                          onClick={() => handleViewFullReport(report.id)}
                        >
                          View Full
                        </Button>
                      </div>
                    </div>

                    {/* AI Summary Expansion */}
                    {selectedReportSummary === report.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-300 shadow-lg"
                      >
                        <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono leading-relaxed">
                          {report.aiSummary}
                        </pre>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* 4. AI Health Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card title="AI Health Insights">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-4 border-2 ${
                    insight.severity === 'positive' ? 'bg-green-50 border-green-200' :
                    insight.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{insight.title}</p>
                      <p className="text-xs text-gray-700">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 5. Emergency Quick Info & 6. Data Access Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card title="❤️ Emergency Quick Info" className="bg-red-50 border-2 border-red-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blood Group:</span>
                  <span className="text-lg font-bold text-red-600">{patientData.bloodGroup}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Emergency Contact:</span>
                  <span className="text-sm font-semibold text-gray-900">{patientData.emergencyContact}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Allergies:</span>
                  <div className="flex gap-2 mt-1">
                    {patientData.allergies.map((allergy, idx) => (
                      <Badge key={idx} variant="error">{allergy}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Critical Conditions:</span>
                  <div className="flex gap-2 mt-1">
                    {patientData.ongoingConditions.map((condition, idx) => (
                      <Badge key={idx} variant="warning">{condition}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="error" className="w-full mt-4">
                  📱 Generate Emergency QR Code
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Data Access Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card title="🔐 Data Access Status">
              <div className="space-y-3">
                {accessStatus.map((access, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{access.entity}</p>
                        <p className="text-xs text-gray-600 mt-1">{access.access}</p>
                        <p className="text-xs text-gray-500">Expires: {access.expires}</p>
                      </div>
                      <Badge
                        variant={access.status === 'active' ? 'success' : 'warning'}
                      >
                        {access.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-3">
                  Manage Access →
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* 7. Smart Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card title="🧭 Smart Shortcuts">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:shadow-lg transition-all">
                <span className="text-3xl mb-2 block">📤</span>
                <span className="text-sm font-medium">Upload Report</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 hover:shadow-lg transition-all">
                <span className="text-3xl mb-2 block">📅</span>
                <span className="text-sm font-medium">Book Appointment</span>
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 hover:shadow-lg transition-all">
                <span className="text-3xl mb-2 block">🤖</span>
                <span className="text-sm font-medium">AI Chatbot</span>
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 hover:shadow-lg transition-all">
                <span className="text-3xl mb-2 block">🔐</span>
                <span className="text-sm font-medium">Grant Access</span>
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Add-ons: Daily Health Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card title="📌 Daily Health Tracker">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🚶</div>
                <div className="text-2xl font-bold text-blue-600">8,542</div>
                <p className="text-xs text-gray-600">Steps Today</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">😴</div>
                <div className="text-2xl font-bold text-purple-600">7.5h</div>
                <p className="text-xs text-gray-600">Sleep</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💧</div>
                <div className="text-2xl font-bold text-cyan-600">2.1L</div>
                <p className="text-xs text-gray-600">Water Intake</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-600">420</div>
                <p className="text-xs text-gray-600">Calories Burned</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Report Detail Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
      />
    </div>
  );
};
