import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  bloodGroup: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  walletId: {
    type: String
  },
  healthScore: {
    type: Number,
    default: 0
  },
  vitals: {
    bp: String,
    sugar: Number,
    cholesterol: Number,
    bmi: Number,
    heartRate: Number,
    temperature: Number
  },
  reminders: [String],
  permissions: [
    {
      hospital: String,
      status: String,
      expiry: String,
      grantedAt: { type: Date, default: Date.now }
    }
  ],
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  medicalHistory: {
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String]
  },
  blockchainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blockchain'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
patientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Patient', patientSchema);
