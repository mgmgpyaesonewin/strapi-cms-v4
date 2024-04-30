'use strict';

/**
 * wp-reject-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-reject-list.wp-reject-list', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wp-reject-list.wp-reject-list').findMany({
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['code', 'field_enum']
        });
    }
}));
