import styled from 'styled-components';

import LiveHeader from 'components/LiveHeader';
import { mediumRed } from 'styles/colors';

export const PageContainer = styled.main`
  width: 550px;

  background: black;
  color: white;
  padding: 12px 16px;

  border-radius: 0 8px 0 0;
  position: absolute;
  left: 0;
  bottom: 0;

  border-top: solid white 4px;
`;

export const SmallRequestHeader = styled(LiveHeader)`
  display: block;
  right: unset;
  border-radius: 0 0 8px 0;
  padding: 12px 16px;
  font-weight: bold;

  border-right: solid white 4px;
  // border-bottom: solid white 4px;

`;

export const Table = styled.table`
  font-family: Blooming Grove;
  text-align: left;
  font-weight: bold;

  & tbody > tr:first-child {
    font-size: 1.5rem;
  }

  & td,
  & th {
    padding: 0 16px 4px 0;
  }
`;

export const SectionHeading = styled.h2`
  font-size: 0.8rem;
  font-family: arial;
  margin: 0;
  color: gray;

  text-decoration: underline;
`;

export const HeadingRow = styled.tr`
  font-size: 0.8rem;
  font-family: arial;
  color: ${mediumRed};
`;
