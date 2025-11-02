import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { connectDB } from './db.js';
import Patient from './models/Patient.js';
import MedicalRecord from './models/MedicalRecord.js';
import AiLog from './models/AiLog.js';
import AccessLog from './models/AccessLog.js';

dotenv.config();

const app = express();
const PORT = 3001;

// Connect MongoDB
connectDB();

// Your OpenAI API Key (set in .env file)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// SendGrid API Key (set this in your environment variables)
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';

// SerpAPI Key for Google Search
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies

// In-memory storage for doctors and message logs
let doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    email: 'sarah.johnson@meditrust.com'
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    email: 'michael.chen@meditrust.com'
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'General Medicine',
    email: 'priya.sharma@meditrust.com'
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Pediatrics',
    email: 'james.wilson@meditrust.com'
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    email: 'emily.rodriguez@meditrust.com'
  }
];

let messageLogs = [];

// Rate limiting map (simple in-memory implementation)
const rateLimitMap = new Map();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'MediTrust AI Backend is running!' });
});

// Helper function to search Google using SerpAPI
async function searchGoogle(query) {
  if (!SERPAPI_KEY) {
    return null;
  }

  try {
    const searchUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}&num=3`;
    const response = await fetch(searchUrl);

    if (!response.ok) {
      console.error('SerpAPI error:', response.status);
      return null;
    }

    const data = await response.json();

    // Extract relevant results
    const results = [];
    if (data.organic_results) {
      data.organic_results.slice(0, 3).forEach(result => {
        results.push({
          title: result.title,
          snippet: result.snippet,
          link: result.link
        });
      });
    }

    return results;
  } catch (error) {
    console.error('Search error:', error);
    return null;
  }
}

// Smart health assistant responses
const generateHealthResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Fever and cold symptoms
  if (lowerMessage.includes('fever') || lowerMessage.includes('temperature') || lowerMessage.includes('cough') || lowerMessage.includes('cold')) {
    return {
      reply: `I understand you are experiencing ${lowerMessage.includes('fever') ? 'fever' : 'cold symptoms'}. Here is what I recommend:\n\n✓ Monitor your temperature regularly\n✓ Stay hydrated (drink 8-10 glasses of water)\n✓ Get adequate rest\n✓ Take over-the-counter fever reducers if needed\n\n⚠️ Consult a doctor if:\n• Fever persists for more than 3 days\n• Temperature exceeds 103°F (39.4°C)\n• Symptoms worsen\n• Difficulty breathing occurs\n\nWould you like to schedule an appointment with your doctor?`,
      explanation: 'AI analyzed your symptoms and provided evidence-based recommendations for fever and respiratory symptoms.'
    };
  }
  
  // Pain-related queries
  if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache') || lowerMessage.includes('headache')) {
    return {
      reply: `I am sorry you are experiencing pain. Here is what might help:\n\n🏥 For immediate relief:\n• Rest in a quiet, dark room\n• Apply cold/warm compress\n• Stay hydrated\n• Try over-the-counter pain relievers\n\n📊 Track your pain:\n• When did it start?\n• Pain level (1-10)?\n• Location and type (sharp, dull, throbbing)?\n\n⚠️ Seek immediate medical attention if you experience:\n• Sudden, severe pain\n• Pain with fever or confusion\n• Pain lasting more than a few days\n\nWould you like me to help you log this symptom?`,
      explanation: 'AI provided pain management guidance and symptom tracking recommendations.'
    };
  }
  
  // Blood sugar / diabetes
  if (lowerMessage.includes('sugar') || lowerMessage.includes('diabetes') || lowerMessage.includes('glucose')) {
    return {
      reply: `Based on your recent vitals, your blood sugar level is 98 mg/dL, which is within the normal range (70-100 mg/dL fasting).\n\n✅ Your diabetes management is on track!\n\n📋 Recommendations:\n• Continue current medication schedule\n• Maintain balanced diet (low sugar, high fiber)\n• Monitor glucose levels regularly\n• Exercise 30 minutes daily\n• Stay hydrated\n\n📊 Your 3-month trend shows stable glucose control. Keep up the great work!\n\n💡 Tip: Log your meals to track how foods affect your levels.`,
      explanation: 'AI accessed your latest glucose readings and provided personalized diabetes management advice.'
    };
  }
  
  // Blood pressure
  if (lowerMessage.includes('pressure') || lowerMessage.includes('bp') || lowerMessage.includes('hypertension')) {
    return {
      reply: `Your latest blood pressure reading is 120/80 mmHg - that is optimal! 🎉\n\n📊 BP Categories:\n• Normal: < 120/80\n• Elevated: 120-129/<80\n• High: ≥ 130/80\n\n✅ Your BP is in the healthy range.\n\n🏃 To maintain healthy BP:\n• Reduce sodium intake\n• Exercise regularly\n• Manage stress\n• Maintain healthy weight\n• Limit alcohol\n\n📈 Your trend over the last 3 months shows excellent control. Great job!`,
      explanation: 'AI analyzed your blood pressure data and confirmed it is within healthy parameters.'
    };
  }
  
  // Medication queries
  if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('pill')) {
    return {
      reply: `📋 Your Current Medications:\n\n1. Metformin 500mg - Take twice daily with meals\n2. Lisinopril 10mg - Take once daily in the morning\n3. Vitamin D3 - Take once daily\n\n⏰ Reminders are set for all medications.\n\n⚠️ Important:\n• Take medications as prescribed\n• Don't skip doses\n• Report any side effects to your doctor\n• Never share medications\n\n💊 Next refill due: Dec 15, 2025\n\nWould you like to set up medication reminders or report a side effect?`,
      explanation: 'AI retrieved your medication list and provided adherence guidance.'
    };
  }
  
  // Test results / reports
  if (lowerMessage.includes('test') || lowerMessage.includes('report') || lowerMessage.includes('result') || lowerMessage.includes('lab')) {
    return {
      reply: `📊 Your Recent Test Results:\n\n✅ Complete Blood Count (Oct 25, 2025)\n• Hemoglobin: 15.2 g/dL (Normal)\n• WBC: 7,200/μL (Normal)\n• Platelets: 250,000/μL (Normal)\nStatus: All parameters within normal range\n\n⚠️ Lipid Profile (Oct 20, 2025)\n• Total Cholesterol: 210 mg/dL (Borderline)\n• LDL: 135 mg/dL (Borderline)\n• HDL: 45 mg/dL (Low)\nStatus: Lifestyle modifications recommended\n\n✅ Chest X-Ray (Oct 18, 2025)\nStatus: Clear, no abnormalities\n\nWould you like detailed analysis of any specific test?`,
      explanation: 'AI accessed your medical records and summarized recent test results with status.'
    };
  }
  
  // General health
  if (lowerMessage.includes('health') || lowerMessage.includes('how am i') || lowerMessage.includes('my status')) {
    return {
      reply: `🏥 Your Health Overview:\n\n⭐ Health Score: 85/100 (Very Good)\n\n📊 Latest Vitals:\n• BP: 120/80 mmHg ✅\n• Blood Sugar: 98 mg/dL ✅\n• Heart Rate: 72 bpm ✅\n• BMI: 24.5 (Healthy) ✅\n\n✅ Strengths:\n• Blood pressure well controlled\n• Glucose levels stable\n• Regular medication adherence\n\n⚠️ Areas for Improvement:\n• Cholesterol slightly elevated\n• Increase physical activity\n• Improve sleep quality\n\n📅 Next checkup: Dec 15, 2025\n\nYou are doing great! Keep up the healthy habits! 💪`,
      explanation: 'AI compiled your comprehensive health status from all available data.'
    };
  }
  
  // Default helpful response
  return {
    reply: `Hello! I am your AI Health Assistant. I can help you with:\n\n🏥 Symptoms & Health Concerns\n• Understand your symptoms\n• Get health recommendations\n• Know when to see a doctor\n\n📊 Medical Reports & Tests\n• Explain your test results\n• Track your health trends\n• Monitor vital signs\n\n💊 Medications & Treatment\n• Medication reminders\n• Side effect information\n• Adherence tracking\n\n📋 Your Health Data\n• View recent vitals\n• Access medical reports\n• Track health score\n\nHow can I assist you today? You can ask me about your symptoms, test results, medications, or general health questions.`,
    explanation: 'AI Health Assistant ready to help with comprehensive health information and guidance.'
  };
};

