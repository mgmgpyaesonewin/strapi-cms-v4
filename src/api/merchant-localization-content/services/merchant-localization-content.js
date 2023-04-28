'use strict';

/**
 * merchant-localization-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-localization-content.merchant-localization-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::merchant-localization-content.merchant-localization-content').findMany({
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
    },
    async findByKey(key) {
        return await strapi.db.query('api::merchant-localization-content.merchant-localization-content').findOne({
            where: {
                key: {
                    $eq: key,
                },
            },
            populate: {
                value: true,
            },
            select: ['type', 'key']
        });

    },

}));
