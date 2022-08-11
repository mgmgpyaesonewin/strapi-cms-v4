'use strict';

/**
 * wp-localization-content service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-localization-content.wp-localization-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wp-localization-content.wp-localization-content').findMany({
            populate: {
                value: true,
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['key', 'type']
        });
    }

}));
