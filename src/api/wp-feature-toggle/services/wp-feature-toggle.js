'use strict';

/**
 * wp-feature-toggle service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-feature-toggle.wp-feature-toggle', ({ strapi }) => ({
    
    async find(ctx) {
        return await strapi.db.query('api::wp-feature-toggle.wp-feature-toggle').findMany({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['id','key', 'value']
        });
    }
}));

