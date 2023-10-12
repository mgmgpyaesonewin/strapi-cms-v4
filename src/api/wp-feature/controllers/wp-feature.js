'use strict';

/**
 * wp-feature controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-feature.wp-feature', ({ strapi }) => ({
    async findFeature(ctx) {
        const { feature } = ctx.params;
        let content = await strapi.service('api::wp-feature.wp-feature').findByFeature(feature);
        console.log(content);
        return {
            'contents': content
        }
     }
}));

