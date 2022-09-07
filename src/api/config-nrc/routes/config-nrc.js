'use strict';

/**
 * config-nrc router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::config-nrc.config-nrc');
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
        path: '/config-nrc/merchant',
        handler: 'config-nrc.merchantNRC',
        config: {
          policies: [],
          middlewares: [],
        },
    },
    {
      method: 'GET',
      path: '/config-nrc/wp',
      handler: 'config-nrc.wpNRC',
      config: {
        policies: [],
        middlewares: [],
      },
  },
  {
    method: 'GET',
    path: '/config-nrc/wc',
    handler: 'config-nrc.wcNRC',
    config: {
      policies: [],
      middlewares: [],
    },
},
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
