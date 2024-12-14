import { send } from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config';
import { OrderItem } from '../../types';
import { formatOrderList, createEmailContent } from './utils';

export const sendOrderEmail = async (orders: OrderItem[]) => {
  try {
    const ordersToSend = orders.filter(order => order.quantity > 0);

    if (ordersToSend.length === 0) {
      throw new Error('Keine Artikel zur Bestellung ausgewählt');
    }

    const orderList = formatOrderList(ordersToSend);
    const { date, time, content } = createEmailContent(orderList);

    const templateParams = {
      to_email: 'kueche@drk-ludwigshafen.de',
      subject: `Neue Bestellung Küche Hygiene - ${date}`,
      content,
      date,
      time,
      order_list: orderList
    };

    const response = await send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Fehler beim Versenden der E-Mail');
    }

    return response;
  } catch (error) {
    console.error('Error sending order email:', error);
    throw error;
  }
};