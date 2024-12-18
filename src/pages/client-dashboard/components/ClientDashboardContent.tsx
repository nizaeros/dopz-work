import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClientDashboardOverview } from './overview/ClientDashboardOverview';
import { RoutineInput } from './input/RoutineInput';
import { OnetimeInput } from './input/OnetimeInput';

export const ClientDashboardContent: React.FC = () => {
  return (
    <Routes>
      {/* Default route redirects to overview */}
      <Route index element={<Navigate to="dashboard" replace />} />
      
      {/* Main routes */}
      <Route path="dashboard" element={<ClientDashboardOverview />} />
      
      {/* Input routes */}
      <Route path="input">
        <Route index element={<Navigate to="routine" replace />} />
        <Route path="routine" element={<RoutineInput />} />
        <Route path="onetime" element={<OnetimeInput />} />
      </Route>
    </Routes>
  );
};