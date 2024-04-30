'use strict';

/**
 * wp-feature-id router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-feature-id.wp-feature-id');
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
        path: '/wp-feature-ids/featureId/:featureId',
        handler: 'wp-feature-id.findFeatureId',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];
module.exports = customRouter(defaultRouter, myExtraRoutes);
