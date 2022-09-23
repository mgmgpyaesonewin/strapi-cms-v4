'use strict';

/**
 * wp-help-and-support service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-help-and-support.wp-help-and-support', ({ strapi }) => ({

    async getLatestStoryHelp(ctx) {
        return await strapi.db.query('api::wp-help-and-support.wp-help-and-support').findOne({
            populate: {
                title: true,
                description: true,
            },
            where: {
                $and: [
                    {
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                    {
                        type: 'standard',
                    },
                ],
            },
            orderBy: { publishedAt: 'desc' },
            select: ['id']
        });
    },

    async find(ctx) {
        return await strapi.db.query('api::wp-help-and-support.wp-help-and-support').findMany({
            populate: {
                title: true,
                description: true,
                ["image"]:{
                    select : ['url']
                }
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            orderBy: { position: 'asc' },
            select: ['id','position','type']
        });

    }

}));

