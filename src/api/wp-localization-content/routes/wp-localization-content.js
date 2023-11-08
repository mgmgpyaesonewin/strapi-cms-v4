'use strict';

/**
 * wp-localization-content router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-localization-content.wp-localization-content');
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
        path: '/wp-localization-contents/key/:key',
        handler: 'wp-localization-content.findKey',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];
module.exports = customRouter(defaultRouter, myExtraRoutes);