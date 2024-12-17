import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Link } from 'lucide-react';
import { Input } from '../../../../../components/ui/Input';
import type { ClientFormData } from '../../../../../types/forms';

interface OnlinePresenceProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
}

export const OnlinePresence: React.FC<OnlinePresenceProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Online Presence</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('linkedin_url')}
          label="LinkedIn URL"
          icon={Link}
          error={errors.linkedin_url?.message}
        />
        <Input
          {...register('website_url')}
          label="Website URL"
          icon={Link}
          error={errors.website_url?.message}
        />
      </div>
    </div>
  );
};