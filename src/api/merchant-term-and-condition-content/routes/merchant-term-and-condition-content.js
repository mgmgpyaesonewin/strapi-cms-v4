'use strict';

/**
 * merchant-term-and-condition-content router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::merchant-term-and-condition-content.merchant-term-and-condition-content');
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
      path: "/merchant-term-and-condition-content/get-latest",
      handler: 'merchant-term-and-condition-content.getLatest',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
  
  