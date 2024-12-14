import { OrderItem } from '../../types';

export const formatOrderList = (orders: OrderItem[]): string => {
  return orders
    .map(order => 
      `${order.quantity}x ${order.articleNumber} - ${order.description} (${order.unit || '-'}) ${order.orderUnit}`
    )
    .join('\n');
};

export const createEmailContent = (orderList: string) => {
  const now = new Date();
  const date = now.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const time = now.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const content = `Sehr geehrte Damen und Herren,

hiermit sende ich Ihnen die aktuelle Bestellung vom ${date} um ${time} Uhr:

Bestellliste:
${orderList}

Mit freundlichen Grüßen
DRK Küche Team`;

  return { date, time, content };
};