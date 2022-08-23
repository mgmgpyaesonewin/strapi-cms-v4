'use strict';

/**
 *  config-region controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config-region.config-region', ({ strapi }) => ({
    
    async find(ctx) {
        let contents= await strapi.service('api::config-region.config-region').find(ctx);
        return {
            'township_data':contents
        }
    }
}));

