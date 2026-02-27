
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LocalizationProvider } from './context/LocalizationContext';

import DashboardPage from './pages/DashboardPage';
import ComplaintPage from './pages/ComplaintPage';
import WaitingHallPage from './pages/WaitingHallPage';
import TrainInfoPage from './pages/TrainInfoPage';
import TransportPage from './pages/TransportPage';
import AlertPage from './pages/AlertPage';
import LostAndFoundPage from './pages/LostAndFoundPage';
import SmartAssistantPage from './pages/SmartAssistantPage';
import Layout from './components/Layout';

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <Layout showBackButton={location.pathname !== '/' && location.pathname !== '/dashboard'}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/complaint" element={<ComplaintPage />} />
                <Route path="/waiting-hall" element={<WaitingHallPage />} />
                <Route path="/train-info" element={<TrainInfoPage />} />
                <Route path="/transport" element={<TransportPage />} />
                <Route path="/alert" element={<AlertPage />} />
                <Route path="/lost-and-found" element={<LostAndFoundPage />} />
                <Route path="/smart-assistant" element={<SmartAssistantPage />} />
            </Routes>
        </Layout>
    );
};

const App: React.FC = () => {
  return (
    <LocalizationProvider>
        <AppContent />
    </LocalizationProvider>
  );
};

export default App;
