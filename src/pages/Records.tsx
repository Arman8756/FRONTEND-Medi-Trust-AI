import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RecordsFilterBar } from '../components/records/RecordsFilterBar';
import { RecordsTable } from '../components/records/RecordsTable';
import { RecordViewer } from '../components/records/RecordViewer';
import { TxModal } from '../components/records/TxModal';
import { recordsApiService, MedicalRecord } from '../api/recordsApi';

export const Records: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [txModalData, setTxModalData] = useState<any>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await recordsApiService.getRecords();
      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters: { type: string; hospital: string; search: string }) => {
    let filtered = [...records];

    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    if (filters.hospital && filters.hospital !== 'All') {
      filtered = filtered.filter(r => r.hospital === filters.hospital);
    }

    if (filters.search) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading records...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          Medical Records Vault
        </h1>
        <p className="text-gray-600 text-lg">
          Secure, blockchain-verified medical records with AI-powered insights
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <RecordsFilterBar onFilter={handleFilter} records={records} />
        </motion.div>

        {/* Records List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RecordsTable 
            records={filteredRecords} 
            onRecordClick={setSelectedRecord}
          />
        </motion.div>
      </div>

      {/* Record Viewer Modal */}
      {selectedRecord && (
        <RecordViewer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {/* Transaction Modal */}
      {txModalData && (
        <TxModal
          data={txModalData}
          onClose={() => setTxModalData(null)}
        />
      )}
    </div>
  );
};