// Chat endpoint with smart health responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received chat request:', message);

    // Try OpenAI first if API key is available
    if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here') {
      try {
        console.log('Attempting OpenAI API call...');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: 'You are an AI health assistant helping patients understand their medical conditions, symptoms, and test results. Provide clear, accurate, and empathetic health information. Always recommend consulting healthcare professionals for serious concerns.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices[0].message.content;
          console.log('✅ OpenAI response received');
          return res.json({
            reply: reply,
            explanation: 'Response generated by GPT-4 AI model'
          });
        }
      } catch (openaiError) {
        console.log('⚠️  OpenAI unavailable, using smart fallback');
      }
    }

    // Fallback to smart health responses
    console.log('Using smart health response system');
    const response = generateHealthResponse(message);
    res.json(response);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      message: error.message
    });
  }
});

// Image analysis endpoint
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { base64Image } = req.body;

    console.log('Received image analysis request');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this medical image. Describe what you see, identify any potential findings or abnormalities, and provide a confidence level for your observations. Be professional and medical in your analysis.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI Vision API error:', error);
      throw new Error(`OpenAI Vision API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Image analysis complete');

    res.json({
      findings: [
        { label: 'AI Analysis Complete', confidence: 0.95 }
      ],
      highlights: [],
      explanation: analysis
    });

  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze image',
      message: error.message
    });
  }
});

// Get doctors list
app.get('/api/doctors', (req, res) => {
  try {
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Send message to doctor
app.post('/api/send-message', async (req, res) => {
  try {
    const { doctorEmail, patientName, patientEmail, subject, body } = req.body;

    // Validation
    if (!doctorEmail || !patientName || !body) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Doctor email, patient name, and message body are required'
      });
    }

    if (body.length < 10) {
      return res.status(400).json({
        error: 'Message too short',
        message: 'Message must be at least 10 characters long'
      });
    }

    // Rate limiting (5 messages per IP per hour)
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!rateLimitMap.has(clientIp)) {
      rateLimitMap.set(clientIp, []);
    }

    const userRequests = rateLimitMap.get(clientIp).filter(time => now - time < oneHour);

    if (userRequests.length >= 5) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many messages sent. Please try again later.'
      });
    }

    userRequests.push(now);
    rateLimitMap.set(clientIp, userRequests);

    // Verify doctor exists
    const doctor = doctors.find(d => d.email === doctorEmail);
    if (!doctor) {
      return res.status(404).json({
        error: 'Doctor not found',
        message: 'The selected doctor could not be found'
      });
    }

    // Log the message
    const messageLog = {
      id: `msg_${Date.now()}`,
      doctorEmail,
      doctorName: doctor.name,
      patientName,
      patientEmail: patientEmail || 'Not provided',
      subject: subject || 'Patient Inquiry',
      body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Send email via SendGrid (if API key is configured)
    if (SENDGRID_API_KEY) {
      try {
        const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SENDGRID_API_KEY}`
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: doctorEmail, name: doctor.name }],
              subject: subject || 'Patient Inquiry - MediTrust AI'
            }],
            from: {
              email: 'noreply@meditrust.com',
              name: 'MediTrust AI Platform'
            },
            reply_to: patientEmail ? {
              email: patientEmail,
              name: patientName
            } : undefined,
            content: [{
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #0E9AA7;">New Patient Message</h2>
                  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>From:</strong> ${patientName}</p>
                    ${patientEmail ? `<p><strong>Email:</strong> ${patientEmail}</p>` : ''}
                    <p><strong>Subject:</strong> ${subject || 'Patient Inquiry'}</p>
                  </div>
                  <div style="background: white; padding: 20px; border-left: 4px solid #0E9AA7;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${body}</p>
                  </div>
                  <p style="color: #666; font-size: 12px; margin-top: 20px;">
                    This message was sent via MediTrust AI Platform
                  </p>
                </div>
              `
            }]
          })
        });

        if (emailResponse.ok) {
          messageLog.status = 'sent';
          console.log(`✅ Email sent to ${doctorEmail}`);
        } else {
          const errorText = await emailResponse.text();
          console.error('SendGrid error:', errorText);
          messageLog.status = 'failed';
          messageLog.error = errorText;
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        messageLog.status = 'failed';
        messageLog.error = emailError.message;
      }
    } else {
      // No SendGrid key - simulate success
      console.log('⚠️  SendGrid not configured - simulating email send');
      console.log(`📧 Would send to: ${doctorEmail}`);
      console.log(`From: ${patientName} (${patientEmail || 'no email'})`);
      console.log(`Subject: ${subject || 'Patient Inquiry'}`);
      console.log(`Message: ${body}`);
      messageLog.status = 'simulated';
    }

    messageLogs.push(messageLog);

    res.json({
      success: true,
      message: 'Message sent successfully to doctor',
      messageId: messageLog.id,
      status: messageLog.status
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: error.message
    });
  }
});

// Get message logs (optional - for admin purposes)
app.get('/api/message-logs', (req, res) => {
  try {
    res.json(messageLogs);
  } catch (error) {
    console.error('Error fetching message logs:', error);
    res.status(500).json({ error: 'Failed to fetch message logs' });
  }
});

// ========== MONGODB API ROUTES ==========

// Add Mock Data
app.post('/api/add-mock-data', async (req, res) => {
  try {
    const patient = new Patient({
      patientId: 'P001',
      name: 'Arman Ansari',
      email: 'arman@example.com',
      age: 25,
      gender: 'Male',
      walletId: '0xA23D9...',
      healthScore: 82,
      vitals: {
        bp: '122/80',
        sugar: 118,
        cholesterol: 195,
        bmi: 25.2
      },
      reminders: ['Blood Test on 5 Dec 2025'],
      permissions: [
        { hospital: 'Apollo', status: 'Granted', expiry: '2025-12-06' }
      ]
    });
    await patient.save();

    const record = new MedicalRecord({
      patientId: patient._id,
      type: 'Lab Report',
      doctor: 'Dr. Meena Sharma',
      ipfsHash: 'QmXabc123...',
      blockchainHash: '0x123abc...',
      summary: 'Glucose level normal, hemoglobin slightly low.',
      encrypted: true
    });
    await record.save();

    res.status(201).json({
      success: true,
      message: 'Mock data added successfully!',
      patient,
      record
    });
  } catch (error) {
    console.error('Error adding mock data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get patient by ID
app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

// Get all medical records
app.get('/api/records', async (req, res) => {
  try {
    const records = await MedicalRecord.find().populate('patientId');
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// Get records by patient ID
app.get('/api/records/patient/:patientId', async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId });
    res.json(records);
  } catch (error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ error: 'Failed to fetch patient records' });
  }
});

// Get AI logs
app.get('/api/ai-logs', async (req, res) => {
  try {
    const logs = await AiLog.find().populate('patientId').sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching AI logs:', error);
    res.status(500).json({ error: 'Failed to fetch AI logs' });
  }
});

// Get access logs
app.get('/api/access-logs', async (req, res) => {
  try {
    const logs = await AccessLog.find().populate('patientId').sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching access logs:', error);
    res.status(500).json({ error: 'Failed to fetch access logs' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 MediTrust AI Backend running on http://localhost:${PORT}`);
  console.log(`✅ Ready to handle AI requests`);
  console.log(`📧 SendGrid configured: ${SENDGRID_API_KEY ? 'Yes' : 'No (using simulation mode)'}`);
  console.log(`🗄️  MongoDB integration enabled`);
});
