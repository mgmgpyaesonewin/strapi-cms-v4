'use strict';

/**
 * merchant-feature service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-feature.merchant-feature', ({ strapi }) => ({
    async findFeature(ctx) {
        const { feature } = ctx.params;
        let content = await strapi.service('api::merchant-feature.merchant-feature').findByFeature(feature);
        console.log(content);
        return {
            'contents': content
        }
     },
     async findByFeature(feature) {
        
        return await strapi.db.query('api::merchant-feature.merchant-feature').findOne({
            where: {
                feature: {
                    $eq: feature,
                },
            },
            select: [ 'feature','id']
        });

    }
}));

