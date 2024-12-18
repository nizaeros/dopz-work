import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { authService } from '../../services/auth.service';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

interface UserMenuProps {
  name: string;
  email: string;
  imageUrl?: string | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ name, email, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate(ROUTES.LOGIN);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
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
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <UserAvatar name={name} imageUrl={imageUrl} size="sm" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{email}</p>
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