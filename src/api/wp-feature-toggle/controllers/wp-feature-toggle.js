'use strict';

/**
 * wp-feature-toggle controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-feature-toggle.wp-feature-toggle', ({ strapi }) => ({
    
    async find(ctx) {
        let data= await strapi.service('api::wp-feature-toggle.wp-feature-toggle').find(ctx);
        return {
            'data':data
        }
    }

}));

