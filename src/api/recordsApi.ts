// Mock API for Medical Records

export const mockDelay = () => Math.random() * 400 + 400; // 400-800ms

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'Lab' | 'Radiology' | 'Prescription' | 'MRI' | 'Surgery' | 'X-Ray' | 'CT Scan' | 'Discharge Summary';
  date: string;
  hospital: string;
  ipfsCid: string;
  txHash: string;
  aiSummary: string;
  verified: boolean;
  doctor?: string;
  details?: string;
  findings?: string;
}

export const mockRecords: MedicalRecord[] = [
  {
    id: "r001",
    title: "Appendectomy Surgery Report",
    type: "Surgery",
    date: "2025-10-28",
    hospital: "Apollo Hospitals",
    doctor: "Dr. Rajesh Sharma",
    ipfsCid: "bafybeisurgery001",
    txHash: "0xAB12CD34EF56",
    aiSummary: "Successful laparoscopic appendectomy performed. Patient recovered well with no complications.",
    details: "Emergency appendectomy performed due to acute appendicitis. Surgery duration: 45 minutes. Minimal blood loss. Patient discharged after 2 days.",
    findings: "Inflamed appendix removed successfully. Histopathology confirmed acute appendicitis. No signs of perforation or abscess formation.",
    verified: true
  },
  {
    id: "r002",
    title: "Complete Blood Count (CBC)",
    type: "Lab",
    date: "2025-10-25",
    hospital: "Fortis Healthcare",
    doctor: "Dr. Priya Patel",
    ipfsCid: "bafybeilab002",
    txHash: "0xBC23DE45FG67",
    aiSummary: "All blood parameters within normal range. Hemoglobin: 14.5 g/dL, WBC: 7,200/μL, Platelets: 250,000/μL.",
    details: "Routine health checkup blood test. Fasting sample collected. Results show excellent overall health.",
    findings: "Hemoglobin: 14.5 g/dL (Normal)\nWBC Count: 7,200/μL (Normal)\nRBC Count: 5.2 million/μL (Normal)\nPlatelets: 250,000/μL (Normal)\nESR: 8 mm/hr (Normal)",
    verified: true
  },
  {
    id: "r003",
    title: "Cardiac Bypass Surgery",
    type: "Surgery",
    date: "2025-09-15",
    hospital: "Medanta - The Medicity",
    doctor: "Dr. Vikram Singh",
    ipfsCid: "bafybeisurgery003",
    txHash: "0xCD34EF56GH78",
    aiSummary: "Triple vessel coronary artery bypass grafting (CABG) performed successfully. Patient stable post-operation.",
    details: "Triple vessel CABG performed for severe coronary artery disease. Surgery duration: 4 hours 30 minutes. Cardiopulmonary bypass used. ICU stay: 3 days. Total hospital stay: 10 days.",
    findings: "Three grafts placed: LIMA to LAD, SVG to RCA, SVG to OM. All grafts patent on post-op echo. EF improved from 35% to 50%. Patient on cardiac rehabilitation program.",
    verified: true
  },
  {
    id: "r004",
    title: "Chest X-Ray",
    type: "X-Ray",
    date: "2025-10-20",
    hospital: "Max Hospital",
    doctor: "Dr. Anita Desai",
    ipfsCid: "bafybeixray004",
    txHash: "0xDE45FG67HI89",
    aiSummary: "Clear lung fields. No signs of infection, pneumonia, or tuberculosis. Heart size normal.",
    details: "PA and lateral chest X-ray performed. Patient presented with mild cough. Imaging shows no acute pathology.",
    findings: "Lungs: Clear bilateral lung fields\nHeart: Normal cardiac silhouette\nMediastinum: Normal\nBones: No fractures or lesions\nConclusion: Normal chest X-ray",
    verified: true
  },
  {
    id: "r005",
    title: "Diabetes Management Prescription",
    type: "Prescription",
    date: "2025-10-18",
    hospital: "Fortis Healthcare",
    doctor: "Dr. Suresh Gupta",
    ipfsCid: "bafybeipres005",
    txHash: "0xEF56GH78IJ90",
    aiSummary: "Updated diabetes medication regimen. Metformin 1000mg twice daily, Glimepiride 2mg once daily.",
    details: "Follow-up consultation for Type 2 Diabetes Mellitus. HbA1c: 7.2%. Blood sugar levels improving with current medication.",
    findings: "Medications:\n- Metformin 1000mg (2x daily with meals)\n- Glimepiride 2mg (1x daily before breakfast)\n- Aspirin 75mg (1x daily)\n- Atorvastatin 10mg (1x daily at night)\nDiet: Low carb, high fiber\nExercise: 30 min daily walk",
    verified: true
  },
  {
    id: "r006",
    title: "Brain MRI Scan",
    type: "MRI",
    date: "2025-10-10",
    hospital: "BLK Hospital",
    doctor: "Dr. Kavita Nair",
    ipfsCid: "bafybeimri006",
    txHash: "0xFG67HI89JK01",
    aiSummary: "Normal brain MRI. No signs of stroke, tumor, or abnormal lesions. Age-appropriate brain volume.",
    details: "MRI Brain with contrast performed for evaluation of persistent headaches. Scan duration: 45 minutes.",
    findings: "Brain Parenchyma: Normal signal intensity\nVentricular System: Normal size and configuration\nCerebellum: Normal\nBrainstem: Normal\nNo mass lesions or hemorrhage\nNo signs of acute infarction\nConclusion: Normal MRI Brain",
    verified: true
  },
  {
    id: "r007",
    title: "Knee Arthroscopy Surgery",
    type: "Surgery",
    date: "2025-09-28",
    hospital: "Artemis Hospital",
    doctor: "Dr. Rahul Verma",
    ipfsCid: "bafybeisurgery007",
    txHash: "0xGH78IJ90KL12",
    aiSummary: "Arthroscopic meniscus repair performed on right knee. Successful procedure with good prognosis.",
    details: "Right knee arthroscopy for torn medial meniscus. Minimally invasive procedure. Surgery duration: 1 hour 15 minutes. Day surgery - discharged same day.",
    findings: "Medial meniscus tear repaired using arthroscopic technique. Cartilage intact. ACL and PCL normal. Post-op physiotherapy recommended for 6 weeks. Expected full recovery in 3 months.",
    verified: true
  },
  {
    id: "r008",
    title: "Abdominal CT Scan",
    type: "CT Scan",
    date: "2025-10-05",
    hospital: "Jaypee Hospital",
    doctor: "Dr. Meera Iyer",
    ipfsCid: "bafybeict008",
    txHash: "0xHI89JK01LM23",
    aiSummary: "Normal abdominal CT scan. Liver, kidneys, pancreas, and spleen all normal. No stones or masses detected.",
    details: "CT Abdomen with oral and IV contrast performed for evaluation of abdominal pain. Scan shows no acute pathology.",
    findings: "Liver: Normal size and density, no focal lesions\nGallbladder: Normal, no stones\nPancreas: Normal\nSpleen: Normal size\nKidneys: Bilateral normal kidneys, no stones\nBowel: Normal gas pattern\nNo free fluid or lymphadenopathy\nConclusion: Normal CT Abdomen",
    verified: true
  },
  {
    id: "r009",
    title: "Thyroid Function Test",
    type: "Lab",
    date: "2025-09-30",
    hospital: "Max Hospital",
    doctor: "Dr. Amit Malhotra",
    ipfsCid: "bafybeilab009",
    txHash: "0xIJ90KL12MN34",
    aiSummary: "Thyroid function tests within normal limits. TSH: 2.5 mIU/L, T3: 1.2 ng/mL, T4: 8.0 μg/dL.",
    details: "Thyroid profile ordered due to fatigue and weight changes. Results indicate normal thyroid function.",
    findings: "TSH: 2.5 mIU/L (Normal: 0.5-5.0)\nT3: 1.2 ng/mL (Normal: 0.8-2.0)\nT4: 8.0 μg/dL (Normal: 5.0-12.0)\nAnti-TPO Antibodies: Negative\nConclusion: Euthyroid state - Normal thyroid function",
    verified: true
  },
  {
    id: "r010",
    title: "Post-Surgery Discharge Summary",
    type: "Discharge Summary",
    date: "2025-10-30",
    hospital: "Apollo Hospitals",
    doctor: "Dr. Rajesh Sharma",
    ipfsCid: "bafybeidischarge010",
    txHash: "0xJK01LM23NO45",
    aiSummary: "Patient discharged in stable condition post-appendectomy. Follow-up in 1 week for suture removal.",
    details: "Admission Date: 2025-10-26\nSurgery Date: 2025-10-28\nDischarge Date: 2025-10-30\nDiagnosis: Acute Appendicitis\nProcedure: Laparoscopic Appendectomy",
    findings: "Hospital Course: Patient admitted with acute appendicitis. Underwent successful laparoscopic appendectomy. Post-operative recovery uneventful. Pain managed with oral analgesics. Tolerating regular diet. Wound healing well.\n\nDischarge Medications:\n- Paracetamol 500mg (3x daily for 5 days)\n- Amoxicillin 500mg (3x daily for 7 days)\n\nFollow-up: OPD visit in 1 week for suture removal and wound check.\n\nAdvice: Rest for 2 weeks, avoid heavy lifting, keep wound dry.",
    verified: true
  }
];

export const recordsApiService = {
  getRecords: async (): Promise<MedicalRecord[]> => {
    await new Promise(resolve => setTimeout(resolve, mockDelay()));
    return mockRecords;
  },

  getRecordById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, mockDelay()));
    const record = mockRecords.find(r => r.id === id);
    return {
      ...record,
      signedUrl: `https://ipfs.io/ipfs/${record?.ipfsCid}`
    };
  },

  uploadRecord: async (_file: File) => {
    await new Promise(resolve => setTimeout(resolve, mockDelay()));
    return {
      ipfsCid: `bafynew${Math.random().toString(36).substr(2, 9)}`,
      txHash: `0x${Math.random().toString(16).substr(2, 6).toUpperCase()}`,
      aiSummary: "Report shows stable health indicators. All parameters within normal range."
    };
  },

  explainRecord: async (recordId: string) => {
    await new Promise(resolve => setTimeout(resolve, mockDelay()));
    const record = mockRecords.find(r => r.id === recordId);
    return {
      reply: `This ${record?.type} report from ${record?.hospital} shows: ${record?.aiSummary}`,
      explanation: "The AI analysis indicates that your health metrics are within acceptable ranges. Continue monitoring as advised by your healthcare provider."
    };
  }
};
