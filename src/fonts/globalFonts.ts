import { createGlobalStyle } from 'styled-components';

import bgrove from './bgrove.woff';

export default createGlobalStyle`
    @font-face {
        font-family: 'Blooming Grove';
        src: local('Blooming Grove'), local('BloomingGrove'),
        url(${bgrove}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;
