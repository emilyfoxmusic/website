import React, { PropsWithChildren } from 'react';
import { Normalize } from 'styled-normalize';

import Header from 'components/Header';
import GlobalFonts from 'fonts/globalFonts';

import { PageContainer } from './styles';

const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Normalize />
    <GlobalFonts />
    <Header />
    <PageContainer>{children}</PageContainer>
  </>
);

export default Layout;
