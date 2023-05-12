'use strict';

/**
 * app router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::app.app');
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
    path: '/apps/getToken/:name',
    handler: 'app.getToken',
    config: {
      policies: [],
      middlewares: [],
    },
  },

];
module.exports = customRouter(defaultRouter, myExtraRoutes);
