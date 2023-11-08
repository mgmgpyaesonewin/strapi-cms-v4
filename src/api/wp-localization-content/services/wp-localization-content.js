'use strict';

/**
 * wp-localization-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-localization-content.wp-localization-content', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::wp-localization-content.wp-localization-content').findMany({
            populate: {
                value: true,
                ["wp_feature"]: {
                    select: ["id", "feature"],
                },
            },
            where: {
                $and: [
                    {
                        publishedAt: {
                            $notNull: true,
                        },
                    }, {
                        wp_feature: {
                            publishedAt: {
                                $notNull: true,
                            },
                        }
                    }
                ]
            },
            orderBy: {
                wp_feature: {
                    feature: 'asc',
                },
            },
            select: ['key', 'type']
        });
    },
    async findByKey(key) {
        return await strapi.db.query('api::wp-localization-content.wp-localization-content').findOne({
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
