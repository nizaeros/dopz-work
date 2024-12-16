import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GeneralAppLayout } from '../../components/layout/GeneralAppLayout';
import { CLIENT_MANAGEMENT_MENU } from '../../constants/menu-items';
import { ClientList } from './components/ClientList';
import { ClientDetails } from './components/ClientDetails';
import { ClientCreate } from './components/ClientCreate';
import { ClientOverview } from './components/ClientOverview';
import { ClientAnalytics } from './components/ClientAnalytics';
import { ClientSettings } from './components/ClientSettings';

export const ClientManagementPage: React.FC = () => {
  return (
    <GeneralAppLayout
      title="Client Management"
      menuItems={CLIENT_MANAGEMENT_MENU}
    >
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ClientOverview />} />
        <Route path="list" element={<ClientList />} />
        <Route path="create" element={<ClientCreate />} />
        <Route path=":clientId" element={<ClientDetails />} />
        <Route path="analytics" element={<ClientAnalytics />} />
        <Route path="settings" element={<ClientSettings />} />
      </Routes>
    </GeneralAppLayout>
  );
};