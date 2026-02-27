import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { BellRing } from 'lucide-react';

const AlertPage: React.FC = () => {
  const { t } = useLocalization();
  const [station, setStation] = useState('');
  const [minutes, setMinutes] = useState('15');
  const [alertSet, setAlertSet] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(station && minutes) {
        setAlertSet(true);
        setTimeout(() => {
            alert(`Wake up! Your station ${station} is approaching.`);
        }, parseInt(minutes, 10) * 1000 * 60); // In a real app this would be more robust
        setTimeout(() => setAlertSet(false), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <BellRing className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('arrival_alert_title')}</h1>
      </div>
      <p className="text-gray-600 mb-6">{t('alert_info')}</p>

      {alertSet && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{t('alert_set_success')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="station" className="block text-sm font-medium text-gray-700">{t('destination_station')}</label>
          <input 
            type="text" 
            id="station"
            value={station}
            onChange={(e) => setStation(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" 
          />
        </div>
        <div>
          <label htmlFor="minutes" className="block text-sm font-medium text-gray-700">{t('alert_time')}</label>
          <input 
            type="number" 
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="5"
            max="120"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" 
          />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
            {t('set_alert')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlertPage;