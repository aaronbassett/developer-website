const fs = require('fs');
const { appendTrailingSlash, stripTrailingSlash } = require('./src/utils/url');

const data = {};

exports.onCreateNode = async ({ node, getNodesByType }, pluginOptions) => {
  const {
    filterNode = () => false,
    getParams,
    getPath,
    pageLimit,
    engineKey,
  } = pluginOptions;

  if (!filterNode({ node })) {
    return;
  }

  const [
    {
      siteMetadata: { siteUrl },
    },
  ] = getNodesByType('Site');

  const params = getParams({ node });
  const pathname = getPath({ node });
  const url = new URL(pathname, siteUrl);

  const { page: pageFilters = {} } = params.filters || {};

  const allParams = {
    ...params,
    engine_key: engineKey,
    per_page: pageLimit,
    filters: {
      ...params.filters,
      page: {
        ...pageFilters,
        url: [
          `!${appendTrailingSlash(url)}`,
          `!${stripTrailingSlash(url)}`,
          ...(pageFilters.url || []),
        ],
      },
    },
  };

  data[pathname] = allParams;
};

exports.onPostBootstrap = (_, pluginOptions) => {
  const { file } = pluginOptions;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), { flag: 'w' });
};
