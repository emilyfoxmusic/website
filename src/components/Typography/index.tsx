import styled from 'styled-components';

import { fontFamily } from 'styles/fonts';

export const PageHeading = styled.h1`
  font-family: ${fontFamily};
  font-size: 2rem;
  text-decoration: underline;
  font-weight: normal;
`;

export const PageHeadingNoUnderline = styled.h1`
  font-family: ${fontFamily};
  font-size: 2rem;
  font-weight: normal;
`;

export const Paragraph = styled.p`
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: normal;
`;
