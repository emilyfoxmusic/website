import React, { PropsWithChildren } from 'react';

import Header from './header';
import GlobalFonts from '../fonts/globalFonts';

const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <GlobalFonts />
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
