'use strict';

/**
 * wp-feature-id controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-feature-id.wp-feature-id', ({
    async findFeatureId(ctx) {
        const { featureId } = ctx.params;
        let content = await strapi.service('api::wp-feature-id.wp-feature-id').findByFeatureId(featureId);
        console.log(content);
        return {
            'contents': content
        }
     }
}));
