import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Normalize } from 'styled-normalize';

import Analytics from 'components/Analytics';
import GlobalFonts from 'fonts/globalFonts';
import StoreProvider from 'components/Live/StoreProvider';

import 'utils/icons';
import 'react-toastify/dist/ReactToastify.css';

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
    <ToastContainer position="bottom-right" />
    <Analytics location={props.location} />
  </>
);
