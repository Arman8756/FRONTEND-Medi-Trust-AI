import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, SearchIcon, UserIcon, HeartIcon } from '../shared/SvgIcons';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-xl border-b border-gray-200/60 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            aria-label="Toggle menu"
          >
            <MenuIcon size={24} />
          </button>
          
          <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
            <HeartIcon className="text-blue-600" size={32} />
            MediTrust AI
          </h1>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <SearchIcon 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" 
            />
            <input
              type="search"
              placeholder="Search patients, records..."
              className="w-full pl-10 pr-4 py-2 bg-white/80 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200/60 shadow-inner"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-xl transition-all"
              aria-expanded={showDropdown}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <UserIcon size={20} className="text-white" />
              </div>
            </motion.button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-gray-50/95 backdrop-blur-xl rounded-xl shadow-2xl py-1 border border-gray-200/60"
              >
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg mx-1">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg mx-1">
                  Settings
                </a>
                <hr className="my-1 border-gray-200" />
                <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-1">
                  Logout
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
