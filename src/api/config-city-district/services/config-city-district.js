'use strict';

/**
 * config-city-district service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-city-district.config-city-district', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::config-city-district.config-city-district').findMany({
            populate: {
                title: true,
                ["region"]: {
                    populate: {
                        title: true,
                    },
                    where: {
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                    select: ['name', 'code']
                },
                where: {
                    publishedAt: {
                        $notNull: true,
                    }
                }
            },
            select: ['name', 'code']
        });
    }
}));


