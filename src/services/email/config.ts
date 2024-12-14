import { init } from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_t9atbc5',
  TEMPLATE_ID: 'template_pq0lsc2',
  PUBLIC_KEY: 'RsebYPrOW0W5xX_4Z'
};

// Initialize EmailJS with your public key
init(EMAILJS_CONFIG.PUBLIC_KEY);