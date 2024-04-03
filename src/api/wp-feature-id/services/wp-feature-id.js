'use strict';

/**
 * wp-feature-id service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-feature-id.wp-feature-id', ({ strapi }) => ({
    async findByFeatureId(featureId) {
        return await strapi.db.query('api::wp-feature-id.wp-feature-id').findOne({
            where: {
                feature_id: {
                    $eq: featureId,
                },
            },
            select: ["feature_id",'id']
        });

    }

}));
