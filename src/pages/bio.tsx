import React from 'react';

import Layout from 'components/Layout';
import { Rose } from 'components/Rose';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';
import { bandcamp, youtube, emailAddress } from 'utils/links';

const Bio: React.FC = () => (
  <Layout>
    <SEO title="Emily Fox Music | Bio" />
    <PageHeading>Bio</PageHeading>
    <p>
      Emily discovered the guitar at the age of 15 and never looked back. Before
      long she was entering a world of songwriting, music production, video
      editing and trying her hand at more instruments than you can shake a stick
      at.
    </p>
    <p>
      Some years on and she now has{' '}
      <TextLink href={bandcamp}>two self-produced albums</TextLink> under her
      belt, (and a third to be released shortly!),{' '}
      <TextLink href={youtube}>over 100 YouTube videos</TextLink> on her
      channel, and even a performance at the Royal Albert Hall to her name.
    </p>
    <p>
      By day Emily is a software developer/tech lead for a UK-based software
      company.
    </p>
    <p>
      Business enquiries to:{' '}
      <TextLink href={`mailto:${emailAddress}`} aria-label="send an email">
        {emailAddress}
      </TextLink>
    </p>
    <Rose />
  </Layout>
);

export default Bio;
