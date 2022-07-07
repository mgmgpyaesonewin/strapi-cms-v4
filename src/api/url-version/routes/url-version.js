'use strict';

/**
 * url-version router.
 */
const {createCoreRouter} = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::url-version.url-version');
const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/url-version/entity/:name',
    handler: 'url-version.findEntityByName',
    config: {
      policies: [],
      middlewares: [],
    },
  },

];
module.exports = customRouter(defaultRouter, myExtraRoutes);
