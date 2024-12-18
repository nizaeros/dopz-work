import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { ClientForm } from '../ClientForm/ClientForm';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import type { Client } from '../../../../types/client';
import type { ClientFormData } from '../../../../types/forms';

interface ClientEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  client: Client | null;
  clientFormData: Partial<ClientFormData> | null;
  isSubmitting: boolean;
  isLoading: boolean;
  error?: string | null;
}

export const ClientEditModal: React.FC<ClientEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client,
  clientFormData,
  isSubmitting,
  isLoading,
  error
}) => {
  if (!client) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Client"
      size="xl"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : clientFormData ? (
        <ClientForm
          onSubmit={onSubmit}
          initialData={clientFormData}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </Modal>
  );
};