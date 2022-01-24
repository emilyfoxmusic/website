import React from 'react';
import { Normalize } from 'styled-normalize';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Analytics from 'components/Analytics';
import GlobalFonts from 'fonts/globalFonts';
import StoreProvider from 'components/Live/StoreProvider';
import { red } from 'styles/colors';

import 'utils/icons';
import 'react-toastify/dist/ReactToastify.css';

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);

const StyledToastsContainer = styled(ToastContainer)`
  /* Extra bottom margin to avoid clashing with bar on overlay*/
  margin-bottom: 16px;

  .Toastify__toast {
    font-family: Arial, sans-serif;
  }

  .Toastify__progress-bar--dark {
    background: ${red};
  }

  .Toastify__toast--error {
    cursor: auto;
    background: ${red};
    margin-top: 4px;
  }
`;

export const wrapPageElement = ({ element, props }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
    <StyledToastsContainer position="bottom-right" draggable={false} />
    <Analytics location={props.location} />
  </>
);
