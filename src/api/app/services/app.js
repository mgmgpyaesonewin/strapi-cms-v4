'use strict';

/**
 * app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app.app', ({ strapi }) => ({
    async find(ctx) {
        const entriesMiniAPP = await strapi.db.query('api::app.app').findMany({
            populate: {
                ["app_versions"]: {
                    select: ["version_name"],
                    populate: {
                        url: true,
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
    },
    async findToken(name) {
        const entriesMiniAPP = await strapi.db.query('api::app.app').findOne({
            where:{
                name: {
                    $containsi: name,
                },
            }
        });
        return entriesMiniAPP;
    }
}));
