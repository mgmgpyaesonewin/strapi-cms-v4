'use strict';

/**
 *  wp-localization-ios-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-localization-ios-content.wp-localization-ios-content', ({ strapi }) => ({

    async find(ctx) {
        let contents = await strapi.service('api::wp-localization-ios-content.wp-localization-ios-content').find(ctx);
        return {
            'contents': contents
        }
    },
    async findKey(ctx) {
        const { key } = ctx.params;
        let content = await strapi.service('api::wp-localization-ios-content.wp-localization-ios-content').findByKey(key);
        return {
            'contents': content
        }
    }

}));

