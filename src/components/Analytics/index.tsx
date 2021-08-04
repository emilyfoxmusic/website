import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { init, count } from 'helpers/goatcounter';

type AnalyticsProps = {
  location: Location;
};

const Analytics: React.FC<AnalyticsProps> = ({ location }) => {
  const path = location.pathname;

  useEffect(() => {
    init({ no_onload: true, allow_local: true });
  }, []);

  useEffect(() => {
    // Allow time for the page header to update
    setTimeout(() => count({ path }), 50);
  }, [path]);

  return (
    <Helmet>
      <script
        data-goatcounter="https://emilyfoxmusic.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
    </Helmet>
  );
};

export default Analytics;
