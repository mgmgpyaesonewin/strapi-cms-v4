'use strict';

/**
 * wp-term-and-condition router.
 */

const {createCoreRouter} = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-term-and-condition.wp-term-and-condition');
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
    path: "/wp-term-and-conditions/version/get",
    handler: 'wp-term-and-condition.version',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);

