import BackgroundImage from 'gatsby-background-image';
import styled from 'styled-components';

import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

export const PageContainer = styled.main`
  margin: auto;

  width: calc(100vw - 64px);

  ${largeBreakpoint`
    margin: auto;
    max-width: 800px;
  `}

  font-family: ${fontFamily};
  font-size: 1.3rem;
  line-height: 1.8rem;
`;

export const PortraitBackground = styled(BackgroundImage)<{
  isFullHeight: boolean;
}>`
  min-height: ${({ isFullHeight }): string =>
    isFullHeight ? 'calc(100vw * (1080 / 1920))' : '300px'};

  width: 100vw;
  margin: 0 calc((100% - 100vw) / 2);
`;

export const ButtonContainer = styled.nav`
  flex: 0 1 50%;

  ${largeBreakpoint`
    display: flex;
    justify-content: space-evenly;
  `}
`;

export const MainContentContainer = styled.div`
  padding: 0 24px;

  display: flex;
  justify-content: space-between;

  ${largeBreakpoint`
    display: block;
    padding: 16px 24px;
  `}
`;
