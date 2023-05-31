'use strict';

/**
 * wp-feature router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-feature.wp-feature');
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
        path: '/wp-features/feature/:feature',
        handler: 'wp-feature.findFeature',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];
module.exports = customRouter(defaultRouter, myExtraRoutes);