import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MedicalRecord {
  id: number;
  type: 'Lab Report' | 'Prescription' | 'X-Ray' | 'MRI Scan' | 'CT Scan' | 'Doctor Notes' | 'Discharge Summary';
  hospital: string;
  doctor: string;
  date: string;
  findings: string;
  status: 'Verified' | 'Pending' | 'Under Review';
  fileSize: string;
  summary: string;
}

interface Patient {
  id: number;
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  records: MedicalRecord[];
}

interface PatientContextType {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  getPatientById: (id: number) => Patient | undefined;
  getAllPatients: () => Patient[];
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};

// Mock patient data with medical records
const mockPatients: Patient[] = [
  {
    id: 7,
    name: 'Rahul Verma',
    abhaId: '12-3456-7890-6789',
    age: 29,
    gender: 'Male',
    phone: '+91 98765 43216',
    email: 'rahul.verma@email.com',
    address: 'Sector 15, Gurgaon, Haryana',
    bloodGroup: 'O+',
    emergencyContact: '+91 98765 43200',
    records: [
      {
        id: 1,
        type: 'Lab Report',
        hospital: 'Apollo Hospital',
        doctor: 'Dr. Sharma',
        date: '2025-10-28',
        findings: 'Blood Sugar: 95 mg/dL (Normal)\nHemoglobin: 15.2 g/dL (Normal)\nCholesterol: 165 mg/dL (Normal)\nVitamin D: 32 ng/mL (Sufficient)',
        status: 'Verified',
        fileSize: '2.1 MB',
        summary: 'Complete blood work shows all parameters within normal range'
      },
      {
        id: 2,
        type: 'Prescription',
        hospital: 'Fortis Hospital',
        doctor: 'Dr. Patel',
        date: '2025-10-25',
        findings: 'Medications:\n- Paracetamol 500mg (3x daily for 5 days)\n- Cetirizine 10mg (1x daily for 7 days)\n- Vitamin C tablets (1x daily for 15 days)',
        status: 'Verified',
        fileSize: '0.8 MB',
        summary: 'Treatment for seasonal allergies and mild fever'
      },
      {
        id: 3,
        type: 'X-Ray',
        hospital: 'Max Hospital',
        doctor: 'Dr. Reddy',
        date: '2025-10-20',
        findings: 'Chest X-Ray: Clear lung fields\nHeart size: Normal\nNo signs of pneumonia or tuberculosis\nBone structure: Normal',
        status: 'Verified',
        fileSize: '4.5 MB',
        summary: 'Routine chest X-ray shows no abnormalities'
      },
      {
        id: 4,
        type: 'Doctor Notes',
        hospital: 'AIIMS Delhi',
        doctor: 'Dr. Singh',
        date: '2025-10-15',
        findings: 'Patient complained of mild headaches\nBP: 120/80 mmHg (Normal)\nPulse: 72 bpm (Normal)\nRecommended adequate sleep and hydration\nFollow-up if symptoms persist',
        status: 'Verified',
        fileSize: '0.5 MB',
        summary: 'Routine consultation for headaches - no serious concerns'
      },
      {
        id: 5,
        type: 'Lab Report',
        hospital: 'Medanta Hospital',
        doctor: 'Dr. Gupta',
        date: '2025-10-10',
        findings: 'Liver Function Test:\nSGPT: 28 U/L (Normal)\nSGOT: 32 U/L (Normal)\nBilirubin: 0.8 mg/dL (Normal)\nAlbumin: 4.2 g/dL (Normal)',
        status: 'Verified',
        fileSize: '1.9 MB',
        summary: 'Liver function tests all within normal limits'
      },
      {
        id: 6,
        type: 'Prescription',
        hospital: 'Manipal Hospital',
        doctor: 'Dr. Iyer',
        date: '2025-10-05',
        findings: 'Medications:\n- Omeprazole 20mg (1x daily before breakfast)\n- Domperidone 10mg (3x daily before meals)\n- Probiotics (1x daily for 2 weeks)',
        status: 'Verified',
        fileSize: '0.7 MB',
        summary: 'Treatment for mild gastritis and digestive issues'
      },
      {
        id: 7,
        type: 'MRI Scan',
        hospital: 'BLK Hospital',
        doctor: 'Dr. Kapoor',
        date: '2025-09-28',
        findings: 'Brain MRI: Normal brain parenchyma\nNo signs of hemorrhage or infarction\nVentricular system: Normal\nNo mass lesions detected',
        status: 'Verified',
        fileSize: '12.3 MB',
        summary: 'Brain MRI scan shows normal findings'
      },
      {
        id: 8,
        type: 'Lab Report',
        hospital: 'Jaypee Hospital',
        doctor: 'Dr. Malhotra',
        date: '2025-09-20',
        findings: 'Thyroid Function Test:\nTSH: 2.1 mIU/L (Normal)\nT3: 1.2 ng/mL (Normal)\nT4: 8.5 μg/dL (Normal)\nAnti-TPO: Negative',
        status: 'Verified',
        fileSize: '1.6 MB',
        summary: 'Thyroid function tests within normal range'
      },
      {
        id: 9,
        type: 'CT Scan',
        hospital: 'Artemis Hospital',
        doctor: 'Dr. Joshi',
        date: '2025-09-15',
        findings: 'Abdominal CT Scan:\nLiver: Normal size and density\nKidneys: Normal bilateral kidneys\nPancreas: Normal\nNo signs of stones or masses',
        status: 'Verified',
        fileSize: '8.7 MB',
        summary: 'Abdominal CT scan shows no abnormalities'
      },
      {
        id: 10,
        type: 'Discharge Summary',
        hospital: 'Safdarjung Hospital',
        doctor: 'Dr. Agarwal',
        date: '2025-09-10',
        findings: 'Admitted for: Minor food poisoning\nTreatment: IV fluids, anti-emetics\nDuration: 2 days\nCondition at discharge: Stable\nAdvice: Light diet for 3 days, adequate hydration',
        status: 'Verified',
        fileSize: '1.2 MB',
        summary: 'Successfully treated for food poisoning - discharged in stable condition'
      }
    ]
  },
  // Add other patients with fewer records for demo
  {
    id: 1,
    name: 'Rajesh Kumar',
    abhaId: '12-3456-7890-1234',
    age: 45,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    address: 'Connaught Place, New Delhi',
    bloodGroup: 'B+',
    emergencyContact: '+91 98765 43201',
    records: [
      {
        id: 1,
        type: 'Lab Report',
        hospital: 'Apollo Hospital',
        doctor: 'Dr. Sharma',
        date: '2025-11-01',
        findings: 'Blood Sugar: 120 mg/dL (Normal)\nHemoglobin: 14.5 g/dL (Normal)\nCholesterol: 180 mg/dL (Borderline)',
        status: 'Verified',
        fileSize: '2.4 MB',
        summary: 'Routine health checkup - mostly normal values'
      }
    ]
  }
];

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const getPatientById = (id: number): Patient | undefined => {
    return mockPatients.find(patient => patient.id === id);
  };

  const getAllPatients = (): Patient[] => {
    return mockPatients;
  };

  return (
    <PatientContext.Provider value={{
      selectedPatient,
      setSelectedPatient,
      getPatientById,
      getAllPatients
    }}>
      {children}
    </PatientContext.Provider>
  );
};