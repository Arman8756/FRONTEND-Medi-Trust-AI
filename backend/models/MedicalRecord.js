import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient",
    required: true
  },
  type: {
    type: String,
    enum: ['Lab Report', 'Scan', 'Prescription', 'Consultation', 'Vaccination', 'Other'],
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  hospital: String,
  ipfsHash: String,
  blockchainHash: String,
  summary: String,
  uploadDate: { 
    type: Date, 
    default: Date.now 
  },
  encrypted: {
    type: Boolean,
    default: false
  },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  metadata: {
    testName: String,
    testDate: Date,
    results: mongoose.Schema.Types.Mixed,
    notes: String
  }
});

export default mongoose.model("MedicalRecord", MedicalRecordSchema);
