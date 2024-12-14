import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSave } from '../context/SaveContext';

const SaveButton: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { triggerSave } = useSave();

  const handleSave = () => {
    triggerSave();
    setShowSuccess(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSave}
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      >
        Speichern
      </Button>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message="Erfolgreich gespeichert"
      />
    </>
  );
};

export default SaveButton;