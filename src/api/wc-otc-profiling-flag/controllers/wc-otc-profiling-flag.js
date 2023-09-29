'use strict';

/**
 * wc-otc-profiling-flag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-otc-profiling-flag.wc-otc-profiling-flag', ({ strapi }) => ({
    
    async find(ctx) {
        let data= await strapi.service('api::wc-otc-profiling-flag.wc-otc-profiling-flag').find(ctx);
        return {
            'data':data
        }
    }

}));

