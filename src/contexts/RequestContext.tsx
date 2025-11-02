import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessRequest {
  id: number;
  hospital: string;
  patient: string;
  abhaId: string;
  reason: string;
  duration: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  receivedTime: string;
  sentTime: string;
}

interface SentRequest {
  id: number;
  patient: string;
  abhaId: string;
  reason: string;
  duration: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  sentTime: string;
  hospital: string;
}

interface RequestContextType {
  incomingRequests: AccessRequest[];
  sentRequests: SentRequest[];
  addIncomingRequest: (request: Omit<AccessRequest, 'id'>) => void;
  addSentRequest: (request: Omit<SentRequest, 'id'>) => void;
  approveRequest: (requestId: number) => void;
  rejectRequest: (requestId: number) => void;
  updateSentRequestStatus: (requestId: number, status: 'Approved' | 'Rejected') => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};

export const RequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomingRequests, setIncomingRequests] = useState<AccessRequest[]>([
    {
      id: 1,
      hospital: 'Apollo Hospital',
      patient: 'Current User',
      abhaId: '12-3456-7890-0000',
      reason: 'Emergency consultation required for cardiac evaluation',
      duration: '7 days',
      status: 'Pending',
      receivedTime: '2 hours ago',
      sentTime: '2 hours ago'
    },
    {
      id: 2,
      hospital: 'Fortis Hospital',
      patient: 'Current User',
      abhaId: '12-3456-7890-0000',
      reason: 'Follow-up treatment for diabetes management',
      duration: '14 days',
      status: 'Pending',
      receivedTime: '5 hours ago',
      sentTime: '5 hours ago'
    }
  ]);

  const [sentRequests, setSentRequests] = useState<SentRequest[]>([
    {
      id: 1,
      patient: 'Rajesh Kumar',
      abhaId: '12-3456-7890-1234',
      reason: 'Emergency consultation required',
      duration: '7 days',
      status: 'Pending',
      sentTime: '2 hours ago',
      hospital: 'Current Hospital'
    },
    {
      id: 2,
      patient: 'Priya Sharma',
      abhaId: '12-3456-7890-5678',
      reason: 'Follow-up treatment',
      duration: '14 days',
      status: 'Approved',
      sentTime: '1 day ago',
      hospital: 'Current Hospital'
    }
  ]);

  const addIncomingRequest = (request: Omit<AccessRequest, 'id'>) => {
    const newRequest = {
      ...request,
      id: Date.now() // Use timestamp as ID
    };
    setIncomingRequests(prev => [newRequest, ...prev]);
  };

  const addSentRequest = (request: Omit<SentRequest, 'id'>) => {
    const newRequest = {
      ...request,
      id: Date.now() // Use timestamp as ID
    };
    setSentRequests(prev => [newRequest, ...prev]);

    // Also add to incoming requests (simulating the patient receiving the request)
    addIncomingRequest({
      hospital: request.hospital,
      patient: 'Current User',
      abhaId: '12-3456-7890-0000',
      reason: request.reason,
      duration: request.duration,
      status: 'Pending',
      receivedTime: 'Just now',
      sentTime: 'Just now'
    });
  };

  const approveRequest = (requestId: number) => {
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'Approved' as const }
          : req
      )
    );

    // Update corresponding sent request status
    const request = incomingRequests.find(r => r.id === requestId);
    if (request) {
      updateSentRequestStatus(requestId, 'Approved');
    }
  };

  const rejectRequest = (requestId: number) => {
    setIncomingRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'Rejected' as const }
          : req
      )
    );

    // Update corresponding sent request status
    const request = incomingRequests.find(r => r.id === requestId);
    if (request) {
      updateSentRequestStatus(requestId, 'Rejected');
    }
  };

  const updateSentRequestStatus = (requestId: number, status: 'Approved' | 'Rejected') => {
    setSentRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status }
          : req
      )
    );
  };

  return (
    <RequestContext.Provider value={{
      incomingRequests,
      sentRequests,
      addIncomingRequest,
      addSentRequest,
      approveRequest,
      rejectRequest,
      updateSentRequestStatus
    }}>
      {children}
    </RequestContext.Provider>
  );
};