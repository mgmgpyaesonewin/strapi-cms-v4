"use strict";

/**
 * wp-feature-reminder controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wp-feature-reminder.wp-feature-reminder",
  ({ strapi }) => ({
    async filterByVersion(ctx) {
      const { versionCode } = ctx.params;
      const reminder = await strapi
        .service("api::wp-feature-reminder.wp-feature-reminder")
        .getLatest(versionCode);
      if (reminder) {
        reminder.deeplink_id = reminder.wp_deeplink
          ? reminder.wp_deeplink.deeplink_id
          : null;
        reminder.feature_id = reminder.wp_feature_id
          ? reminder.wp_feature_id.feature_id
          : null;
        delete reminder.wp_deeplink;
        delete reminder.wp_feature_id;
      }
      return {
        data: reminder,
      };
    },
  })
);
