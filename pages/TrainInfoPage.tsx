import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Train, Search as SearchIcon } from 'lucide-react';

interface TrainInfo {
  name: string;
  number: string;
  status: string;
  eta: string;
  platform: string;
}

const TrainInfoPage: React.FC = () => {
  const { t } = useLocalization();
  const [trainNumber, setTrainNumber] = useState('');
  const [trainInfo, setTrainInfo] = useState<TrainInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber) return;
    setLoading(true);
    setTrainInfo(null);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3001/api/train-info?trainNumber=${trainNumber}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not find train information.');
      }
      setTrainInfo(data);
    } catch (err: any) {
      setError("Could not connect to the server. PLEASE MAKE SURE the backend server is running in a separate terminal. (Error: " + (err.message || 'Failed to fetch') + ")");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Train className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('live_train_status_title')}</h1>
      </div>

      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          placeholder={t('enter_train_number')}
          className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900"
        />
        <button
          type="submit"
          disabled={loading || !trainNumber}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400"
        >
          {loading ? '...' : <SearchIcon size={20} />}
          <span className="hidden sm:inline ml-2">{t('search')}</span>
        </button>
      </form>

      {loading && <div className="text-center text-gray-500">{t('thinking')}</div>}
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert"><p className="font-bold">{error}</p></div>}

      {trainInfo && (
        <div className="border border-brand-gray rounded-lg p-6 bg-brand-light space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">{trainInfo.name} ({trainInfo.number})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">{t('current_status')}</p>
              <p className="text-lg font-semibold text-green-600">{trainInfo.status}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">{t('expected_arrival')}</p>
              <p className="text-lg font-semibold text-brand-blue">{trainInfo.eta}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">{t('platform')}</p>
              <p className="text-lg font-semibold text-brand-blue">{trainInfo.platform}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainInfoPage;