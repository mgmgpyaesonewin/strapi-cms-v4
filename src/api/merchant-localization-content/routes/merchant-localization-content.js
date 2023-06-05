'use strict';

/**
 * merchant-localization-content router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter =  createCoreRouter('api::merchant-localization-content.merchant-localization-content');
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
      path: '/merchant-localization-contents/key/:key',
      handler: 'merchant-localization-content.findKey',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
