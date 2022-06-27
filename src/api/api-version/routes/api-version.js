'use strict';

/**
 * api-version router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::api-version.api-version');
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
        path: '/api-versions/entity/:name',
        handler: 'api-version.findEntityByName',
        config: {
          policies: [],
          middlewares: [],
        },
    },
    
  ];
  module.exports = customRouter(defaultRouter, myExtraRoutes);
