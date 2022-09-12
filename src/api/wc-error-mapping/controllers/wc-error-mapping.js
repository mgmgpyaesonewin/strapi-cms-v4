'use strict';

/**
 *  wc-error-mapping controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-error-mapping.wc-error-mapping', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.service('api::wc-error-mapping.wc-error-mapping').find(ctx);
    }
}));

