export interface ReportParameter {
  name: string;
  value: string;
  unit?: string;
  normalRange: string;
  status: 'Normal' | 'Borderline' | 'Abnormal';
}

export interface DetailedReport {
  id: number;
  title: string;
  date: string;
  type: 'Lab Report' | 'Imaging' | 'Diagnostic';
  status: 'Normal' | 'Borderline' | 'Abnormal';
  summary: string;
  aiSummary: string;
  doctor: string;
  hospital: string;
  parameters: ReportParameter[];
  recommendations: string[];
  nextFollowUp?: string;
}

export const detailedReportsData: DetailedReport[] = [
  {
    id: 1,
    title: 'Complete Blood Count (CBC)',
    date: '2025-10-25',
    type: 'Lab Report',
    status: 'Normal',
    summary: 'All parameters within normal range. Blood health is excellent.',
    doctor: 'Dr. Priya Sharma',
    hospital: 'Apollo Hospital',
    aiSummary: `Your blood work shows healthy results across all parameters. All cell counts are within optimal ranges, indicating strong immune function, good oxygen delivery to tissues, and healthy blood clotting. No signs of anemia or infection detected.`,
    parameters: [
      {
        name: 'Hemoglobin',
        value: '15.2',
        unit: 'g/dL',
        normalRange: '13.5-17.5',
        status: 'Normal'
      },
      {
        name: 'WBC Count',
        value: '7,200',
        unit: '/μL',
        normalRange: '4,500-11,000',
        status: 'Normal'
      },
      {
        name: 'RBC Count',
        value: '5.2',
        unit: 'million/μL',
        normalRange: '4.5-5.9',
        status: 'Normal'
      },
      {
        name: 'Platelets',
        value: '250,000',
        unit: '/μL',
        normalRange: '150,000-400,000',
        status: 'Normal'
      },
      {
        name: 'Hematocrit',
        value: '45',
        unit: '%',
        normalRange: '38-50',
        status: 'Normal'
      },
      {
        name: 'MCV',
        value: '88',
        unit: 'fL',
        normalRange: '80-100',
        status: 'Normal'
      },
      {
        name: 'MCH',
        value: '30',
        unit: 'pg',
        normalRange: '27-33',
        status: 'Normal'
      },
      {
        name: 'MCHC',
        value: '34',
        unit: 'g/dL',
        normalRange: '32-36',
        status: 'Normal'
      },
      {
        name: 'ESR',
        value: '8',
        unit: 'mm/hr',
        normalRange: '0-15',
        status: 'Normal'
      }
    ],
    recommendations: [
      'Continue current healthy lifestyle',
      'Maintain balanced diet rich in iron and vitamins',
      'Stay hydrated (8-10 glasses water daily)',
      'Regular exercise (30 minutes daily)',
      'Next CBC recommended in 6 months'
    ],
    nextFollowUp: '2026-04-25'
  },
  {
    id: 2,
    title: 'Lipid Profile',
    date: '2025-10-20',
    type: 'Lab Report',
    status: 'Borderline',
    summary: 'Cholesterol slightly elevated. Lifestyle modifications recommended.',
    doctor: 'Dr. Rajesh Kumar',
    hospital: 'Max Healthcare',
    aiSummary: `Your cholesterol levels are slightly elevated and require lifestyle modifications. Total cholesterol and LDL are in borderline range. HDL (good cholesterol) is lower than optimal. Immediate lifestyle changes can help improve these values without medication.`,
    parameters: [
      {
        name: 'Total Cholesterol',
        value: '210',
        unit: 'mg/dL',
        normalRange: '<200',
        status: 'Borderline'
      },
      {
        name: 'LDL Cholesterol',
        value: '135',
        unit: 'mg/dL',
        normalRange: '<100',
        status: 'Borderline'
      },
      {
        name: 'HDL Cholesterol',
        value: '45',
        unit: 'mg/dL',
        normalRange: '>60',
        status: 'Borderline'
      },
      {
        name: 'Triglycerides',
        value: '165',
        unit: 'mg/dL',
        normalRange: '<150',
        status: 'Borderline'
      },
      {
        name: 'VLDL Cholesterol',
        value: '33',
        unit: 'mg/dL',
        normalRange: '2-30',
        status: 'Borderline'
      },
      {
        name: 'Cholesterol/HDL Ratio',
        value: '4.7',
        unit: '',
        normalRange: '<4.5',
        status: 'Borderline'
      },
      {
        name: 'LDL/HDL Ratio',
        value: '3.0',
        unit: '',
        normalRange: '<3.0',
        status: 'Normal'
      }
    ],
    recommendations: [
      'Reduce saturated fat intake',
      'Increase omega-3 rich foods (fish, nuts)',
      'Exercise 40-45 minutes daily',
      'Add more fiber to diet (oats, vegetables)',
      'Limit processed foods and red meat',
      'Recheck lipid profile in 3 months'
    ],
    nextFollowUp: '2026-01-20'
  },
  {
    id: 3,
    title: 'Chest X-Ray',
    date: '2025-10-18',
    type: 'Imaging',
    status: 'Normal',
    summary: 'Clear lung fields. No abnormalities detected.',
    doctor: 'Dr. Anjali Verma',
    hospital: 'Fortis Hospital',
    aiSummary: `The chest X-ray shows clear lung fields with no signs of infection, fluid accumulation, or masses. Heart size is normal. No evidence of pneumonia, tuberculosis, or other pulmonary pathology. The imaging is consistent with healthy respiratory function.`,
    parameters: [
      {
        name: 'Lung Fields',
        value: 'Clear bilaterally',
        normalRange: 'Clear',
        status: 'Normal'
      },
      {
        name: 'Heart Size',
        value: 'Normal',
        normalRange: 'Normal',
        status: 'Normal'
      },
      {
        name: 'Cardiac Silhouette',
        value: 'Within normal limits',
        normalRange: 'Normal',
        status: 'Normal'
      },
      {
        name: 'Mediastinum',
        value: 'Central',
        normalRange: 'Central',
        status: 'Normal'
      },
      {
        name: 'Diaphragm',
        value: 'Normal position',
        normalRange: 'Normal',
        status: 'Normal'
      },
      {
        name: 'Pleural Space',
        value: 'No effusion',
        normalRange: 'No effusion',
        status: 'Normal'
      },
      {
        name: 'Bone Structure',
        value: 'Intact',
        normalRange: 'Intact',
        status: 'Normal'
      },
      {
        name: 'Soft Tissues',
        value: 'Unremarkable',
        normalRange: 'Unremarkable',
        status: 'Normal'
      }
    ],
    recommendations: [
      'No immediate follow-up required',
      'Maintain good respiratory hygiene',
      'Avoid smoking and secondhand smoke',
      'Annual chest X-ray if symptomatic',
      'Continue regular exercise for lung health'
    ],
    nextFollowUp: 'As needed'
  }
];
