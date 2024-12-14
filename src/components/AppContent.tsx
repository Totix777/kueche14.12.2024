import React, { useState } from 'react';
import { Box, Container, Tab, Tabs, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import TaskFrequencyManager from './TaskFrequencyManager/TaskFrequencyManager';
import FoodLogger from './FoodLogger';
import OrderList from './OrderList';
import SaveButton from './SaveButton';
import ExportData from './ExportData';
import Login from './Login';

const AppContent = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <h1>Küche Hygiene Management</h1>
          <Typography variant="subtitle1" color="text.secondary">
            Angemeldet als: {currentUser}
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          onClick={logout}
          sx={{ ml: 2 }}
        >
          Abmelden
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Aufgaben" />
          <Tab label="Lebensmittel Protokoll" />
          <Tab label="Bestellliste" />
        </Tabs>
      </Box>

      {tab === 0 && <TaskFrequencyManager />}
      {tab === 1 && <FoodLogger />}
      {tab === 2 && <OrderList />}

      <SaveButton />
      <ExportData />
    </Container>
  );
};

export default AppContent;