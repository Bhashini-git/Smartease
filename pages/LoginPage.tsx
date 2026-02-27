import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalization } from '../hooks/useLocalization';
import { TrainFront, AlertCircle, KeyRound, CheckCircle } from 'lucide-react';

type AuthStep = 'enter_contact' | 'enter_otp';

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('enter_contact');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { sendOtp, verifyOtp } = useAuth();
  const { t } = useLocalization();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const result = await sendOtp(contact);
    if (result.success) {
      setSuccessMessage(`${t('otp_sent_success')} Your OTP is: ${result.otp}`); // Demo purpose
      setStep('enter_otp');
    } else {
      setError(result.message || 'Failed to send OTP.');
    }
    setLoading(false);
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setError(null);
    const result = await verifyOtp(contact, otp);
    if (!result.success) {
      setError(result.message || 'Invalid OTP.');
    }
    // On success, the AuthProvider handles the redirect
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-brand-light">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg m-4">
        <div className="text-center">
            <div className="inline-block p-4 bg-brand-orange rounded-full mb-4">
                <TrainFront className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-brand-blue">{t('login_with_otp_title')}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 'enter_contact' ? t('login_with_otp_prompt') : t('enter_otp_prompt')}
            </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center" role="alert">
            <AlertCircle className="h-5 w-5 mr-3" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded flex items-center" role="alert">
            <CheckCircle className="h-5 w-5 mr-3" />
            <p className="font-bold">{successMessage}</p>
          </div>
        )}

        {step === 'enter_contact' ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
            <div className="rounded-md shadow-sm">
                <label htmlFor="contact" className="sr-only">{t('email_or_mobile')}</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  autoComplete="email"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                  placeholder={t('email_or_mobile')}
                  disabled={loading}
                />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading || !contact}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? t('thinking') : t('send_otp')}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div className="rounded-md shadow-sm">
                <label htmlFor="otp" className="sr-only">{t('otp')}</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm text-center tracking-[0.5em]"
                  placeholder={t('otp')}
                  disabled={loading}
                />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? t('thinking') : t('verify_otp')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
