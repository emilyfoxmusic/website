import React from 'react';

import { HeaderContainerLink, LeftDiv, RightDiv } from './styles';

const Header: React.FC = () => (
  <header>
    <HeaderContainerLink to="/" aria-label="Emily Fox Music Home">
      <LeftDiv aria-hidden>Emily Fox</LeftDiv>
      <RightDiv aria-hidden>| Music</RightDiv>
    </HeaderContainerLink>
  </header>
);

export default Header;
