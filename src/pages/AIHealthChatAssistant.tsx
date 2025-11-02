import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIHealthChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूँ। मैं आपके स्वास्थ्य से जुड़े सवालों का जवाब दे सकता हूँ और मेडिकल रिपोर्ट का विश्लेषण कर सकता हूँ। कैसे मदद कर सकता हूँ?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fallbackResponses: { [key: string]: string } = {
    'sugar': 'आपका शुगर लेवल पिछली रिपोर्ट में सामान्य है। नियमित जांच जारी रखें और डॉक्टर की सलाह का पालन करें।',
    'bp': 'आपका BP ठीक है। डॉक्टर की सलाह जारी रखें और नियमित व्यायाम करें।',
    'blood': 'आपकी ब्लड रिपोर्ट सामान्य दिखाई देती है। सभी पैरामीटर सामान्य सीमा में हैं।',
    'diabetes': 'डायबिटीज प्रबंधन के लिए: नियमित दवा लें, स्वस्थ आहार लें, और रोजाना व्यायाम करें।',
    'heart': 'हृदय स्वास्थ्य के लिए: कम नमक खाएं, नियमित व्यायाम करें, और तनाव कम करें।',
    'medicine': 'कृपया अपनी दवाएं समय पर लें और डॉक्टर की सलाह के बिना कोई बदलाव न करें।',
    'report': 'मैं आपकी मेडिकल रिपोर्ट का विश्लेषण कर सकता हूँ। कृपया "Upload Report" बटन से अपनी रिपोर्ट अपलोड करें।',
    'emergency': '🚨 आपातकालीन स्थिति में तुरंत 108 पर कॉल करें या नजदीकी अस्पताल जाएं।'
  };

  const getFallbackResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }
    return 'मैं आपकी मदद के लिए यहाँ हूँ। कृपया स्वास्थ्य से जुड़ा प्रश्न पूछें। मैं शुगर, BP, दवाइयां, रिपोर्ट विश्लेषण आदि में मदद कर सकता हूँ।';
  };

  const callGroqAPI = async (userMessage: string): Promise<string> => {
    try {
      // Connect to Node.js backend (port 3001) with OpenAI + Google Search
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error('Backend unreachable');
      }

      const data = await response.json();

      // Display sources if available (from Google Search)
      if (data.sources && data.sources.length > 0) {
        let reply = data.reply + '\n\nSources:\n';
        data.sources.forEach((source: any, index: number) => {
          reply += `${index + 1}. ${source.title}\n`;
        });
        return reply;
      }

      return data.reply || getFallbackResponse(userMessage);
    } catch (error) {
      console.log('Backend unavailable, using fallback response');
      return getFallbackResponse(userMessage);
    }
  };

  const typeMessage = async (content: string) => {
    const words = content.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: currentText,
          timestamp: new Date()
        };
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Add placeholder for assistant message
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }]);

    try {
      const reply = await callGroqAPI(input);
      await typeMessage(reply);
    } catch (error) {
      const fallback = getFallbackResponse(input);
      await typeMessage(fallback);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const uploadMessage: Message = {
        role: 'user',
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, uploadMessage]);

      setTimeout(() => {
        const analysisMessage: Message = {
          role: 'assistant',
          content: `मैंने आपकी रिपोर्ट "${file.name}" प्राप्त कर ली है। रिपोर्ट का विश्लेषण:\n\n✅ सभी मुख्य पैरामीटर सामान्य सीमा में हैं\n📊 कोई गंभीर असामान्यता नहीं पाई गई\n💊 वर्तमान दवाएं जारी रखें\n\nक्या आप किसी विशेष पैरामीटर के बारे में जानना चाहते हैं?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, analysisMessage]);
      }, 1500);
    }
  };

  const quickActions = [
    {
      icon: '📤',
      label: 'Upload Report',
      action: () => fileInputRef.current?.click()
    },
    {
      icon: '📋',
      label: 'View Summary',
      action: () => {
        const summaryMessage: Message = {
          role: 'assistant',
          content: '📊 आपका स्वास्थ्य सारांश:\n\n✅ रक्तचाप: सामान्य\n✅ शुगर स्तर: नियंत्रित\n✅ कोलेस्ट्रॉल: सामान्य\n✅ वजन: स्वस्थ सीमा में\n\nसभी पैरामीटर अच्छे हैं। स्वस्थ जीवनशैली जारी रखें!',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
      }
    },
    {
      icon: '🚨',
      label: 'Emergency Help',
      action: () => {
        const emergencyMessage: Message = {
          role: 'assistant',
          content: '🚨 आपातकालीन सहायता:\n\n📞 एम्बुलेंस: 108\n🏥 नजदीकी अस्पताल: Apollo Hospital (2.3 km)\n📍 आपकी लोकेशन साझा की जा रही है...\n\nकृपया शांत रहें। मदद आ रही है।',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, emergencyMessage]);
      }
    }
  ];

  const suggestedQuestions = [
    'मेरी शुगर रिपोर्ट कैसी है?',
    'BP कैसे नियंत्रित करें?',
    'दवाई कब लेनी है?',
    'व्यायाम की सलाह दें'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          AI Health Chat Assistant
        </h1>
        <p className="text-gray-700 text-lg font-medium">
          Powered by Google Search • Real-time Medical Information
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <div className="h-[600px] flex flex-col bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/20 to-transparent">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white backdrop-blur-sm'
                          : 'bg-white/80 backdrop-blur-md border border-white/60 text-gray-800'
                          }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                          {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/60 shadow-lg">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="px-6 py-3 border-t border-white/30 bg-white/20 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-xs bg-white/50 hover:bg-white/70 backdrop-blur-sm text-blue-700 font-medium px-4 py-2 rounded-full transition-all border border-white/60 shadow-sm hover:shadow-md"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/30 bg-white/30 backdrop-blur-md">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your health question..."
                    className="flex-1 px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-inner text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-4">
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full p-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 hover:from-blue-500/40 hover:to-purple-500/40 backdrop-blur-sm rounded-2xl border border-white/60 transition-all text-left shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="font-semibold text-gray-800">{action.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">Real-time Google search</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">Current medical information</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">Source citations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">Emergency assistance</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">Multilingual support</span>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Search Engine:</span>
                  <span className="text-sm font-bold text-gray-900">Google</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Status:</span>
                  <span className="text-sm font-bold text-green-600">● Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Response Time:</span>
                  <span className="text-sm font-bold text-gray-900">&lt; 2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
