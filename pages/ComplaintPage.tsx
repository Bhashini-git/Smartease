import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { FilePenLine } from 'lucide-react';

const ComplaintPage: React.FC = () => {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({ pnr: '', train_number: '', coach: '', category: '', details: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch('http://localhost:3001/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit complaint.');
      
      setSubmitted(true);
      setFormData({ pnr: '', train_number: '', coach: '', category: '', details: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError("Could not connect to the server. PLEASE MAKE SURE the backend server is running in a separate terminal. (Error: " + (err.message || 'Failed to fetch') + ")");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <FilePenLine className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('complaint_form_title')}</h1>
      </div>

      {submitted && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{t('complaint_submitted')}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="pnr" className="block text-sm font-medium text-gray-700">{t('pnr_number')}</label>
            <input type="text" id="pnr" value={formData.pnr} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
          <div>
            <label htmlFor="train_number" className="block text-sm font-medium text-gray-700">{t('train_number')}</label>
            <input type="text" id="train_number" value={formData.train_number} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
          <div>
            <label htmlFor="coach" className="block text-sm font-medium text-gray-700">{t('coach_number')}</label>
            <input 
              type="text" 
              id="coach" 
              value={formData.coach} 
              onChange={handleChange} 
              placeholder="e.g., S5, B2"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">{t('complaint_category')}</label>
          <select id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900">
            <option value="">{t('select_category')}</option>
            <option value="Cleanliness">{t('cleanliness')}</option>
            <option value="Food Quality">{t('food_quality')}</option>
            <option value="Staff Behavior">{t('staff_behavior')}</option>
            <option value="Security">{t('security')}</option>
            <option value="Other">{t('other')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">{t('complaint_details')}</label>
          <textarea id="details" rows={4} maxLength={500} value={formData.details} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900"></textarea>
        </div>
        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors disabled:bg-gray-400">
            {loading ? t('thinking') : t('submit_complaint')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintPage;