'use strict';

/**
 *  wp-localization-android-content controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-localization-android-content.wp-localization-android-content', ({ strapi }) => ({

    async find(ctx) {
        let contents = await strapi.service('api::wp-localization-android-content.wp-localization-android-content').find(ctx);
        return {
            'contents': contents
        }
    },
    async findKey(ctx) {
        const { key } = ctx.params;
        let content = await strapi.service('api::wp-localization-android-content.wp-localization-android-content').findByKey(key);
        return {
            'contents': content
        }
    }

}));

