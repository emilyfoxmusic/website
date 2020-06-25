import styled from 'styled-components';

import { fontFamily } from 'styles/fonts';

export const PageHeadingNoUnderline = styled.h1`
  font-family: ${fontFamily};
  font-size: 2rem;
  font-weight: normal;
  text-align: center;
  margin: 2rem 0;
`;

export const PageHeading = styled(PageHeadingNoUnderline)`
  text-decoration: underline;
`;

export const Paragraph = styled.p`
  font-family: ${fontFamily};
  font-size: 1rem;
  font-weight: normal;
`;
