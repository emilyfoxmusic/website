import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { TableHeaderCell } from 'components/Table';
import { largeBreakpoint } from 'helpers/breakpoints';
import { fontFamily } from 'styles/fonts';

export const FormHeading = styled.h2`
  font-family: ${fontFamily};
  font-weight: bold;
  text-align: left;

  font-size: 1rem;
  line-height: 1rem;

  margin: 0 0 24px;

  ${largeBreakpoint`
    font-size: 1.5rem;
    line-height: 1.5rem;

    margin: 0 0 32px;
  `}
`;

export const XLargeBreakpointOnlyHeaderCell = styled(TableHeaderCell)`
  display: none;

  @media (min-width: 1000px) {
    display: table-cell;
  }
`;

export const XLargeBreakpointOnlyCell = styled.td`
  display: none;

  @media (min-width: 1000px) {
    display: table-cell;
  }
`;

export const TableBlock = styled.div`
  width: min(90vw, 1400px);
  position: relative;
  left: calc((min(90vw, 1400px)) * -0.5 + 50%);
`;

export const SecretAdminSection = styled.section`
  border: dotted black 5px;
  padding: 32px;
  border-radius: 16px;
  margin-top: 32px;
`;

export const Label = styled.label`
  display: block;
  margin: 24px 0 8px;
`;

export const FullWidthInput = styled.input`
  width: 100%;
  box-sizing: border-box;
`;

export const SubmitSongButton = styled.button`
  display: block;
  margin: 40px 0 8px;
  padding: 4px 32px;
`;

export const VisuallyHiddenSortText = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const TwitchIcon = styled(FontAwesomeIcon).attrs({
  icon: ['fab', 'twitch'],
  'aria-hidden': true,
})`
  margin-right: 8px;
`;
