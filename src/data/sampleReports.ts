// Sample Medical Report Data

export const labReportSamples = {
  cbc: {
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
        parameter: 'Hematocrit',
        value: '45.5',
        unit: '%',
        normalRange: '38.8-50.0',
        status: 'normal' as const
      },
      {
        parameter: 'MCV',
        value: '88',
        unit: 'fL',
        normalRange: '80-100',
        status: 'normal' as const
      },
      {
        parameter: 'MCH',
        value: '29.2',
        unit: 'pg',
        normalRange: '27-33',
        status: 'normal' as const
      },
      {
        parameter: 'MCHC',
        value: '33.4',
        unit: 'g/dL',
        normalRange: '32-36',
        status: 'normal' as const
      },
      {
        parameter: 'ESR',
        value: '8',
        unit: 'mm/hr',
        normalRange: '0-15',
        status: 'normal' as const
      }
    ],
    clinicalFindings: `SPECIMEN: Venous blood collected in EDTA tube
COLLECTION DATE: 2025-01-15, 08:30 AM
RECEIVED DATE: 2025-01-15, 09:00 AM
REPORTED DATE: 2025-01-15, 02:30 PM

METHODOLOGY: Automated hematology analyzer with manual differential count verification

CLINICAL NOTES:
Patient presented for routine health check-up. No active complaints. Blood sample collected under standard phlebotomy protocols. Sample quality: Adequate, no clotting observed.`,
    diagnosis: `INTERPRETATION: Normal Complete Blood Count

All hematological parameters are within normal reference ranges. No evidence of:
• Anemia
• Leukocytosis or Leukopenia
• Thrombocytopenia or Thrombocytosis
• Abnormal cell morphology

CONCLUSION: Results indicate healthy blood profile consistent with normal hematopoiesis.`,
    aiAnalysis: `🤖 AI-POWERED HEALTH INSIGHTS

✓ OVERALL ASSESSMENT: EXCELLENT BLOOD HEALTH
Your complete blood count shows optimal results across all parameters.

📊 KEY FINDINGS:

🔴 RED BLOOD CELLS (Oxygen Transport)
• Hemoglobin: 15.2 g/dL - Excellent oxygen-carrying capacity
• RBC Count: 5.2 million/μL - Healthy red blood cell production
• Hematocrit: 45.5% - Optimal blood volume
• MCV, MCH, MCHC: All normal - Well-formed red blood cells

⚪ WHITE BLOOD CELLS (Immune System)
• WBC Count: 7,200/μL - Strong immune defense
• No signs of infection or immune disorders

🟡 PLATELETS (Blood Clotting)
• Platelet Count: 250,000/μL - Excellent clotting ability
• No bleeding or clotting disorders detected

📈 INFLAMMATION MARKER
• ESR: 8 mm/hr - No signs of inflammation

💡 CLINICAL SIGNIFICANCE:
Your blood work demonstrates excellent overall health. All cell lines are functioning optimally, indicating:
• Strong immune system
• Good oxygen delivery to tissues
• Healthy blood clotting mechanism
• No signs of anemia, infection, or inflammation

✅ RECOMMENDATIONS:
• Continue current healthy lifestyle
• Maintain balanced diet rich in iron, B12, and folate
• Stay well hydrated
• Regular exercise to maintain cardiovascular health
• Next CBC recommended in 12 months for routine monitoring

🎯 HEALTH SCORE: 95/100 (Excellent)`,
    recommendations: [
      'Continue current healthy lifestyle and balanced diet',
      'Maintain adequate iron intake through diet (red meat, spinach, lentils)',
      'Ensure sufficient vitamin B12 and folate intake',
      'Stay well hydrated (8-10 glasses of water daily)',
      'Regular exercise (30 minutes daily) to maintain cardiovascular health',
      'Avoid smoking and excessive alcohol consumption',
      'Next complete blood count recommended in 12 months'
    ],
    blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385'
  },

  lipidProfile: {
    reportId: 'LAB-2025-002345',
    reportType: 'Laboratory Report',
    reportTitle: 'Lipid Profile Analysis',
    date: '2025-01-15',
    hospital: 'Fortis Hospital, Bangalore',
    doctor: 'Dr. Meera Reddy, MD (Cardiology)',
    patient: {
      name: 'Amit Sharma',
      age: 42,
      gender: 'Male',
      patientId: 'PT-2025-6789',
      bloodGroup: 'B+',
      contact: '+91 98765 43220'
    },
    testResults: [
      {
        parameter: 'Total Cholesterol',
        value: '215',
        unit: 'mg/dL',
        normalRange: '<200',
        status: 'warning' as const
      },
      {
        parameter: 'LDL Cholesterol',
        value: '145',
        unit: 'mg/dL',
        normalRange: '<100',
        status: 'warning' as const
      },
      {
        parameter: 'HDL Cholesterol',
        value: '42',
        unit: 'mg/dL',
        normalRange: '>40',
        status: 'normal' as const
      },
      {
        parameter: 'Triglycerides',
        value: '180',
        unit: 'mg/dL',
        normalRange: '<150',
        status: 'warning' as const
      },
      {
        parameter: 'VLDL Cholesterol',
        value: '36',
        unit: 'mg/dL',
        normalRange: '<30',
        status: 'warning' as const
      },
      {
        parameter: 'TC/HDL Ratio',
        value: '5.1',
        unit: 'ratio',
        normalRange: '<4.5',
        status: 'warning' as const
      }
    ],
    clinicalFindings: `SPECIMEN: Serum (Fasting sample - 12 hours)
COLLECTION DATE: 2025-01-15, 07:00 AM
FASTING STATUS: Confirmed (12 hours)
METHODOLOGY: Enzymatic colorimetric method

CLINICAL NOTES:
Patient referred for cardiovascular risk assessment. Family history of coronary artery disease. Currently not on any lipid-lowering medications.`,
    diagnosis: `INTERPRETATION: Borderline High Cholesterol with Elevated LDL

FINDINGS:
• Total Cholesterol: Borderline high (215 mg/dL)
• LDL Cholesterol: Above optimal (145 mg/dL) - "Bad cholesterol"
• HDL Cholesterol: Acceptable (42 mg/dL) - "Good cholesterol"
• Triglycerides: Borderline high (180 mg/dL)
• TC/HDL Ratio: Elevated (5.1) - Increased cardiovascular risk

CARDIOVASCULAR RISK ASSESSMENT: MODERATE
The lipid profile indicates increased risk for cardiovascular disease. Lifestyle modifications and possible pharmacological intervention recommended.`,
    aiAnalysis: `🤖 AI CARDIOVASCULAR RISK ANALYSIS

⚠️ OVERALL ASSESSMENT: MODERATE RISK - ACTION REQUIRED
Your lipid profile shows several parameters outside optimal ranges, indicating increased cardiovascular risk.

📊 DETAILED ANALYSIS:

🔴 CONCERNING FINDINGS:
• Total Cholesterol: 215 mg/dL (Target: <200)
  → 7.5% above optimal range
  
• LDL Cholesterol: 145 mg/dL (Target: <100)
  → 45% above optimal - Primary concern
  → "Bad cholesterol" that builds up in arteries
  
• Triglycerides: 180 mg/dL (Target: <150)
  → 20% above optimal
  → Linked to heart disease and pancreatitis risk
  
• TC/HDL Ratio: 5.1 (Target: <4.5)
  → Elevated cardiovascular risk indicator

🟢 POSITIVE FINDINGS:
• HDL Cholesterol: 42 mg/dL (Acceptable)
  → "Good cholesterol" that removes bad cholesterol
  → Could be improved (target: >60 for optimal protection)

💡 CARDIOVASCULAR RISK FACTORS:
Based on your lipid profile, you have:
• 2.5x increased risk of heart disease compared to optimal levels
• Moderate risk of atherosclerosis (artery plaque buildup)
• Increased risk of stroke and heart attack

🎯 IMMEDIATE ACTION PLAN:

1. LIFESTYLE MODIFICATIONS (Start immediately):
   • Reduce saturated fat intake (<7% of calories)
   • Eliminate trans fats completely
   • Increase fiber intake (25-30g daily)
   • Add omega-3 fatty acids (fish, walnuts, flaxseed)
   • Exercise 150 minutes/week (moderate intensity)
   • Achieve/maintain healthy weight (BMI 18.5-24.9)
   • Quit smoking if applicable

2. DIETARY CHANGES:
   • Increase: Oats, beans, nuts, fatty fish, vegetables
   • Reduce: Red meat, full-fat dairy, fried foods, baked goods
   • Avoid: Trans fats, excessive alcohol

3. MEDICAL FOLLOW-UP:
   • Consult cardiologist for risk stratification
   • Consider statin therapy if lifestyle changes insufficient
   • Recheck lipid profile in 3 months
   • Monitor blood pressure and blood sugar

⏰ TIMELINE:
• Week 1-4: Implement dietary changes
• Month 1-3: Intensive lifestyle modification
• Month 3: Repeat lipid profile
• Month 6: Reassess cardiovascular risk

🎯 TARGET GOALS:
• Total Cholesterol: <200 mg/dL
• LDL Cholesterol: <100 mg/dL (ideally <70)
• HDL Cholesterol: >60 mg/dL
• Triglycerides: <150 mg/dL
• TC/HDL Ratio: <4.0`,
    recommendations: [
      'URGENT: Schedule appointment with cardiologist within 2 weeks',
      'Start heart-healthy diet immediately (Mediterranean or DASH diet)',
      'Exercise 30 minutes daily, 5 days per week (brisk walking, swimming)',
      'Reduce saturated fat intake to <7% of total calories',
      'Increase soluble fiber intake (oats, beans, fruits)',
      'Add omega-3 rich foods (salmon, mackerel, walnuts)',
      'Achieve and maintain healthy body weight (BMI 18.5-24.9)',
      'Quit smoking if applicable - smoking lowers HDL',
      'Limit alcohol consumption (max 1-2 drinks per day)',
      'Consider plant sterols/stanols supplements (2g daily)',
      'Recheck lipid profile in 3 months after lifestyle changes',
      'Discuss statin therapy with your doctor if needed'
    ],
    blockchainHash: '0x8b1fade2e1d68c9ch88cd6gce9fade2e1d68c9ch88cd6gce9e4e4gd9d33c13507'
  }
};

