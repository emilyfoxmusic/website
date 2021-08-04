import { toast } from 'react-toastify';

import { count } from 'helpers/goatcounter';

export const notifyEvent = (message: string, onClick?: () => void): void => {
  toast.dark(message, { onClick });
};

export const notifyError = (
  message: string,
  error: Error | unknown,
  onClick?: () => void
): void => {
  console.error(message, error);
  count({
    event: true,
    title: message,
    path: `error:${message.toLowerCase().replace(/ /g, '-')}`,
  });
  toast.error(message, { onClick });
};
