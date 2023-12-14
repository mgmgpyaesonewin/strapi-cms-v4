"use strict";

/**
 * merchant-qr service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
    "api::merchant-qr.merchant-qr",
    ({ strapi }) => ({
        async find(ctx) {
            return await strapi.entityService.findMany(
                "api::merchant-qr.merchant-qr", {
                    publicationState: "live",
                    fields: ["minimum_amount", "maximum_amount", "use_mmpay_qr_design"],
                }
            );
        },
    })
);
