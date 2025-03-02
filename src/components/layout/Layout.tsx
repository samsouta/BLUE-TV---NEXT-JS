// components/layout/Layout.tsx
import React from 'react';
import TVNavbar from './TVNavbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <TVNavbar />
      <main className="min-h-screen mt-36 md:mt-20 mx-1 lg:mx-32">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
