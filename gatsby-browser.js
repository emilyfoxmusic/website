import React from 'react';
import Analytics from './src/components/Analytics';
import { Normalize } from 'styled-normalize';
import GlobalFonts from 'fonts/globalFonts';
import StoreProvider from 'components/Live/StoreProvider';

import 'utils/icons';

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);

export const wrapPageElement = ({ element, props }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
    <Analytics location={props.location} />
  </>
);
