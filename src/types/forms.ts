import { z } from 'zod';
import { AccountType, EntityType } from './enums';

export const clientFormSchema = z.object({
  friendly_name: z.string().min(1, 'Client name is required').max(200),
  registered_name: z.string().max(200).optional(),
  account_type: z.nativeEnum(AccountType),
  industry_id: z.string().uuid('Invalid industry ID'),
  entity_type: z.nativeEnum(EntityType),
  gstin: z.string().max(15).optional(),
  tan: z.string().max(10).optional(),
  icn: z.string().max(21).optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  parent_account_ids: z.array(z.string().uuid('Invalid parent account ID')),
  logo_file: z.instanceof(File).optional(),
});

export type ClientFormData = z.infer<typeof clientFormSchema>;

export interface IndustryOption {
  id: string;
  name: string;
}

export interface ParentAccountOption {
  id: string;
  name: string;
  code: string;
}