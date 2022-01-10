exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: '/contact/',
    toPath: '/links/',
    statusCode: 301,
  });
};
