import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type SEOProps = {
  title?: string;
  description?: string;
};

const SEO: React.FC<SEOProps> = ({ title, description }: SEOProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <Helmet title={title || siteMetadata.title}>
      <html lang="en" />
      <meta
        name="description"
        content={description || siteMetadata.description}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"></meta>
    </Helmet>
  );
};

export default SEO;
