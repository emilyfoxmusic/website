// Load the environment variables, per
// https://www.gatsbyjs.org/docs/environment-variables/#server-side-nodejs
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'production'}`,
});

function checkEnv(envName) {
  if (
    typeof process.env[envName] === 'undefined' ||
    process.env[envName] === ''
  ) {
    throw new Error(`Missing required environment variables: ${envName}`);
  }
}

checkEnv('GATSBY_GOATCOUNTER_URL');
checkEnv('GATSBY_TWITCH_CLIENT_ID');
checkEnv('GATSBY_SITE_URL');
checkEnv('GATSBY_API_URL');
checkEnv('GATSBY_WEBSOCKET_URL');
checkEnv('GATSBY_TWITCH_CHANNEL');

/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: `Emily Fox Music`,
    siteUrl: 'http://www.emilyfoxmusic.co.uk',
    image: '/portrait.jpg',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Emily Fox Music`,
        short_name: `Emily Fox`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-resolve-src`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    `gatsby-plugin-fontawesome-css`,
  ],
};
