import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { useLocalization } from '../hooks/useLocalization';
import { FilePenLine, Ticket, Train, Car, BellRing, Search, Bot } from 'lucide-react';
import type { DashboardItem } from '../types';
import { isAIAvailable } from '../services/geminiService';

const DashboardPage: React.FC = () => {
  const { t } = useLocalization();
  const [assistantAvailable, setAssistantAvailable] = useState(true);

  useEffect(() => {
    // Check on mount if the assistant is available.
    setAssistantAvailable(isAIAvailable());
  }, []);

  const dashboardItems: DashboardItem[] = [
    { id: 'complaint', titleKey: 'complaint_title', descriptionKey: 'complaint_desc', path: '/complaint', icon: <FilePenLine size={24} /> },
    { id: 'waiting-hall', titleKey: 'waiting_hall_title', descriptionKey: 'waiting_hall_desc', path: '/waiting-hall', icon: <Ticket size={24} /> },
    { id: 'train-info', titleKey: 'train_info_title', descriptionKey: 'train_info_desc', path: '/train-info', icon: <Train size={24} /> },
    { id: 'transport', titleKey: 'transport_title', descriptionKey: 'transport_desc', path: '/transport', icon: <Car size={24} /> },
    { id: 'alert', titleKey: 'alert_title', descriptionKey: 'alert_desc', path: '/alert', icon: <BellRing size={24} /> },
    { id: 'lost-found', titleKey: 'lost_found_title', descriptionKey: 'lost_found_desc', path: '/lost-and-found', icon: <Search size={24} /> },
    { id: 'smart-assistant', titleKey: 'smart_assistant_title', descriptionKey: 'smart_assistant_desc', path: '/smart-assistant', icon: <Bot size={24} /> },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-brand-blue mb-6">{t('dashboard_title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <DashboardCard
            key={item.id}
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
            path={item.path}
            icon={item.icon}
            disabled={item.id === 'smart-assistant' && !assistantAvailable}
          />
        ))}
      </div>
       {!assistantAvailable && (
        <div className="text-center text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md mt-8" role="alert">
          <p>The Smart Assistant feature is currently unavailable due to a missing API key configuration.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;