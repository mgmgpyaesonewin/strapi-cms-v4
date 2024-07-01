"use strict";

/**
 * wp-landing-page service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::wp-landing-page.wp-landing-page",
  ({ strapi }) => ({
    async find(ctx) {
      return await strapi.db
        .query("api::wp-landing-page.wp-landing-page")
        .findMany({
          populate: {
            title: true,
            ["image"]: {
              select: ["url"],
            },
            ["logo"]: {
              select: ["url"],
            },
            ["icon"]: {
              select: ["url"],
            },
          },
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          select: [
            "name",
            "position",
            "autoPlay",
            "autoPlaySpeed",
            "toColor",
            "fromColor",
            "gbColor",
          ],
          orderBy: {
            position: "asc",
          },
        });
    },
  })
);
