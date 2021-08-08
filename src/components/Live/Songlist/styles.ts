import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from 'components/Button';
import { TableHeaderCell } from 'components/Table';
import { largeBreakpoint } from 'helpers/breakpoints';
import { yellow } from 'styles/colors';

export const UnderConstructionBanner = styled.p`
  background: ${yellow};
  border-radius: 16px;
  border: black solid 2px;

  padding: 16px;

  ${largeBreakpoint`
    padding: 16px 24px;
  `}

  & svg {
    margin-left: 2px;
    margin-right: 16px;
  }
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

  margin-bottom: 64px;
`;

export const TableControls = styled.div`
  display: block;

  ${largeBreakpoint`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
  `}

  min-height: 76px;
`;

export const SelectWithMargin = styled.select`
  margin-left: 16px;
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
  margin-right: 16px;
`;

export const TwitchLoginButton = styled(Button).attrs({
  type: 'button',
})`
  margin-top: 0;
  text-align: left;

  ${largeBreakpoint`
    margin-bottom: 24px;
  `}
`;
