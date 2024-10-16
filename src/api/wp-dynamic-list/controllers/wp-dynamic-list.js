'use strict';

/**
 *  wp-dynamic-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
      
        let dynamicList = await strapi.service('api::wp-dynamic-list.wp-dynamic-list').find(ctx);
        return dynamicList;

    },
    async dynamicList(ctx) {
        let region = await strapi.controller('api::config-region.config-region').addressForWP(ctx);
        let dynamicList = await strapi.service('api::wp-dynamic-list.wp-dynamic-list').findConfig(ctx);
        let notification = await strapi.controller('api::wp-notification.wp-notification').find(ctx);
        let merged = {...dynamicList, ...region,...notification};
        return merged;
    }
        
}));