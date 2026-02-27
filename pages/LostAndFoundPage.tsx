import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Search, PackagePlus, PackageSearch } from 'lucide-react';

type ActiveTab = 'lost' | 'found';

interface SuccessMessage {
    type: 'lost' | 'found' | 'match';
    message: string;
    details?: any;
}

const LostAndFoundPage: React.FC = () => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<ActiveTab>('lost');
  const [formData, setFormData] = useState({ itemName: '', location: '', description: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessMessage | null>(null);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    // Reset form and messages when switching tabs
    setFormData({ itemName: '', location: '', description: '', contact: '' });
    setError(null);
    setSuccess(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const endpoint = activeTab === 'lost' ? '/api/lost-found/report-lost' : '/api/lost-found/report-found';

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit report.');
      
      if (activeTab === 'lost') {
          if (data.matchFound) {
              setSuccess({ type: 'match', message: t('match_found_success'), details: data.details });
          } else {
              setSuccess({ type: 'lost', message: t('report_submitted')});
          }
      } else {
        setSuccess({ type: 'found', message: t('found_item_submitted')});
      }
      
      setFormData({ itemName: '', location: '', description: '', contact: '' });
      setTimeout(() => setSuccess(null), 10000); // Give more time to see match details
    } catch (err: any) {
      setError("Could not connect to the server. PLEASE MAKE SURE the backend server is running in a separate terminal. (Error: " + (err.message || 'Failed to fetch') + ")");
    } finally {
      setLoading(false);
    }
  };

  const renderSuccessMessage = () => {
    if (!success) return null;
    const baseClass = "border-l-4 p-4 mb-6 rounded";
    const successClass = "bg-green-100 border-green-500 text-green-700";
    const infoClass = "bg-blue-100 border-blue-500 text-blue-700";

    if (success.type === 'match') {
      return (
        <div className={`${baseClass} ${infoClass}`} role="alert">
          <p className="font-bold">{success.message}</p>
          <p className="mt-2">{t('finder_contact_details')}</p>
          <div className="mt-1 p-2 bg-white rounded">
            <p><strong>{t('item_name')}:</strong> {success.details.itemName}</p>
            <p><strong>{t('location_found')}:</strong> {success.details.location}</p>
            <p><strong>{t('contact_info')}:</strong> {success.details.contact}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`${baseClass} ${successClass}`} role="alert">
        <p className="font-bold">{success.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('lost_and_found_title')}</h1>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <div className="-mb-px flex space-x-4" aria-label="Tabs">
            <button onClick={() => handleTabChange('lost')} className={`flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'lost' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <PackageSearch size={16}/>
                <span>{t('i_lost_something')}</span>
            </button>
            <button onClick={() => handleTabChange('found')} className={`flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'found' ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <PackagePlus size={16}/>
                <span>{t('i_found_something')}</span>
            </button>
        </div>
      </div>
      
      {renderSuccessMessage()}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{error}</p>
        </div>
      )}
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{activeTab === 'lost' ? t('report_lost_item') : t('report_found_item')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">{t('item_name')}</label>
          <input type="text" id="itemName" value={formData.itemName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">{activeTab === 'lost' ? t('last_seen_location') : t('location_found')}</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('item_description')}</label>
          <textarea id="description" rows={3} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900"></textarea>
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">{t('contact_info')}</label>
          <input type="text" id="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
        </div>
        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400">
            {loading ? t('thinking') : t('submit_report')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostAndFoundPage;