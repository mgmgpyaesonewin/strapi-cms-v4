'use strict';

/**
 * merchant-qr controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-qr.merchant-qr', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.service('api::merchant-qr.merchant-qr').find(ctx);
    }
}));