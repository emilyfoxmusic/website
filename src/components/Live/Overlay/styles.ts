import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { fontFamily } from 'styles/fonts';

const SocialItem = styled.div`
  font-size: 18px;
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${fontFamily};

  animation: headeritem 120s infinite;

  @keyframes headeritem {
    0% {
      transform: translate3d(0px, -45px, 0px);
      opacity: 0;
    }
    2% {
      transform: translate3d(0px, 0px, 0px);
      opacity: 1;
    }
    18% {
      transform: translate3d(0px, 0px, 0px);
      opacity: 1;
    }
    20%,
    100% {
      transform: translate3d(0px, -45px, 0px);
      opacity: 0;
    }
  }
`;

export const Youtube = styled(SocialItem)``;

export const Instagram = styled(SocialItem)`
  animation-delay: -30s;
`;

export const Bandcamp = styled(SocialItem)`
  animation-delay: -60s;
`;

export const Website = styled(SocialItem)`
  animation-delay: -90s;
`;

export const SocialIcon = styled(FontAwesomeIcon)`
  height: 24px !important;
  width: 24px !important;
  margin-right: 8px;
`;

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;

export const BottomBar = styled.main`
  width: 100vw;
  background: black;
  position: absolute;
  bottom: 0;
  padding: 0;
  margin: 0;
  color: white;

  display: flex;
  justify-content: space-between;

  font-family: bloominggrove;
  font-size: 18px;
  line-height: 40px;

  &:first-child {
    margin-left: 12px;
  }
`;

export const Requests = styled.div`
  margin-left: 12px;
`;

export const BarLabel = styled.span`
  color: grey;
`;

export const BarValue = styled.span`
  margin-right: 12px;
`;

export const RequestIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
`;
