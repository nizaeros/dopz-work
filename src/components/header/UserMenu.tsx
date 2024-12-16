import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { authService } from '../../services/auth.service';
import type { UserProfile } from '../../types/user';
import { ROUTES } from '../../constants/routes';

interface UserMenuProps {
  user: UserProfile;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div className="relative user-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
          {user.profile_image_url ? (
            <img
              src={user.profile_image_url}
              alt={`${user.first_name} ${user.last_name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-600" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">
              {`${user.first_name} ${user.last_name}`}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          <button
            onClick={() => navigate('/profile')}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};