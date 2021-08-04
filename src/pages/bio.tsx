import React from 'react';

import Layout from 'components/Layout';
import { Rose } from 'components/Rose';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';

const Bio: React.FC = () => (
  <Layout>
    <PageHeading>Bio</PageHeading>
    <p>
      Emily discovered the guitar at the age of 15 and never looked back. Before
      long she was entering a world of songwriting, music production, video
      editing and trying her hand at more instruments than you can shake a stick
      at.
    </p>
    <p>
      Some years on and she now has{' '}
      <TextLink href="https://emilyfoxmusic.bandcamp.com">
        three self-produced albums
      </TextLink>{' '}
      under her belt,{' '}
      <TextLink href="https://https://www.youtube.com/user/foxxemusic">
        over 100 YouTube videos
      </TextLink>{' '}
      on her channel, and even a performance at the Royal Albert Hall to her
      name.
    </p>
    <p>
      By day Emily is a software developer/tech lead for a UK-based software
      company.
    </p>
    <p>
      Business enquiries to:{' '}
      <TextLink href="mailto:emily@emilyfoxmusic.co.uk">
        emily@emilyfoxmusic.co.uk
      </TextLink>
    </p>
    <Rose />
  </Layout>
);

export default Bio;
