import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ExternalLink } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import type { Client } from '../../types/client';

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit }) => {
  const navigate = useNavigate();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(ROUTES.CLIENT.DASHBOARD.replace(':slug', client.slug));
  };

  // ... rest of the component code ...
};