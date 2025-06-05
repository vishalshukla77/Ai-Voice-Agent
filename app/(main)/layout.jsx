import React from 'react';
import AppHeader from "./_components/AppHeader";
function DashboardLayout({ children }) {
  return (
    <div>
      <AppHeader/>

      <div className='p-10 mt-20 md:px-20 lg:px-20 xl:px-56 2xl:px-72'>


      {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
