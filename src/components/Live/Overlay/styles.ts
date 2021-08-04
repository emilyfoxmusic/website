import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { mediumRed } from 'styles/colors';
import { fontFamily } from 'styles/fonts';

export const PageContainer = styled.main`
  max-width: 550px;

  background: black;
  color: white;
  padding: 12px 16px;

  border-radius: 0 8px 0 0;
  position: absolute;
  left: 0;
  bottom: 0;

  border-top: solid white 1px;
  border-right: solid white 1px;
`;

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;

export const UnderlinedTextWithMargin = styled(UnderlinedText)`
  margin: 0 10px;
`;

const HeaderItem = styled.div`
  font-size: 1.5rem;
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${fontFamily};

  animation: headeritem 30s infinite;

  @keyframes headeritem {
    0% {
      transform: translate3d(0px, -45px, 0px);
      opacity: 0;
    }
    5% {
      transform: translate3d(0px, 0px, 0px);
      opacity: 1;
    }
    35% {
      transform: translate3d(0px, 0px, 0px);
      opacity: 1;
    }
    40%,
    100% {
      transform: translate3d(0px, -45px, 0px);
      opacity: 0;
    }
  }
`;

export const RequestStatus = styled(HeaderItem)`
  animation-delay: 15s;
`;

export const RequestIcon = styled(FontAwesomeIcon)`
  stroke: black;
  stroke-width: 32px;
`;

export const Social = styled(HeaderItem)``;

export const SocialIcon = styled(FontAwesomeIcon)`
  height: 32px !important;
  width: 32px !important;
  margin-right: 8px;
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
