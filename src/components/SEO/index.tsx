import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  location?: Location;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  location,
}: SEOProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            url
          }
        }
      }
    `
  );

  return (
    <Helmet title={title ? `Emily Fox Music | ${title}` : siteMetadata.title}>
      <html lang="en" />
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {location && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Emily Fox Music',
                item: siteMetadata.url,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: `${siteMetadata.url}${location.pathname}`,
              },
            ],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
