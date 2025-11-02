// Mock API for AI Health Assistant

export const mockDelay = () => Math.random() * 500 + 400; // 400-900ms

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  explanation?: string;
}

export interface ImageAnalysisResult {
  findings: Array<{
    label: string;
    confidence: number;
  }>;
  highlights: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>;
  explanation: string;
}

const generateAIResponse = (message: string): { reply: string; explanation: string } => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('fever') || lowerMessage.includes('cough')) {
    return {
      reply: "I understand you're experiencing fever and cough. These symptoms could indicate a respiratory infection. I recommend monitoring your temperature, staying hydrated, and consulting with your doctor if symptoms persist for more than 3 days or worsen.",
      explanation: "Keywords detected: 'fever', 'cough'. These are common symptoms of respiratory infections. The AI considers your recent health data and suggests monitoring and medical consultation based on symptom severity patterns."
    };
  }
  
  if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
    return {
      reply: "I'm sorry to hear you're in pain. Can you describe where the pain is located and its intensity (1-10)? This will help me provide better guidance.",
      explanation: "Pain-related keywords detected. The AI is gathering more specific information to provide accurate recommendations based on pain location and severity."
    };
  }
  
  if (lowerMessage.includes('sugar') || lowerMessage.includes('diabetes') || lowerMessage.includes('glucose')) {
    return {
      reply: "Based on your recent blood sugar readings (98 mg/dL), your glucose levels are within normal range. Continue monitoring regularly and maintain your current diet and medication schedule.",
      explanation: "Diabetes-related query detected. AI accessed your latest vitals showing sugar level at 98 mg/dL (normal range: 70-100 mg/dL fasting). Recommendation based on stable readings."
    };
  }
  
  if (lowerMessage.includes('pressure') || lowerMessage.includes('bp')) {
    return {
      reply: "Your latest blood pressure reading is 120/80 mmHg, which is in the optimal range. Keep up with your healthy lifestyle habits!",
      explanation: "Blood pressure query detected. AI retrieved your most recent BP reading (120/80 mmHg) which falls within the normal range (< 120/80 mmHg)."
    };
  }
  
  return {
    reply: "I'm here to help with your health questions. You can ask me about your symptoms, recent test results, medications, or general health advice. How can I assist you today?",
    explanation: "General health query. AI is ready to provide information based on your medical history, recent vitals, and symptom descriptions."
  };
};

export const aiApiService = {
  chat: async (message: string, _context?: any): Promise<{ reply: string; explanation: string }> => {
    try {
      // Call our backend instead of OpenAI directly
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        reply: data.reply,
        explanation: data.explanation
      };
    } catch (error) {
      console.error('Backend API error:', error);
      console.log('Falling back to mock responses. Make sure backend is running on http://localhost:3001');
      // Fallback to mock response if backend is not running
      return generateAIResponse(message);
    }
  },

  analyzeImage: async (file: File): Promise<ImageAnalysisResult> => {
    try {
      // Convert image to base64
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
        };
        reader.readAsDataURL(file);
      });

      // Call our backend instead of OpenAI directly
      const response = await fetch('http://localhost:3001/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ base64Image })
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        findings: data.findings,
        highlights: data.highlights,
        explanation: data.explanation
      };
    } catch (error) {
      console.error('Backend API error:', error);
      console.log('Falling back to mock image analysis. Make sure backend is running on http://localhost:3001');
      
      // Fallback to mock analysis
      const fileName = file.name.toLowerCase();
      
      if (fileName.includes('xray') || fileName.includes('chest')) {
        return {
          findings: [
            { label: 'Pneumonia', confidence: 0.87 },
            { label: 'No fracture', confidence: 0.12 },
            { label: 'Normal heart size', confidence: 0.95 }
          ],
          highlights: [
            { x: 120, y: 80, w: 220, h: 160 }
          ],
          explanation: "Model detected patchy opacity consistent with pneumonia in left lower lobe. The AI analyzed lung field density patterns and identified an area of consolidation. Confidence: 87%. Recommend clinical correlation and follow-up imaging."
        };
      }
      
      return {
        findings: [
          { label: 'No abnormalities detected', confidence: 0.91 },
          { label: 'Image quality: Good', confidence: 0.95 }
        ],
        highlights: [],
        explanation: "AI analysis completed. No significant abnormalities detected in the uploaded medical image. Image quality is sufficient for diagnostic purposes."
      };
    }
  }
};
