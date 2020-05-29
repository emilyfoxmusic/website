import React, { PropsWithChildren } from 'react';

import GlobalFonts from 'fonts/globalFonts';
import { Header } from 'components/header';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <GlobalFonts />
      <Header />
      <main>{children}</main>
    </>
  );
};
