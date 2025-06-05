import React from 'react';
import FeatureAssistants from './_components/FeatureAssistants';
import Feedback from './_components/Feedback';
import History from './_components/History';

function Dashboard() {
  return (
    <div>
      <FeatureAssistants/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <History/>
        <Feedback/>

      </div>
    </div>
    
  );
}

export default Dashboard;
