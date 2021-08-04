import React from 'react';
import { Normalize } from 'styled-normalize';
import GlobalFonts from 'fonts/globalFonts';

import 'utils/icons';

export const wrapPageElement = ({ element }) => (
  <>
    <Normalize />
    <GlobalFonts />
    {element}
  </>
);
