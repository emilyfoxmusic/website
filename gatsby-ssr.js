import React from 'react';
import { Normalize } from 'styled-normalize';
import GlobalFonts from 'fonts/globalFonts';
import StoreProvider from 'components/Live/StoreProvider';

import 'utils/icons';

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);

export const wrapPageElement = ({ element }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
  </>
);
