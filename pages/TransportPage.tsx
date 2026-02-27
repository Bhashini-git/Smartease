import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Car, Bike, CarTaxiFront } from 'lucide-react';

const TransportPage: React.FC = () => {
  const { t } = useLocalization();
  const [transportType, setTransportType] = useState('auto');
  const [destination, setDestination] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Railway Station');
  const [bookingTime, setBookingTime] = useState('');
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && pickupLocation && bookingTime && platform) {
      setLoading(true);
      setError(null);
      setConfirmed(false);
      try {
        const response = await fetch('http://localhost:3001/api/transport/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transportType, destination, pickupLocation, bookingTime, platform })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Booking failed.');

        setConfirmed(true);
        setTimeout(() => setConfirmed(false), 5000);
      } catch (err: any) {
        setError("Could not connect to the server. PLEASE MAKE SURE the backend server is running in a separate terminal. (Error: " + (err.message || 'Failed to fetch') + ")");
      } finally {
        setLoading(false);
      }
    }
  };
  
  const transportOptions = [
      { id: 'auto', name: t('auto_rickshaw'), icon: <Car size={24} /> },
      { id: 'bike', name: t('bike'), icon: <Bike size={24} /> },
      { id: 'cab', name: t('cab'), icon: <CarTaxiFront size={24} /> }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Car className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('transport_booking_title')}</h1>
      </div>

      {confirmed && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{t('booking_confirmed')}</p>
          <p>{t('driver_details')}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('transport_type')}</label>
          <div className="grid grid-cols-3 gap-3">
            {transportOptions.map(option => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => setTransportType(option.id)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${transportType === option.id ? 'bg-brand-orange text-white ring-2 ring-green-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {option.icon}
                    <span className="mt-2 text-sm font-medium">{option.name}</span>
                </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">{t('pickup_location')}</label>
            <input 
              type="text" 
              id="pickup" 
              value={pickupLocation} 
              onChange={(e) => setPickupLocation(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">{t('destination')}</label>
            <input 
              type="text" 
              id="destination" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
           <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">{t('platform_number')}</label>
            <input 
              type="text" 
              id="platform" 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)} 
              required 
              placeholder="e.g., 4A"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">{t('booking_time')}</label>
            <input 
              type="time" 
              id="time" 
              value={bookingTime} 
              onChange={(e) => setBookingTime(e.target.value)} 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange text-gray-900" />
          </div>
        </div>

        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400">
            {loading ? t('thinking') : t('book_now')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransportPage;