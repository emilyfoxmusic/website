import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  location?: Location;
};

type SiteMetadata = {
  title: string;
  siteUrl: string;
  image: string;
};

type SiteMetadataQuery = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  location,
}: SEOProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<SiteMetadataQuery>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            image
          }
        }
      }
    `
  );

  return (
    <Helmet
      title={title ? `${siteMetadata.title} | ${title}` : siteMetadata.title}>
      <html lang="en" />
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title ?? siteMetadata.title} />
      {description && <meta property="og:description" content={description} />}
      {siteMetadata.image && (
        <meta property="og:image" content={siteMetadata.image} />
      )}
      {location && (
        <meta
          property="og:url"
          content={`${siteMetadata.siteUrl}${location.pathname}`}
        />
      )}
      {location && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: siteMetadata.title,
                item: siteMetadata.siteUrl,
              },
              title && {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: `${siteMetadata.siteUrl}${location.pathname}`,
              },
            ].filter(item => !!item),
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
