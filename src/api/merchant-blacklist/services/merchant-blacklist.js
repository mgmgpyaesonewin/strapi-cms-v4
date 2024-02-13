"use strict";

/**
 * merchant-blacklist service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::merchant-blacklist.merchant-blacklist",
  ({ strapi }) => ({
    async findOne(id) {
      return await strapi.db
        .query("api::merchant-blacklist.merchant-blacklist")
        .findOne({
          where: {
            $and: [
              {
                key: {
                  $eq: id,
                },
              },
              {
                publishedAt: {
                  $notNull: true,
                },
              },
            ],
          },

          select: ["key", "value"],
        });
    },

    async find(key) {
      return await strapi.db
        .query("api::merchant-blacklist.merchant-blacklist")
        .findMany({
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          select: ["key", "value"],
        });
    },
  })
);
