'use strict';

/**
 *  wp-error-mapping-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-error-mapping-list.wp-error-mapping-list', ({ strapi }) => ({

    async find(ctx) {
        return await strapi.service('api::wp-error-mapping-list.wp-error-mapping-list').find(ctx);
    },
    async filterByVersion(ctx) {
       
        let {version} = ctx.params;
       return await strapi.service('api::wp-error-mapping-list.wp-error-mapping-list').filterByVersion(version);
        
      },
}));


