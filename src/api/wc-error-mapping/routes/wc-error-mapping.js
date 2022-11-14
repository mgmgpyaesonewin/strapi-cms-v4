'use strict';

/**
 * wc-error-mapping router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::wc-error-mapping.wc-error-mapping');
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
        path: '/wc-error-mapping/version/:version',
        handler: 'wc-error-mapping.filterByVersion',
        config: {
            policies: [],
            middlewares: [],
        },
    },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);

