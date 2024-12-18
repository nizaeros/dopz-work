import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { ClientForm } from './ClientForm';
import type { ClientFormData } from '../../../../types/forms';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Client"
      size="xl"
    >
      <ClientForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};