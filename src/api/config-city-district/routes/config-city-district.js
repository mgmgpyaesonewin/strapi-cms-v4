'use strict';

/**
 * config-city-district router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::config-city-district.config-city-district');
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
      path: '/config-city-district/findByCode/:name',
      handler: 'config-city-district.findDistrictByCode',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ];
  
  module.exports = customRouter(defaultRouter, myExtraRoutes);
  
