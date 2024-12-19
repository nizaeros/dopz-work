import { getClients } from './list';
import { getClientById } from './get';
import { createClient } from './create';
import { updateClient } from './update';
import { fetchClientForEdit } from './edit';

export const clientService = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  fetchClientForEdit
};