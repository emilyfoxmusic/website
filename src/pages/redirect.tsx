import { PageProps } from 'gatsby';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SEO from 'components/SEO';
import { AUTHENTICATE, AuthenticateAction } from 'state/user/actions';

const Redirect: React.FC<PageProps> = ({ location }) => {
  const dispatch = useDispatch<Dispatch<AuthenticateAction>>();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      const payload = {
        type: 'REFRESH_AUTHENTICATION',
        code,
        state,
      };
      if (window === window.top) {
        dispatch({ type: AUTHENTICATE, payload });
      } else {
        window.parent.postMessage(payload, process.env.GATSBY_SITE_URL ?? '');
      }
    }
  }, [dispatch, location.search]);

  return (
    <>
      <SEO title="Redirect" location={location} hideFromCrawlers />
    </>
  );
};

export default Redirect;
