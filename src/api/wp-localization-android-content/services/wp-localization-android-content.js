'use strict';

/**
 * wp-localization-android-content service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-localization-android-content.wp-localization-android-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wp-localization-android-content.wp-localization-android-content').findMany({
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
