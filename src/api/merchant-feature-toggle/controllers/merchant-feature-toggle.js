"use strict";

/**
 * merchant-feature-toggle controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::merchant-feature-toggle.merchant-feature-toggle",({ strapi }) => ({
    async find(ctx) {
      let data = await strapi.service("api::merchant-feature-toggle.merchant-feature-toggle").find(ctx);
      return {
        data: data,
      };
    },
  })
);
