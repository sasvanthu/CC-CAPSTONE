
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Pickup from './pages/Pickup';
import Alerts from './pages/Alerts';
import { dbService } from './services/dbService';
import { sensorSimulation } from './services/sensorSimulation';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Bootstrap Firebase Cloud Database
    const initializeCloud = async () => {
      await dbService.init();
      dbService.listenToUpdates();
      
      // Start Live Sensor Simulation (Pushing to Firebase)
      sensorSimulation.start();
    };

    initializeCloud();

    return () => sensorSimulation.stop();
  }, []);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
