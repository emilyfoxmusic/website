import { toast } from 'react-toastify';

export const notifyEvent = (message: string, onClick?: () => void): void => {
  toast.dark(message, { onClick });
};

export const notifyError = (
  message: string,
  error: Error | unknown,
  onClick?: () => void
): void => {
  console.error(message, error);
  toast.error(message, { onClick });
};

export const notifySuccess = (message: string, onClick?: () => void): void => {
  console.info(message);
  toast.success(message, { onClick });
};
