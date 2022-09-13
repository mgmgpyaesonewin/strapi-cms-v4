'use strict';

/**
 * wp-error-mapping-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-error-mapping-list.wp-error-mapping-list',({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query("api::wp-error-mapping-list.wp-error-mapping-list").findMany({
            populate: {
                ["wp_app_version_list"]: {
                    select: ["version_name", "version_code"],
                },
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ["ekyc"],
        });
    },
    async filterByVersion(version) {
        return await strapi.db.query("api::wp-error-mapping-list.wp-error-mapping-list").findOne({
            where: {
                $and: [
                    {
                        wp_app_version_list: {
                            version_code: version,
                        },
                    },
                    {
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                ],
            },
            select: ["ekyc"],
        });
    },
})
);

