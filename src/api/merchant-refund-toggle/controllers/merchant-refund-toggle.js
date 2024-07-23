'use strict';

/**
 * merchant-refund-toggle controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-refund-toggle.merchant-refund-toggle', ({ strapi }) => ({

    async find(ctx) {
        let contents = await strapi.service('api::merchant-refund-toggle.merchant-refund-toggle').find(ctx);
        return {
            "is_refund_enabled": contents
        };
    }
}));