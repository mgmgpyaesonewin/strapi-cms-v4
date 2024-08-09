"use strict";

/**
 * wp-feature-reminder controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wp-feature-reminder.wp-feature-reminder",
  ({ strapi }) => ({
    async filterByVersion(ctx) {
      let { versionCode } = ctx.params;
      let stories = await strapi
        .service("api::wp-feature-reminder.wp-feature-reminder")
        .getLatest(versionCode);
      return {
        data: stories,
      };
    },
  })
);
