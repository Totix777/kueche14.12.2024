import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { orderItems } from '../data/orderItems';
import { OrderItem } from '../types';
import { sendOrderEmail } from '../services/email/orderEmail';

const OrderList = () => {
  const [orders, setOrders] = useState<OrderItem[]>(orderItems.map(item => ({
    ...item,
    quantity: 0
  })));
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleQuantityChange = (articleNumber: string, quantity: number) => {
    setOrders(orders.map(order => 
      order.articleNumber === articleNumber 
        ? { ...order, quantity: Math.max(0, quantity) } 
        : order
    ));
  };

  const handleSubmitOrder = async () => {
    const ordersToSubmit = orders.filter(order => order.quantity > 0);
    
    if (ordersToSubmit.length === 0) {
      setErrorMessage('Bitte wählen Sie mindestens einen Artikel aus.');
      setShowError(true);
      return;
    }

    setSending(true);
    try {
      await sendOrderEmail(ordersToSubmit);
      setShowSuccess(true);
      // Reset quantities after successful submission
      setOrders(orders.map(order => ({ ...order, quantity: 0 })));
    } catch (error) {
      console.error('Error sending order:', error);
      setErrorMessage('Fehler beim Versenden der Bestellung. Bitte versuchen Sie es erneut.');
      setShowError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Bestellliste
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Art.-Nr.</TableCell>
              <TableCell>Artikelbezeichnung</TableCell>
              <TableCell>VE</TableCell>
              <TableCell>Bestell-Einheit</TableCell>
              <TableCell>Bestell-Menge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <TableRow key={item.articleNumber}>
                <TableCell>{item.articleNumber}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.orderUnit}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(
                      item.articleNumber, 
                      parseInt(e.target.value) || 0
                    )}
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={handleSubmitOrder}
          disabled={sending}
          size="large"
        >
          Bestellung Abschicken
        </Button>
      </Box>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Bestellung wurde erfolgreich abgeschickt!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={showError} 
        autoHideDuration={3000} 
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderList;