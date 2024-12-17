import React from 'react';
import { Modal } from '../../../../components/ui/Modal';
import { ClientForm } from './ClientForm';
import type { ClientFormData } from '../../../../types/forms';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  initialData?: Partial<ClientFormData>;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: ClientFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Client' : 'Add New Client'}
      size="xl"
    >
      <ClientForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};