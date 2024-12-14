import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppContent from './components/AppContent';
import { SaveProvider } from './context/SaveContext';

const App = () => {
  return (
    <AuthProvider>
      <SaveProvider>
        <AppContent />
      </SaveProvider>
    </AuthProvider>
  );
};

export default App;