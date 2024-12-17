export const EntityType = {
  PrivateLimited: 'Private Limited',
  PublicLimited: 'Public Limited',
  LLP: 'LLP',
  OPC: 'OPC',
  BranchOffice: 'Branch Office',
  LiaisonOffice: 'Liaison Office',
  PartnershipFirm: 'Partnership Firm'
} as const;

export type EntityType = typeof EntityType[keyof typeof EntityType];