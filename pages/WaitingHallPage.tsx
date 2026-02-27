import React, { useState, useEffect, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { Ticket } from 'lucide-react';

interface Seat {
  id: number;
  status: 'available' | 'booked' | 'selected';
}

const WaitingHallPage: React.FC = () => {
  const { t } = useLocalization();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<{success: boolean, message: string} | null>(null);

  const fetchSeats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/waiting-hall/status');
      if (!response.ok) throw new Error('Failed to fetch seat status.');
      const data = await response.json();
      setSeats(data);
    } catch (err: any) {
      setError("Could not connect to the server. PLEASE MAKE SURE the backend server is running in a separate terminal. (Error: " + (err.message || 'Failed to fetch') + ")");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
    }
  };
  
  const handleBooking = async () => {
    if (selectedSeat) {
      setLoading(true);
      setBookingStatus(null);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/waiting-hall/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seatId: selectedSeat })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Booking failed.');

        setBookingStatus({ success: true, message: t('seat_booked_success') });
        setSelectedSeat(null);
        fetchSeats(); // Refresh seat status
        setTimeout(() => setBookingStatus(null), 5000);
      } catch (err: any) {
        setBookingStatus({ success: false, message: "Could not connect to the server. PLEASE MAKE SURE the backend server is running. (Error: " + (err.message || 'Failed to fetch') + ")" });
      } finally {
        setLoading(false);
      }
    }
  }

  const getSeatClass = (seat: Seat) => {
    if (seat.id === selectedSeat) return 'bg-brand-orange text-white ring-2 ring-offset-2 ring-brand-orange';
    switch (seat.status) {
      case 'booked': return 'bg-gray-400 cursor-not-allowed';
      case 'available':
      default: return 'bg-green-200 text-green-800 hover:bg-green-300 cursor-pointer';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <Ticket className="h-8 w-8 text-brand-orange" />
        <h1 className="text-2xl font-bold text-brand-blue">{t('waiting_hall_booking_title')}</h1>
      </div>
      <p className="text-gray-600 mb-6">{t('select_seat')}</p>

      {bookingStatus && (
        <div className={`border-l-4 p-4 mb-6 rounded ${bookingStatus.success ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`} role="alert">
          <p className="font-bold">{bookingStatus.message}</p>
        </div>
      )}

      {error && <div className="text-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert"><p className="font-bold">{error}</p></div>}

      <div className="p-4 border rounded-lg bg-gray-50 mb-6 min-h-[150px] flex items-center justify-center">
        {loading && !seats.length ? <div className="text-gray-500">{t('thinking')}</div> :
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {seats.map(seat => (
            <div
              key={seat.id}
              className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-md transition-all ${getSeatClass(seat)}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.id}
            </div>
          ))}
        </div>
        }
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-green-200 mr-2 border border-gray-300"></span> {t('available')}</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-gray-400 mr-2"></span> {t('booked')}</div>
            <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-brand-orange mr-2"></span> {t('selected')}</div>
        </div>
        <button 
          onClick={handleBooking}
          disabled={!selectedSeat || loading}
          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? t('thinking') : t('book_selected_seat')}
        </button>
      </div>
    </div>
  );
};

export default WaitingHallPage;