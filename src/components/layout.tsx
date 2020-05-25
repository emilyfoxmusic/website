import React, { PropsWithChildren } from 'react';

import Header from './header';

const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
