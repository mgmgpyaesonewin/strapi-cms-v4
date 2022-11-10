'use strict';

/**
 * wp-localization-android-content router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter =  createCoreRouter('api::wp-localization-android-content.wp-localization-android-content');
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
      path: '/wp-localization-android-content/key/:key',
      handler: 'wp-localization-android-content.findKey',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
  
  