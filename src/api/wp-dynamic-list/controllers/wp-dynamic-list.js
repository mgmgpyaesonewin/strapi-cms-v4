'use strict';

/**
 *  wp-dynamic-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.service('api::wp-dynamic-list.wp-dynamic-list').find(ctx);
    }

}));


