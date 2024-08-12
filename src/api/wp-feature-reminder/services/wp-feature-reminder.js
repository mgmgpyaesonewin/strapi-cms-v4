"use strict";

/**
 * wp-feature-reminder service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::wp-feature-reminder.wp-feature-reminder",
  ({ strapi }) => ({
    async getLatest(versionCode) {
      let reminders = await strapi.db
        .query("api::wp-feature-reminder.wp-feature-reminder")
        .findOne({
          populate: {
            title: true,
            description: true,
            info: true,
            cta_button: true,
            ["wp_deeplink"]: {
              select: [
                "name",
                "deeplink",
                "is_external",
                "is_webURL",
                "alternative_url",
                "deeplink_IOS",
                "alternative_url_IOS",
                "client_id",
                "deeplink_id",
              ],
            },
            ["image"]: {
              select: ["url"],
            },
          },
          where: {
            $and: [
              {
                wp_app_version_lists: {
                  version_code: versionCode,
                },
              },

              {
                publishedAt: {
                  $notNull: true,
                },
              },
            ],
          },

          orderBy: { publishedAt: "desc" },
          select: ["id"],
        });

      return reminders;
    },
  })
);
