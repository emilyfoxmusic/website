import { PageProps } from 'gatsby';
import React from 'react';

import Header from 'components/Header';
import { PageContainer } from 'components/Layout/styles';
import Links from 'components/Links';
import SEO from 'components/SEO';

const LinksPage: React.FC<PageProps> = ({ location }) => {
  return (
    <>
      <SEO title="Links" location={location} hideFromCrawlers />
      <Header />
      <PageContainer>
        <Links
          customLinks={[
            {
              href: '/',
              title: 'Website',
              icon: 'globe',
              description: 'The central hub for everything Emily Fox Music.',
            },
          ]}
        />
      </PageContainer>
    </>
  );
};

export default LinksPage;
