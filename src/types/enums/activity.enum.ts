export const ActivityType = {
  Create: 'create',
  Update: 'update',
  Delete: 'delete'
} as const;

export type ActivityType = typeof ActivityType[keyof typeof ActivityType];