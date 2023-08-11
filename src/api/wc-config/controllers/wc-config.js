'use strict';

/**
 * wc-config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-config.wc-config', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.service('api::wc-config.wc-config').find(ctx);
    }
}));
