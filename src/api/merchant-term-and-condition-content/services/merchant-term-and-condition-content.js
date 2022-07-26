'use strict';

/**
 * merchant-term-and-condition-content service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-term-and-condition-content.merchant-term-and-condition-content', ({ strapi }) => ({
    async getLatestByPublishedAt(ctx) {
        return await strapi.db.query('api::merchant-term-and-condition-content.merchant-term-and-condition-content').findOne({
            populate: {
                title: true,
                content: true,
                ['merchant_version']: {
                    select: ['version'],
                },
            },
            where: {
                $and: [
                    {
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                    {
                        merchant_version: {
                            publishedAt: {
                                $notNull: true,
                            },
                        }
                    },
                ],
            },
            orderBy: { publishedAt: 'desc' },
            select: ['id', 'en', 'my']
        });
    },

}));

