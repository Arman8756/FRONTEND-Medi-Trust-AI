import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartIcon, FileIcon, UploadIcon, ChatIcon, LockIcon, 
  EmergencyIcon, BlockchainIcon, SettingsIcon, StarIcon, UserIcon 
} from '../shared/SvgIcons';

interface MenuItem {
  id: string;
  label: string;
  icon: React.FC<any>;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: HeartIcon, path: '/' },
  { id: 'records', label: 'Records', icon: FileIcon, path: '/records' },
  { id: 'hospital-upload', label: 'Hospital Upload', icon: UploadIcon, path: '/hospital-upload' },
  { id: 'ai-center', label: 'AI Center', icon: ChatIcon, path: '/ai-center' },
  { id: 'access', label: 'Access', icon: LockIcon, path: '/access' },
  { id: 'emergency', label: 'Emergency', icon: EmergencyIcon, path: '/emergency' },
  { id: 'logs', label: 'Logs', icon: BlockchainIcon, path: '/logs' },
  { id: 'interop', label: 'Interop', icon: SettingsIcon, path: '/interop' },
  { id: 'feedback', label: 'Feedback', icon: StarIcon, path: '/feedback' },
  { id: 'profile', label: 'Profile', icon: UserIcon, path: '/profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-20 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-50/95 backdrop-blur-xl border-r border-gray-200/60 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Main navigation"
      >
        <nav className="h-full overflow-y-auto py-6">
          <ul role="list" className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all group hover:shadow-lg backdrop-blur-sm"
                  aria-label={item.label}
                >
                  <item.icon className="group-hover:text-white text-blue-600" size={20} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
