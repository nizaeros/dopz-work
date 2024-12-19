import React from 'react';
import { Modal } from '../../../../../../components/ui/Modal';
import { AddInputForm } from './AddInputForm';
import type { RoutineInput } from '../../../../../../types/routine-input';

interface AddInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<RoutineInput>) => Promise<void>;
  isSubmitting?: boolean;
}

export const AddInputModal: React.FC<AddInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Input"
      size="lg"
    >
      <AddInputForm 
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};