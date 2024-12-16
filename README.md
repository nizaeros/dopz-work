# DOPZ Work - Operations Hub

## Overview
DOPZ Work is an operations management platform built with React, TypeScript, and Supabase, providing separate dashboards for internal operations and client management.

## Features
- Role-based authentication (Internal/External users)
- Secure dashboard access
- Document management
- Client management
- Operations tracking

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router DOM
- Lucide Icons

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/nizaeros/dopz-work.git

# Navigate to project directory
cd dopz-work

# Install dependencies
npm install
```

### Environment Setup
Create `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=development
```

### Development
```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code
npm run format
```

### Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure
```
src/
├── components/       # Reusable UI components
├── constants/        # Application constants
├── hooks/           # Custom React hooks
├── lib/             # Library configurations
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Contributing
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License
This project is proprietary and confidential.