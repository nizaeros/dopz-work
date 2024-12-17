import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GeneralAppLayout } from '../../components/layout/GeneralAppLayout';
import { CLIENT_MANAGEMENT_MENU } from '../../constants/menu-items';
import { ClientList } from './ClientList';
import { ClientOverview } from './ClientOverview';
import { NotFoundPage } from '../NotFoundPage';

export const ClientManagementPage: React.FC = () => {
  return (
    <GeneralAppLayout menuItems={CLIENT_MANAGEMENT_MENU}>
      <div className="w-full">
        <Routes>
          <Route index element={<Navigate to="list" replace />} />
          <Route path="overview" element={<ClientOverview />} />
          <Route path="list" element={<ClientList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </GeneralAppLayout>
  );
};