import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { StandardLayout } from 'components/Layout';
import LinksComponent from 'components/Links';
import SEO from 'components/SEO';
import { PageHeading } from 'components/Typography';

const MaxWidthContainer = styled.div`
  max-width: 550px;
  margin: auto;
  text-align: center;
`;

const Links: React.FC<PageProps> = ({ location }) => (
  <StandardLayout>
    <SEO
      title="Contact"
      description="Social media links and contact details for Emily Fox Music."
      location={location}
    />
    <MaxWidthContainer>
      <PageHeading>Links</PageHeading>
      <LinksComponent showDescriptions />
    </MaxWidthContainer>
  </StandardLayout>
);

export default Links;
