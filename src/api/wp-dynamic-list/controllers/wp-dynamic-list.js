'use strict';

/**
 *  wp-dynamic-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        let dynamicList = await strapi.service('api::wp-dynamic-list.wp-dynamic-list').find(ctx);
        let occupation = await strapi.controller('api::wp-occupation-list.wp-occupation-list').find(ctx);
        let merged = {...dynamicList,...occupation};
        return merged;

    }
        

}));
