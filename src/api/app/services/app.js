'use strict';

/**
 * app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app.app', ({ strapi }) => ({
    async find(ctx) {
        const entriesMiniAPP = await strapi.db.query('api::app.app').findMany({
            populate: {
                ["app_urls"]: {
                    select: ["url"],
                    populate: {
                        model: true,
                    },
                },
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
        });
        return entriesMiniAPP;
    }
}));
