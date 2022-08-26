'use strict';

/**
 *  wc-dynamic-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wc-dynamic-list.wc-dynamic-list', ({ strapi }) => ({

    async find(ctx) {
        let region = await strapi.service('api::wc-region.wc-region').find(ctx);
       
        let dynamicList = await strapi.service('api::wc-dynamic-list.wc-dynamic-list').find(ctx);
        dynamicList.township_data = region
        return dynamicList;

    }


}));