export const radiologyReportSamples = {
  chestXray: {
    reportId: 'RAD-2025-005678',
    reportType: 'Radiology Report',
    reportTitle: 'Chest X-Ray (PA & Lateral Views)',
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
    clinicalFindings: `EXAMINATION: Chest Radiograph (PA and Lateral Views)
CLINICAL INDICATION: Routine health screening
TECHNIQUE: Digital radiography, PA and lateral projections
COMPARISON: None available

FINDINGS:

LUNGS:
• Clear bilateral lung fields
• No focal consolidation, mass, or nodule
• No pleural effusion or pneumothorax
• Lung volumes are normal
• No interstitial abnormality

HEART & MEDIASTINUM:
• Normal cardiac silhouette
• Cardiothoracic ratio: 0.45 (Normal: <0.50)
• Normal mediastinal contours
• No mediastinal widening or mass
• Aortic knob is normal

BONES & SOFT TISSUES:
• No acute osseous abnormality
• Mild degenerative changes in thoracic spine (age-appropriate)
• Soft tissues are unremarkable
• No subcutaneous emphysema

DIAPHRAGM:
• Normal hemidiaphragm contours
• No elevation or flattening

IMPRESSION: Normal chest radiograph. No acute cardiopulmonary disease.`,
    diagnosis: `RADIOLOGICAL DIAGNOSIS: Normal Study

No evidence of:
• Pneumonia or lung infection
• Pulmonary edema
• Pleural effusion
• Pneumothorax
• Lung mass or nodule
• Cardiac enlargement
• Mediastinal abnormality

INCIDENTAL FINDINGS:
• Mild degenerative changes in thoracic spine - age-appropriate, no clinical significance

RECOMMENDATION: No further imaging required at this time. Clinical correlation advised.`,
    aiAnalysis: `🤖 AI RADIOLOGY ANALYSIS

✓ OVERALL ASSESSMENT: NORMAL CHEST X-RAY
Comprehensive AI analysis shows no acute abnormalities.

📊 DETAILED FINDINGS:

🫁 LUNG ANALYSIS:
• Bilateral lung fields: Clear and well-aerated
• No signs of infection, inflammation, or fluid
• No masses, nodules, or suspicious lesions detected
• Lung volumes: Normal expansion
• Air-fluid levels: None detected
• Confidence Score: 98.5%

❤️ CARDIAC ASSESSMENT:
• Heart size: Normal (CTR: 0.45, Normal: <0.50)
• Cardiac borders: Sharp and well-defined
• No cardiomegaly or chamber enlargement
• Confidence Score: 97.2%

🔍 MEDIASTINAL EVALUATION:
• Mediastinal contours: Normal
• No widening or mass effect
• Trachea: Midline, no deviation
• Aortic knob: Normal caliber
• Confidence Score: 96.8%

🦴 SKELETAL STRUCTURES:
• Ribs: Intact, no fractures
• Thoracic spine: Mild age-related changes (normal)
• Clavicles: Symmetric, no abnormality
• Confidence Score: 99.1%

💡 CLINICAL INTERPRETATION:
This is a reassuring normal chest X-ray. The mild degenerative changes in your thoracic spine are consistent with normal aging and do not require treatment.

✅ AI CONFIDENCE: 97.9% (High Confidence)
The AI analysis has been reviewed and correlates with radiologist interpretation.

🎯 RECOMMENDATIONS:
• No immediate medical intervention required
• Continue routine health maintenance
• Report any new respiratory symptoms promptly
• Next chest X-ray only if clinically indicated`,
    recommendations: [
      'No immediate medical intervention required',
      'Maintain good respiratory health practices',
      'Avoid smoking and secondhand smoke exposure',
      'Practice good posture to support spine health',
      'Continue regular health check-ups as scheduled',
      'Report any new symptoms: cough, chest pain, shortness of breath',
      'Annual chest X-ray recommended only if risk factors present',
      'Stay up to date with vaccinations (flu, pneumonia)'
    ],
    blockchainHash: '0x9c2fade3f2e79d0di99de7hdf0fade3f2e79d0di99de7hdf0f5f5he0e44d24618'
  }
};

export const getAllSampleReports = () => {
  return {
    laboratory: labReportSamples,
    radiology: radiologyReportSamples
  };
};
