export const UserGender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export const UserRoleType = {
  Internal: 'internal',
  External: 'external'
} as const;

export type UserGender = typeof UserGender[keyof typeof UserGender];
export type UserRoleType = typeof UserRoleType[keyof typeof UserRoleType];