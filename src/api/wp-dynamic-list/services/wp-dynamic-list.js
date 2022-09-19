'use strict';

/**
 * wp-dynamic-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-dynamic-list.wp-dynamic-list', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.entityService.findMany('api::wp-dynamic-list.wp-dynamic-list', {
            populate: 'deep',
            publicationState: 'live',
        });
    },
    async findConfig(ctx) {
        return await strapi.db.query('api::wp-dynamic-list.wp-dynamic-list').findOne({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select:[
                ['poi_types']
            ]
        });
    }

}));