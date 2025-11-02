import mongoose from "mongoose";

const AccessLogSchema = new mongoose.Schema({
  txHash: {
    type: String,
    sparse: true
  },
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient",
    required: true
  },
  accessedBy: {
    type: String,
    required: true
  },
  accessedByType: {
    type: String,
    enum: ['Doctor', 'Hospital', 'Lab', 'Patient', 'Emergency', 'Family', 'Other'],
    default: 'Other'
  },
  action: {
    type: String,
    enum: ['View', 'Upload', 'Download', 'Share', 'Grant Access', 'Revoke Access', 'Emergency Access'],
    required: true
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalRecord"
  },
  ipAddress: String,
  userAgent: String,
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: String,
  metadata: mongoose.Schema.Types.Mixed
});

// Index for faster queries
AccessLogSchema.index({ patientId: 1, timestamp: -1 });
AccessLogSchema.index({ txHash: 1 });

export default mongoose.model("AccessLog", AccessLogSchema);
