"use strict";

/**
 * wp-tooltip service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::wp-tooltip.wp-tooltip",
  ({ strapi }) => ({
    async find(ctx) {
      let firstJson = await strapi.db
        .query("api::wp-tooltip.wp-tooltip")
        .findMany({
          populate: {
            title: true,
            ["icon"]: {
              select: ["url"],
            },
            description: true,
            ["wp_app_version_lists"]: {
              select: ["version_code", "version_name"],
            },
          },
          where: {
            $and: [
              {
                wp_app_version_lists: {
                  version_code: ctx.query.versionCode,
                },
              },
              {
                publishedAt: {
                  $notNull: true,
                },
              },
            ],
          },
          select: ["name", "position", "id"],
        });

      return {
        data: firstJson,
      };
    },
  })
);
