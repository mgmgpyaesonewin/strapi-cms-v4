'use strict';

/**
 * wp-localization-ios-content service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-localization-ios-content.wp-localization-ios-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wp-localization-ios-content.wp-localization-ios-content').findMany({
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

