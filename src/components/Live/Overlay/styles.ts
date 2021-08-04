import styled from 'styled-components';

export const PageContainer = styled.main`
  margin: 16px;
  max-width: 700px;
`;

export const Table = styled.table`
  border-radius: 8px;
  font-family: Blooming Grove;
  text-align: left;

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
