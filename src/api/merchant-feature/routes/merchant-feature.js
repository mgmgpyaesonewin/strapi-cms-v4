'use strict';

/**
 * merchant-feature router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::merchant-feature.merchant-feature');
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
        path: '/merchant-features/feature/:feature',
        handler: 'merchant-feature.findFeature',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];
module.exports = customRouter(defaultRouter, myExtraRoutes);
