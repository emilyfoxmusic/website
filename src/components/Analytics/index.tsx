import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

type AnalyticsProps = {
  location: Location;
};

const Analytics: React.FC<AnalyticsProps> = ({ location }) => {
  const path = location.pathname;

  useEffect(() => {
    const registerPageVisit = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gc = (window as any).goatcounter;

      if (gc && gc.count) {
        gc.bind_events();
        gc.count({ path, title: path });
      } else {
        setTimeout(registerPageVisit, 1000);
      }
    };

    registerPageVisit();
  }, [path]);

  return (
    <Helmet>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: 'window.goatcounter = { no_onload: true }',
        }}
      />
      <script
        data-goatcounter="https://emilyfoxmusicdev.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
    </Helmet>
  );
};

export default Analytics;
