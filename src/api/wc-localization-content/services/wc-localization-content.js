'use strict';

/**
 * wc-localization-content service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-localization-content.wc-localization-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wc-localization-content.wc-localization-content').findMany({
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
