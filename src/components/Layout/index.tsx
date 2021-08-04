import React, { PropsWithChildren } from 'react';
import { Normalize } from 'styled-normalize';

import Header from 'components/Header';
import GlobalFonts from 'fonts/globalFonts';

const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Normalize />
    <GlobalFonts />
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;
