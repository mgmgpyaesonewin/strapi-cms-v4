'use strict';

/**
 * merchant-cash-out controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-cash-out.merchant-cash-out'

, ({ strapi }) => ({
    
    async find(ctx) {
        let expiredDuration= await strapi.service('api::merchant-cash-out.merchant-cash-out').find(ctx);
        return expiredDuration;
    },
})

);
