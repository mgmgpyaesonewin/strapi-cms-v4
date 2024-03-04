"use strict";

/**
 * merchant-blacklist controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::merchant-blacklist.merchant-blacklist",
  ({ strapi }) => ({
    async find(ctx) {
      return await strapi
        .service("api::merchant-blacklist.merchant-blacklist")
        .find(ctx);
    },
    async findOne(ctx) {
      const { id } = ctx.params;
      return await strapi
        .service("api::merchant-blacklist.merchant-blacklist")
        .findOne(id);
    },
  })
);
