import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  data: {
    patientId: {
      type: String,
      required: true
    },
    recordType: {
      type: String,
      required: true,
      enum: ['genesis', 'diagnosis', 'prescription', 'lab_report', 'treatment', 'upload', 'access_grant', 'access_revoke']
    },
    diagnosis: String,
    treatment: String,
    prescription: String,
    labReport: String,
    fileName: String,
    updatedBy: {
      type: String,
      required: true
    },
    metadata: mongoose.Schema.Types.Mixed
  },
  previousHash: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true,
    index: true
  },
  nonce: {
    type: Number,
    default: 0
  }
}, { _id: false });

const blockchainSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  chain: [blockSchema],
  isValid: {
    type: Boolean,
    default: true
  },
  lastValidated: {
    type: Date,
    default: Date.now
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
blockchainSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for faster queries
blockchainSchema.index({ patientId: 1, 'chain.hash': 1 });

export default mongoose.model('Blockchain', blockchainSchema);
