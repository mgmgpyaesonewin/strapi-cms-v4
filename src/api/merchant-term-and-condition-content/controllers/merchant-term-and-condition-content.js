'use strict';

/**
 *  merchant-term-and-condition-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-term-and-condition-content.merchant-term-and-condition-content', ({strapi}) => ({
    async getLatest(ctx) {
        const data= await strapi.service('api::merchant-term-and-condition-content.merchant-term-and-condition-content').getLatestByPublishedAt(ctx);
        if(data){
          data.version = data.merchant_version.version;
          delete data.merchant_version;
        }
        return data;
      },
}));
