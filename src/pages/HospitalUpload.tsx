import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { useRequests } from '../contexts/RequestContext';
import { usePatient } from '../contexts/PatientContext';

// Mock patient database
const mockPatients = [
  { id: 1, name: 'Rajesh Kumar', abhaId: '12-3456-7890-1234', age: 45, gender: 'Male', phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Sharma', abhaId: '12-3456-7890-5678', age: 32, gender: 'Female', phone: '+91 98765 43211' },
  { id: 3, name: 'Amit Patel', abhaId: '12-3456-7890-9012', age: 28, gender: 'Male', phone: '+91 98765 43212' },
  { id: 4, name: 'Sneha Reddy', abhaId: '12-3456-7890-3456', age: 35, gender: 'Female', phone: '+91 98765 43213' },
  { id: 5, name: 'Vikram Singh', abhaId: '12-3456-7890-7890', age: 52, gender: 'Male', phone: '+91 98765 43214' },
  { id: 6, name: 'Anita Desai', abhaId: '12-3456-7890-2345', age: 41, gender: 'Female', phone: '+91 98765 43215' },
  { id: 7, name: 'Rahul Verma', abhaId: '12-3456-7890-6789', age: 29, gender: 'Male', phone: '+91 98765 43216' },
  { id: 8, name: 'Kavita Nair', abhaId: '12-3456-7890-0123', age: 38, gender: 'Female', phone: '+91 98765 43217' },
  { id: 9, name: 'Suresh Gupta', abhaId: '12-3456-7890-4567', age: 55, gender: 'Male', phone: '+91 98765 43218' },
  { id: 10, name: 'Meera Iyer', abhaId: '12-3456-7890-8901', age: 33, gender: 'Female', phone: '+91 98765 43219' },
];

interface Patient {
  id: number;
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  phone: string;
}

export const HospitalUpload: React.FC = () => {
  const { sentRequests, addSentRequest } = useRequests();
  const { setSelectedPatient: setPatientProfile, getPatientById } = usePatient();
  
  const [activeTab, setActiveTab] = useState<'upload' | 'request'>('upload');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('Lab Report');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [newPatientData, setNewPatientData] = useState({
    name: '',
    abhaId: '',
    age: '',
    gender: 'Male',
    phone: ''
  });

  // Access request states
  const [requestReason, setRequestReason] = useState('');
  const [requestDuration, setRequestDuration] = useState('7');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Mock recent uploads with more details - now as state
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      patient: 'Rajesh Kumar',
      abhaId: '12-3456-7890-1234',
      type: 'Lab Report',
      time: '5 mins ago',
      date: '2025-11-01',
      hospital: 'Apollo Hospital',
      doctor: 'Dr. Sharma',
      fileSize: '2.4 MB',
      status: 'Verified',
      findings: 'Blood Sugar: 120 mg/dL (Normal)\nHemoglobin: 14.5 g/dL (Normal)\nCholesterol: 180 mg/dL (Borderline)',
    },
    {
      id: 2,
      patient: 'Priya Sharma',
      abhaId: '12-3456-7890-5678',
      type: 'X-Ray',
      time: '15 mins ago',
      date: '2025-11-01',
      hospital: 'Fortis Hospital',
      doctor: 'Dr. Patel',
      fileSize: '5.1 MB',
      status: 'Verified',
      findings: 'Chest X-Ray: No abnormalities detected\nLung fields clear\nHeart size normal',
    },
    {
      id: 3,
      patient: 'Amit Patel',
      abhaId: '12-3456-7890-9012',
      type: 'Prescription',
      time: '1 hour ago',
      date: '2025-11-01',
      hospital: 'Max Hospital',
      doctor: 'Dr. Reddy',
      fileSize: '0.8 MB',
      status: 'Verified',
      findings: 'Medications:\n- Metformin 500mg (2x daily)\n- Aspirin 75mg (1x daily)\n- Vitamin D3 (Weekly)',
    },
  ]);

  // Filter patients based on search query
  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.abhaId.includes(searchQuery)
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.length > 0);
    setSelectedPatient(null);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient.name);
    setShowResults(false);
    setShowNewPatientForm(false);
  };

  const handleAddNewPatient = () => {
    setShowResults(false);
    setShowNewPatientForm(true);
    setNewPatientData({
      name: searchQuery,
      abhaId: '',
      age: '',
      gender: 'Male',
      phone: ''
    });
  };

  const handleCreateNewPatient = () => {
    if (!newPatientData.name || !newPatientData.abhaId) {
      alert('Please enter patient name and ABHA ID');
      return;
    }

    const newPatient: Patient = {
      id: mockPatients.length + 1,
      name: newPatientData.name,
      abhaId: newPatientData.abhaId,
      age: parseInt(newPatientData.age) || 0,
      gender: newPatientData.gender,
      phone: newPatientData.phone
    };

    setSelectedPatient(newPatient);
    setSearchQuery(newPatient.name);
    setShowNewPatientForm(false);
  };

  const handleSendAccessRequest = async () => {
    if (!selectedPatient || !requestReason) {
      alert('Please select a patient and provide a reason for access');
      return;
    }

    // Create new access request using context
    const newRequest = {
      patient: selectedPatient.name,
      abhaId: selectedPatient.abhaId,
      reason: requestReason,
      duration: `${requestDuration} days`,
      status: 'Pending' as const,
      sentTime: 'Just now',
      hospital: 'Current Hospital'
    };

    addSentRequest(newRequest);
    setRequestSuccess(true);

    // Reset form
    setTimeout(() => {
      setRequestSuccess(false);
      setSelectedPatient(null);
      setSearchQuery('');
      setRequestReason('');
      setRequestDuration('7');
    }, 3000);
  };

  const handleViewPatientProfile = (patientName: string, abhaId: string) => {
    // Find patient by name and ABHA ID
    const patient = mockPatients.find(p => p.name === patientName && p.abhaId === abhaId);
    if (patient) {
      const fullPatient = getPatientById(patient.id);
      if (fullPatient) {
        setPatientProfile(fullPatient);
        // Navigate to patient profile
        window.history.pushState({}, '', '/patient-profile');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedPatient || !uploadedFile) {
      alert('Please select a patient and upload a file');
      return;
    }

    setUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new upload record
    const newUpload = {
      id: recentUploads.length + 1,
      patient: selectedPatient.name,
      abhaId: selectedPatient.abhaId,
      type: documentType,
      time: 'Just now',
      date: new Date().toISOString().split('T')[0],
      hospital: 'Current Hospital',
      doctor: 'Dr. Current',
      fileSize: (uploadedFile.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'Verified',
      findings: `Document uploaded successfully.\nType: ${documentType}\nPatient: ${selectedPatient.name}\nABHA ID: ${selectedPatient.abhaId}`,
    };

    // Add to recent uploads at the beginning
    setRecentUploads([newUpload, ...recentUploads]);

    // Mock upload success
    setUploading(false);
    setUploadSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setUploadSuccess(false);
      setSelectedPatient(null);
      setSearchQuery('');
      setUploadedFile(null);
      setDocumentType('Lab Report');
    }, 3000);
  };

  const generateMedicalReport = (upload: any) => {
    const reportContent = `
╔════════════════════════════════════════════════════════════════╗
║                    MEDICAL REPORT                              ║
║                   ${upload.hospital}                           ║
╚════════════════════════════════════════════════════════════════╝

PATIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           ${upload.patient}
ABHA ID:        ${upload.abhaId}
Date:           ${upload.date}
Report Type:    ${upload.type}

DOCTOR INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attending:      ${upload.doctor}
Hospital:       ${upload.hospital}

FINDINGS & RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${upload.findings}

RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Continue current medication as prescribed
• Follow-up appointment in 2 weeks
• Maintain healthy diet and exercise routine
• Monitor symptoms and report any changes

VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status:         ${upload.status}
Generated:      ${new Date().toLocaleString()}
Digital Sign:   ${upload.doctor}

╔════════════════════════════════════════════════════════════════╗
║  This is a digitally generated report from MediTrust AI       ║
║  For verification, visit: https://meditrust.ai/verify         ║
╚════════════════════════════════════════════════════════════════╝
`;
    return reportContent;
  };

  const handleDownloadReport = (upload: any) => {
    const reportContent = generateMedicalReport(upload);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${upload.patient.replace(' ', '_')}_${upload.type.replace(' ', '_')}_${upload.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewReport = (upload: any) => {
    const reportContent = generateMedicalReport(upload);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${upload.type} - ${upload.patient}</title>
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
        <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
          </svg>
          Hospital Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Upload lab reports and request patient data access
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex bg-white rounded-xl shadow-card p-2 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Lab Report Upload
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              activeTab === 'request'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Request Patient Access
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'upload' ? (
        <Card>
          {/* Patient Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Patient by Name or ABHA ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                placeholder="Type patient name or ABHA ID..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && filteredPatients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-card max-h-96 overflow-y-auto"
                  >
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-500">ABHA ID: {patient.abhaId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{patient.age} yrs, {patient.gender}</p>
                            <p className="text-xs text-gray-400">{patient.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results - Add New Patient Option */}
              {showResults && filteredPatients.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-card"
                >
                  <div className="p-4 text-center">
                    <p className="text-gray-500 mb-3">No patients found</p>
                    <Button
                      variant="primary"
                      onClick={handleAddNewPatient}
                      className="w-full"
                    >
                      ➕ Add New Patient
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* New Patient Form */}
          {showNewPatientForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
            >
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">➕ Add New Patient</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={newPatientData.name}
                      onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ABHA ID *
                    </label>
                    <input
                      type="text"
                      value={newPatientData.abhaId}
                      onChange={(e) => setNewPatientData({...newPatientData, abhaId: e.target.value})}
                      placeholder="12-3456-7890-1234"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={newPatientData.age}
                      onChange={(e) => setNewPatientData({...newPatientData, age: e.target.value})}
                      placeholder="Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={newPatientData.gender}
                      onChange={(e) => setNewPatientData({...newPatientData, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newPatientData.phone}
                      onChange={(e) => setNewPatientData({...newPatientData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="primary"
                    onClick={handleCreateNewPatient}
                    className="flex-1"
                  >
                    ✅ Create Patient & Continue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowNewPatientForm(false);
                      setSearchQuery('');
                    }}
                    className="flex-1"
                  >
                    ❌ Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Selected Patient Info */}
          {selectedPatient && !showNewPatientForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Selected Patient</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ABHA ID</p>
                  <p className="font-medium text-gray-900">{selectedPatient.abhaId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age / Gender</p>
                  <p className="font-medium text-gray-900">{selectedPatient.age} yrs, {selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Document Type Selection */}
          {selectedPatient && !showNewPatientForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Lab Report</option>
                <option>Prescription</option>
                <option>Medical Scan</option>
                <option>Doctor Notes</option>
                <option>Discharge Summary</option>
                <option>X-Ray</option>
                <option>MRI Scan</option>
                <option>CT Scan</option>
              </select>
            </motion.div>
          )}

          {/* File Upload */}
          {selectedPatient && !showNewPatientForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-16 h-16 mb-4 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  </svg>
                  {uploadedFile ? (
                    <div>
                      <p className="text-green-600 font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </motion.div>
          )}

          {/* Upload Button */}
          {selectedPatient && uploadedFile && !showNewPatientForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={uploading}
                className="px-8 py-4 text-lg"
              >
                {uploading ? 'Uploading...' : 'Upload to Patient Record'}
              </Button>
            </motion.div>
          )}

          {/* Success Message */}
          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
            >
              <p className="text-green-600 font-semibold text-lg">✅ Document uploaded successfully!</p>
              <p className="text-sm text-gray-600 mt-1">
                {documentType} uploaded to {selectedPatient?.name}'s record
              </p>
            </motion.div>
          )}
        </Card>
        ) : (
        <Card>
          {/* Patient Search for Access Request */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Patient by Name or ABHA ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                placeholder="Type patient name or ABHA ID..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && filteredPatients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-card max-h-96 overflow-y-auto"
                  >
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-500">ABHA ID: {patient.abhaId}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{patient.age} yrs, {patient.gender}</p>
                            <p className="text-xs text-gray-400">{patient.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results */}
              {showResults && filteredPatients.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-card p-4"
                >
                  <p className="text-gray-500 text-center">No patients found</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Selected Patient for Access Request */}
          {selectedPatient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Request Access For</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ABHA ID</p>
                  <p className="font-medium text-gray-900">{selectedPatient.abhaId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age / Gender</p>
                  <p className="font-medium text-gray-900">{selectedPatient.age} yrs, {selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Access Request Form */}
          {selectedPatient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Access Request *
                </label>
                <textarea
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  placeholder="Please provide a detailed reason for requesting access to this patient's medical records..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Duration
                </label>
                <select
                  value={requestDuration}
                  onChange={(e) => setRequestDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="primary"
                  onClick={handleSendAccessRequest}
                  disabled={!requestReason}
                  className="px-8 py-4 text-lg"
                >
                  Send Access Request
                </Button>
              </div>

              {/* Request Success Message */}
              {requestSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                  <p className="text-green-600 font-semibold text-lg">✅ Access request sent successfully!</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Request sent to {selectedPatient?.name} for {requestDuration} days access
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </Card>
        )}

        {/* Recent Uploads / Sent Requests */}
        <Card title={activeTab === 'upload' ? "Recent Uploads" : "Sent Access Requests"} className="mt-6">
          <div className="space-y-3">
            {activeTab === 'upload' ? (
              recentUploads.map((upload) => (
                <motion.div
                  key={upload.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedUpload(upload);
                    setShowDetailsModal(true);
                  }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPatientProfile(upload.patient, upload.abhaId);
                        }}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {upload.patient}
                      </button>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {upload.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{upload.type} • {upload.fileSize}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{upload.time}</p>
                    <p className="text-xs text-primary cursor-pointer hover:underline">View Details →</p>
                  </div>
                </motion.div>
              ))
            ) : (
              sentRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewPatientProfile(request.patient, request.abhaId)}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {request.patient}
                      </button>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'Approved' 
                          ? 'bg-green-100 text-green-700'
                          : request.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{request.reason}</p>
                    <p className="text-xs text-gray-400">Duration: {request.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{request.sentTime}</p>
                    <p className="text-xs text-gray-500">{request.hospital}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedUpload && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowDetailsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Upload Details</h2>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Patient Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium text-gray-900">{selectedUpload.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ABHA ID</p>
                        <p className="font-medium text-gray-900">{selectedUpload.abhaId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Document Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium text-gray-900">{selectedUpload.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{selectedUpload.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hospital</p>
                        <p className="font-medium text-gray-900">{selectedUpload.hospital}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Doctor</p>
                        <p className="font-medium text-gray-900">{selectedUpload.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">File Size</p>
                        <p className="font-medium text-gray-900">{selectedUpload.fileSize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {selectedUpload.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Findings</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {selectedUpload.findings}
                      </pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      onClick={() => handleDownloadReport(selectedUpload)}
                      className="flex-1"
                    >
                      Download Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewReport(selectedUpload)}
                      className="flex-1"
                    >
                      View Report
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
