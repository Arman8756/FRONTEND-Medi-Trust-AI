import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Overview } from './pages/Overview';
import { Records } from './pages/Records';
import { AICenter } from './pages/AICenter';
import { Access } from './pages/Access';
import { Emergency } from './pages/Emergency';
import { BlockchainLog } from './pages/BlockchainLog';
import { Integration } from './pages/Integration';
import { Interoperability } from './pages/Interoperability';
import { Feedback } from './pages/Feedback';
import { Profile } from './pages/Profile';
import { HospitalUpload } from './pages/HospitalUpload';
import { PatientProfile } from './pages/PatientProfile';
import { AIHealthChatAssistant } from './pages/AIHealthChatAssistant';
import { HealthDashboard } from './pages/HealthDashboard';
import { RequestProvider } from './contexts/RequestContext';
import { PatientProvider } from './contexts/PatientContext';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Handle link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = new URL(link.href).pathname;
        window.history.pushState({}, '', path);
        setCurrentPath(path);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/health-dashboard':
        return <HealthDashboard />;
      case '/records':
        return <Records />;
      case '/hospital-upload':
        return <HospitalUpload />;
      case '/patient-profile':
        return <PatientProfile />;
      case '/ai-chat':
        return <AIHealthChatAssistant />;
      case '/ai-center':
        return <AICenter />;
      case '/access':
        return <Access />;
      case '/emergency':
        return <Emergency />;
      case '/blockchain-log':
        return <BlockchainLog />;
      case '/logs':
        return <BlockchainLog />;
      case '/integration':
        return <Integration />;
      case '/interoperability':
        return <Interoperability />;
      case '/interop':
        return <Interoperability />;
      case '/feedback':
        return <Feedback />;
      case '/profile':
        return <Profile />;
      case '/':
      default:
        return <HealthDashboard />;
    }
  };

  return (
    <PatientProvider>
      <RequestProvider>
        <Layout>
          {renderPage()}
        </Layout>
      </RequestProvider>
    </PatientProvider>
  );
}

export default App;
