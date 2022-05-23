'use strict';

/**
 * promotion router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::promotion.promotion');
// module.exports = createCoreRouter('api::promotion.promotion');
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
        path: '/promotions/categories/:id',
        handler: 'promotion.indexTest',
        config: {
          policies: [],
          middlewares: [],
        },
    },
    {
      method: 'GET',
      path: '/promotions/categories/:id',
      handler: 'promotion.indexTest',
      config: {
        policies: [],
        middlewares: [],
      },
  }
  ];
//   module.exports = {
//   defaultRouter,
//   myExtraRoutes,
// };
// module.exports = {defaultRouter,myExtraRoutes};
  //module.exports = (defaultRouter, myExtraRoutes);
  module.exports = customRouter(defaultRouter, myExtraRoutes);