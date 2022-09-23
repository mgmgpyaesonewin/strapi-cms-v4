"use strict";

/**
 * wc-error-mapping service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::wc-error-mapping.wc-error-mapping",({ strapi }) => ({
        async find(ctx) {
            return await strapi.db.query("api::wc-error-mapping.wc-error-mapping").findMany({
                populate: {
                    ["wc_app_version"]: {
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
            return await strapi.db.query("api::wc-error-mapping.wc-error-mapping").findOne({
                where: {
                    $and: [
                        {
                            wc_app_version: {
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
