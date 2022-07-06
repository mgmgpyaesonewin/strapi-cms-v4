'use strict';

/**
 * wp-promotion router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-promotion.wp-promotion');
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
        path: '/wp-promotion/categories/:id',
        handler: 'wp-promotion.filterByCategory',
        config: {
          policies: [],
          middlewares: [],
        },
    },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
