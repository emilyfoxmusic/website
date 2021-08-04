import React from 'react';
import Analytics from './src/components/Analytics';
import { Normalize } from 'styled-normalize';
import GlobalFonts from 'fonts/globalFonts';

import 'utils/icons';

export const wrapPageElement = ({ element, props }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
    <Analytics location={props.location} />
  </>
);
