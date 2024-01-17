"use strict";

/**
 * wc-faq-list service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::wc-faq-list.wc-faq-list",
  ({ strapi }) => ({
    async find(ctx) {
      return await strapi.db.query("api::wc-faq-list.wc-faq-list").findMany({
        populate: {
          ["title"]: {
            select: ["en", "my", "zw"],
          },
          ["content"]: {
            select: ["en", "my", "zw"],
          },
        },
        where: {
          publishedAt: {
            $notNull: true,
          },
        },
        select: ["id"],
      });
    },
  })
);
