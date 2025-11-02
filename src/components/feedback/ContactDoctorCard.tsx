import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Doctor {
  _id?: string;
  name: string;
  specialty: string;
  email: string;
}

interface ContactDoctorCardProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const ContactDoctorCard = ({ onSuccess, onError }: ContactDoctorCardProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsFetchingDoctors(true);
      const response = await fetch('http://localhost:3001/api/doctors');
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      onError?.('Failed to load doctors list');
    } finally {
      setIsFetchingDoctors(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !patientName || !message) {
      onError?.('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorEmail: selectedDoctor,
          patientName,
          patientEmail: patientEmail || undefined,
          subject: subject || 'Patient Inquiry',
          body: message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      const result = await response.json();
      onSuccess?.(result.message || 'Message sent successfully!');
      
      // Reset form
      setSelectedDoctor('');
      setPatientName('');
      setPatientEmail('');
      setSubject('');
      setMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      onError?.(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDoctorInfo = doctors.find(d => d.email === selectedDoctor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 shadow-2xl p-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        💬 Contact a Doctor
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Doctor *
          </label>
          {isFetchingDoctors ? (
            <div className="text-sm text-gray-500 py-2">Loading doctors...</div>
          ) : doctors.length === 0 ? (
            <div className="text-sm text-red-500 py-2">No doctors available</div>
          ) : (
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              <option value="">-- Choose a doctor --</option>
              {doctors.map((doctor, index) => (
                <option key={`${doctor.name}-${index}`} value={doctor.email}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          )}
          {selectedDoctorInfo && (
            <p className="text-xs text-gray-500 mt-1">
              📧 {selectedDoctorInfo.email}
            </p>
          )}
        </div>

        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>

        {/* Patient Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Email (optional)
          </label>
          <input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            placeholder="e.g., patient@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Subject (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject (optional)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Consultation Request"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your concern or question..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            required
            minLength={10}
          />
          <p className="text-xs text-gray-500 mt-1">
            {message.length}/10 characters minimum
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !selectedDoctor || !patientName || message.length < 10}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isLoading ? '📤 Sending...' : '📧 Send Message'}
        </button>
      </form>
    </motion.div>
  );
};
