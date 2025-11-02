import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AccessTable } from '../components/access/AccessTable';
import { GrantAccessModal } from '../components/access/GrantAccessModal';
import { RevokeConfirmModal } from '../components/access/RevokeConfirmModal';
import { AuditHistoryPanel } from '../components/access/AuditHistoryPanel';
import { KeyManagerCard } from '../components/access/KeyManagerCard';
import { Button } from '../components/shared/Button';
import { Toast } from '../components/shared/Toast';
import { accessApiService, AccessPermission, GrantAccessRequest } from '../api/accessApi';
import { useRequests } from '../contexts/RequestContext';

// Reuse TxModal from records
import { TxModal } from '../components/records/TxModal';

export const Access: React.FC = () => {
  const { incomingRequests, approveRequest, rejectRequest } = useRequests();

  const [permissions, setPermissions] = useState<AccessPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantModalOpen, setGrantModalOpen] = useState(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<AccessPermission | null>(null);
  const [txModalData, setTxModalData] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [currentKey, setCurrentKey] = useState(accessApiService.getCurrentKey());

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const data = await accessApiService.getAccessList();
      setPermissions(data);
    } catch (error) {
      console.error('Error loading permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccess = async (request: GrantAccessRequest) => {
    try {
      const result = await accessApiService.grantAccess(request);
      setTxModalData({
        ipfsCid: 'N/A',
        txHash: result.txHash,
        aiSummary: `Access granted to ${request.entity} with ${request.scope} permissions.`
      });

      setTimeout(() => {
        loadPermissions();
        setToast({ message: 'Access granted successfully!', type: 'success' });
      }, 1500);
    } catch (error) {
      console.error('Error granting access:', error);
      setToast({ message: 'Failed to grant access', type: 'error' });
    }
  };

  const handleRevokeAccess = async () => {
    if (!selectedPermission) return;

    try {
      const result = await accessApiService.revokeAccess(selectedPermission.id);
      setRevokeModalOpen(false);
      setSelectedPermission(null);

      setTxModalData({
        ipfsCid: 'N/A',
        txHash: result.txHash,
        aiSummary: `Access revoked for ${selectedPermission.entity}.`
      });

      loadPermissions();
      setToast({ message: 'Access revoked successfully!', type: 'success' });
    } catch (error) {
      console.error('Error revoking access:', error);
      setToast({ message: 'Failed to revoke access', type: 'error' });
    }
  };

  const handleRotateKey = async () => {
    try {
      const result = await accessApiService.rotateKey();
      setCurrentKey(result.newKeyMasked);

      setTxModalData({
        ipfsCid: 'N/A',
        txHash: result.txHash,
        aiSummary: `Encryption key rotated successfully. New key: ${result.newKeyMasked}`
      });

      setToast({ message: 'Encryption key rotated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error rotating key:', error);
      setToast({ message: 'Failed to rotate key', type: 'error' });
    }
  };

  const openRevokeModal = (id: string) => {
    const permission = permissions.find(p => p.id === id);
    if (permission) {
      setSelectedPermission(permission);
      setRevokeModalOpen(true);
    }
  };

  const handleApproveRequest = async (requestId: number) => {
    const request = incomingRequests.find(r => r.id === requestId);
    if (!request) return;

    try {
      // Simulate approval process
      const grantRequest: GrantAccessRequest = {
        entity: request.hospital,
        scope: 'read',
        duration: parseInt(request.duration.split(' ')[0]),
        purpose: request.reason
      };

      await handleGrantAccess(grantRequest);

      // Update request status using context
      approveRequest(requestId);
      setToast({ message: `Access approved for ${request.hospital}`, type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to approve request', type: 'error' });
    }
  };

  const handleRejectRequest = (requestId: number) => {
    const request = incomingRequests.find(r => r.id === requestId);
    if (!request) return;

    // Update request status using context
    rejectRequest(requestId);
    setToast({ message: `Request from ${request.hospital} rejected`, type: 'success' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading access permissions...</div>
      </div>
    );
  }

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
          Access & Privacy Control
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
          Manage who can access your medical records with blockchain-verified permissions
        </p>
      </motion.div>

      {/* Incoming Requests Section */}
      {incomingRequests.filter(req => req.status === 'Pending').length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-2xl mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Incoming Access Requests ({incomingRequests.filter(req => req.status === 'Pending').length})
          </h2>
          <div className="space-y-3">
            {incomingRequests.filter(req => req.status === 'Pending').map((request) => (
              <div key={request.id} className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-gray-900">{request.hospital}</p>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Reason:</strong> {request.reason}
                    </p>
                    <p className="text-xs text-gray-500">
                      Duration: {request.duration} • Received: {request.receivedTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleApproveRequest(request.id)}
                      className="px-4 py-2 text-sm"
                    >
                      ✅ Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectRequest(request.id)}
                      className="px-4 py-2 text-sm"
                    >
                      ❌ Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grant Access Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={() => setGrantModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Grant Access
        </button>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Access Table & Audit History */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <AccessTable
            permissions={permissions}
            onRevoke={openRevokeModal}
            onRefresh={loadPermissions}
          />

          <AuditHistoryPanel permissions={permissions} />
        </motion.div>

        {/* Right Column - Key Manager */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <KeyManagerCard
            currentKey={currentKey}
            onRotate={handleRotateKey}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <GrantAccessModal
        isOpen={grantModalOpen}
        onClose={() => setGrantModalOpen(false)}
        onSubmit={handleGrantAccess}
      />

      <RevokeConfirmModal
        isOpen={revokeModalOpen}
        onClose={() => setRevokeModalOpen(false)}
        onConfirm={handleRevokeAccess}
        permission={selectedPermission}
      />

      {txModalData && (
        <TxModal
          data={txModalData}
          onClose={() => setTxModalData(null)}
        />
      )}

      <Toast
        message={toast?.message || ''}
        type={toast?.type || 'info'}
        isVisible={toast !== null}
        onClose={() => setToast(null)}
      />
    </div>
  );
};
