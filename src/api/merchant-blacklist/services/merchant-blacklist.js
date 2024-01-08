"use strict";

/**
 * merchant-blacklist service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::merchant-blacklist.merchant-blacklist",
  ({ strapi }) => ({
    async findOne(key) {
      return await strapi.db
        .query("api::merchant-blacklist.merchant-blacklist")
        .findOne({
          where: {
            key: {
              $eq: key,
            },
          },

          select: ["key", "value"],
        });
    },
  })
);
