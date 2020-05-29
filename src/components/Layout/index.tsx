import React, { PropsWithChildren } from 'react';

import Header from 'components/Header';
import GlobalFonts from 'fonts/globalFonts';

const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
  <>
    <GlobalFonts />
    <Header />
    <main>{children}</main>
  </>
);
export default Layout;
