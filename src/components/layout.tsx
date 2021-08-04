import React, { PropsWithChildren } from 'react';

import GlobalFonts from 'src/fonts/globalFonts';
import { Header } from 'src/components/header';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <GlobalFonts />
      <Header />
      <main>{children}</main>
    </>
  );
};
