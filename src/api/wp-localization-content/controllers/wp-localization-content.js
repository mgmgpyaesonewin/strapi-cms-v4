'use strict';

/**
 * wp-localization-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-localization-content.wp-localization-content', ({ strapi }) => ({
    
    async find(ctx) {
        let contents= await strapi.service('api::wp-localization-content.wp-localization-content').find(ctx);
        return {
            'contents':contents
        }
    },
    async findKey(ctx) {
        const { key } = ctx.params;
        let content = await strapi.service('api::wp-localization-content.wp-localization-content').findByKey(key);
        return {
            'contents': content
        }
    }

}));
