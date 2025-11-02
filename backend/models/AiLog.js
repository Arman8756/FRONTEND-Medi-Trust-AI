import mongoose from "mongoose";

const AiLogSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient" 
  },
  inputQuery: {
    type: String,
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  reasoning: String,
  confidence: Number,
  model: {
    type: String,
    default: 'gpt-4'
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  responseTime: Number, // in milliseconds
  tokensUsed: Number,
  context: {
    userMessage: String,
    systemPrompt: String,
    additionalData: mongoose.Schema.Types.Mixed
  }
});

export default mongoose.model("AiLog", AiLogSchema);
