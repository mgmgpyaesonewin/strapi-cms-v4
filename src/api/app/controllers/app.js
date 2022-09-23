'use strict';

/**
 *  app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app.app', ({ strapi }) => ({
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
