import React from 'react';
import { Normalize } from 'styled-normalize';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Analytics from 'components/Analytics';
import GlobalFonts from 'fonts/globalFonts';
import StoreProvider from 'components/Live/StoreProvider';
import { red } from 'styles/colors';
import { fontFamily } from 'styles/fonts';

import 'utils/icons';
import 'react-toastify/dist/ReactToastify.css';

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);

const StyledToastsContainer = styled(ToastContainer)`
  .Toastify__progress-bar--dark {
    background: ${red};
  }
`;

export const wrapPageElement = ({ element, props }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
    <StyledToastsContainer position="bottom-right" />
    <Analytics location={props.location} />
  </>
);
