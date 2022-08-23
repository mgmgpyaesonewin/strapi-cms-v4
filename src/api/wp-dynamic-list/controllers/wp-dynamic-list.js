'use strict';

/**
 *  wp-dynamic-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        let region = await strapi.service('api::config-region.config-region').find(ctx);
        let dynamicList = await strapi.service('api::wp-dynamic-list.wp-dynamic-list').find(ctx);
        dynamicList.township_data = region
        return dynamicList;

    }
        

}));
