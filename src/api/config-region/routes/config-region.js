'use strict';

/**
 * config-region router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::config-region.config-region');
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
    path: '/config-region/merchant',
    handler: 'config-region.addressForMerchant',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/config-region/wp',
    handler: 'config-region.addressForWP',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/config-region/wc',
    handler: 'config-region.addressForWC',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/config-region/findByCode/:name',
    handler: 'config-region.findRegionByCode',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
