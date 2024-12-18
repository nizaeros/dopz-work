import { useState } from 'react';
import toast from 'react-hot-toast';
import { clientService } from '../../../../../services/client';
import type { Client } from '../../../../../types/client';
import type { ClientFormData } from '../../../../../types/forms';

export const useClientEdit = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientFormData, setClientFormData] = useState<Partial<ClientFormData> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openEditModal = async (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
    setIsLoading(true);
    setError(null);

    try {
      const data = await clientService.fetchClientForEdit(client.id);
      setClientFormData({
        friendly_name: data.friendly_name,
        registered_name: data.registered_name,
        account_type: data.account_type,
        industry_id: data.industry_id,
        entity_type: data.entity_type,
        gstin: data.gstin,
        tan: data.tan,
        icn: data.icn,
        linkedin_url: data.linkedin_url,
        website_url: data.website_url,
        country_id: data.country_id,
        state_id: data.state_id,
        city_id: data.city_id,
        parent_account_ids: data.parent_account_ids
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching client data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeEditModal = () => {
    setSelectedClient(null);
    setClientFormData(null);
    setIsEditModalOpen(false);
    setError(null);
  };

  const handleEditSubmit = async (data: ClientFormData) => {
    if (!selectedClient) return;

    const toastId = toast.loading('Updating client...');

    try {
      setIsSubmitting(true);
      setError(null);
      await clientService.updateClient(selectedClient.id, data);
      toast.success('Client updated successfully', { id: toastId });
      closeEditModal();
      // Trigger refetch of client list
      window.location.reload(); // This should be replaced with proper state management
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update client';
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEditModalOpen,
    selectedClient,
    clientFormData,
    isSubmitting,
    isLoading,
    error,
    openEditModal,
    closeEditModal,
    handleEditSubmit
  };
};