
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton }) => {
  return (
    <div className="bg-brand-light min-h-screen font-sans">
      <Header showBackButton={showBackButton} />
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
