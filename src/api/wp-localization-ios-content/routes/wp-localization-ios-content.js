'use strict';

/**
 * wp-localization-ios-content router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-localization-ios-content.wp-localization-ios-content');
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
      path: '/wp-localization-ios-contents/key/:key',
      handler: 'wp-localization-ios-content.findKey',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
  
  