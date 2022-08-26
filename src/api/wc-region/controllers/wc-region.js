'use strict';

/**
 *  wc-region controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-region.wc-region', ({ strapi }) => ({
    
    async find(ctx) {
        let contents= await strapi.service('api::wc-region.wc-region').find(ctx);
        return {
            'township_data':contents
        }
    }
}));


