import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GeneralAppLayout } from '../../components/layout/GeneralAppLayout';
import { CLIENT_MANAGEMENT_MENU } from '../../constants/menu-items';
import { ClientList } from './components/ClientList';
import { ClientOverview } from './components/ClientOverview';
import { NotFoundPage } from '../NotFoundPage';

export const ClientManagementPage: React.FC = () => {
  return (
    <GeneralAppLayout menuItems={CLIENT_MANAGEMENT_MENU}>
      <Routes>
        <Route index element={<Navigate to="list" replace />} />
        <Route path="overview" element={<ClientOverview />} />
        <Route path="list" element={<ClientList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </GeneralAppLayout>
  );
};