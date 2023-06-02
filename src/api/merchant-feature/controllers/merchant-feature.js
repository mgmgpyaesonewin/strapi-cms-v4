'use strict';

/**
 * merchant-feature controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-feature.merchant-feature', ({ strapi }) => ({
    async findFeature(ctx) {
        const { feature } = ctx.params;
        let content = await strapi.service('api::merchant-feature.merchant-feature').findByFeature(feature);
        console.log(content);
        return {
            'contents': content
        }
     }
}));
