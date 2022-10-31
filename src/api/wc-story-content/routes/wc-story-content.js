'use strict';

/**
 * wc-story-content router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter =  createCoreRouter('api::wc-story-content.wc-story-content');
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
        path: '/wc-story-contents/name/:name',
        handler: 'wc-story-content.filterByName',
        config: {
          policies: [],
          middlewares: [],
        },
    },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
