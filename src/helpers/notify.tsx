import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { count } from 'helpers/goatcounter';

export const notifyEvent = (message: string, onClick: () => void): void => {
  toast.dark(message, { onClick });
};

const ErrorIcon = styled(FontAwesomeIcon).attrs({
  icon: 'exclamation-circle',
  'aria-label': 'error',
  'aria-hidden': false,
})`
  margin-right: 8px;
`;

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
  toast.error(
    () => (
      <>
        <ErrorIcon />
        {message}
      </>
    ),
    {
      onClick,
      autoClose: false,
      closeOnClick: false,
    }
  );
};
