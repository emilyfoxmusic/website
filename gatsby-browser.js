import React from 'react';
import { Normalize } from 'styled-normalize';

import Analytics from 'components/Analytics';
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
