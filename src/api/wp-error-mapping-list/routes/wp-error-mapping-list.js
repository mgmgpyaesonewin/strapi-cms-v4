'use strict';

/**
 * wp-error-mapping-list router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::wp-error-mapping-list.wp-error-mapping-list');
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
        path: '/wp-error-mapping-list/version/:version',
        handler: 'wp-error-mapping-list.filterByVersion',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);

