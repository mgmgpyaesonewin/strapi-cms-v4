'use strict';

/**
 * merchant-localization-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-localization-content.merchant-localization-content', ({ strapi }) => ({
    
    async find(ctx) {
        let contents= await strapi.service('api::merchant-localization-content.merchant-localization-content').find(ctx);
        return {
            'contents':contents
        }
    },
    async findKey(ctx) {
        const { key } = ctx.params;
        let content = await strapi.service('api::merchant-localization-content.merchant-localization-content').findByKey(key);
        return {
            'contents': content
        }
    }

}));
