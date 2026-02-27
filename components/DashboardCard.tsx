import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, path, icon, disabled = false }) => {
  const className = `group block p-6 bg-white rounded-xl shadow-md border border-brand-gray ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out'}`;

  const content = (
    <div className="flex items-center space-x-4">
      <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg text-white ${disabled ? 'bg-gray-400' : 'bg-brand-orange'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-lg font-semibold ${disabled ? 'text-gray-600' : 'text-brand-blue group-hover:text-brand-orange'} transition-colors duration-300`}>{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  return (
    <Link to={path} className={className}>
      {content}
    </Link>
  );
};

export default DashboardCard;
