// Centralize constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif']
  }
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  CLIENTS: '/clients',
  USERS: '/users'
};