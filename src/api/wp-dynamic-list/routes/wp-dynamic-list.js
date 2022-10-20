'use strict';

/**
 * wp-dynamic-list router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-dynamic-list.wp-dynamic-list');
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
        path: '/wp-dynamic-list/dynamic',
        handler: 'wp-dynamic-list.dynamicList',
        config: {
          policies: [],
          middlewares: [],
        },
    },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);