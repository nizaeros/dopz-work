import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  imageUrl?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  imageUrl, 
  name,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <User className={`${iconSizes[size]} text-gray-600`} />
      )}
    </div>
  );
};