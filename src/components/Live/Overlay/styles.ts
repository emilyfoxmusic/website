import styled from 'styled-components';

import { Rose } from 'components/Rose';

export const PageContainer = styled.main`
  margin: 16px;
`;

export const Table = styled.table`
  font-family: Blooming Grove;
  text-align: left;
  width: 550px;

  & tbody > tr:first-child {
    font-size: 1.5rem;
    & td {
      padding-bottom: 16px;
    }
  }

  & td,
  & th {
    padding: 4px 12px;
  }
`;

export const SectionHeading = styled.h2`
  font-size: 0.8rem;
  font-family: arial;
  margin: 0;
`;

export const HeadingRow = styled.tr`
  color: gray;
  font-size: 0.8rem;
  font-family: arial;

  & th {
    padding-bottom: 0;
  }
`;

export const OverlayRose = styled(Rose)`
  position: absolute;
  right: 32px;
  top: 32px;
`;
