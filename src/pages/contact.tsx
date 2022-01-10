import { PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { StandardLayout } from 'components/Layout';
import Links from 'components/Links';
import SEO from 'components/SEO';
import { PageHeading } from 'components/Typography';

const MaxWidthContainer = styled.div`
  max-width: 550px;
  margin: auto;
  text-align: center;
`;

const Contact: React.FC<PageProps> = ({ location }) => (
  <StandardLayout>
    <SEO
      title="Contact"
      description="Contact details and social media links for Emily Fox Music."
      location={location}
    />
    <MaxWidthContainer>
      <PageHeading>Contact</PageHeading>
      <Links showDescriptions />
    </MaxWidthContainer>
  </StandardLayout>
);

export default Contact;
