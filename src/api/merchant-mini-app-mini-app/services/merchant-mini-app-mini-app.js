"use strict";

/**
 * merchant-mini-app-mini-app service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::merchant-mini-app-mini-app.merchant-mini-app-mini-app",
  ({ strapi }) => ({
    async find(ctx) {
      if (ctx.query.versionCode) {
        const entriesMiniAPP = await strapi.db
          .query("api::merchant-mini-app-mini-app.merchant-mini-app-mini-app")
          .findMany({
            populate: {
              title: true,
              ["icon"]: {
                select: ["url"],
              },
              ["merchant_deeplink"]: {
                select: [
                  "name",
                  "deeplink",
                  "deeplink_IOS",
                  "is_external",
                  "is_webURL",
                  "alternative_url",
                  "alternative_url_IOS",
                  "client_id",
                ],
              },
              paths: true,
              parameters: true,
              merchant_mini_app_category: true,
            },
            where: {
              $and: [
                {
                  merchant_app_version_lists: {
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
            orderBy: { position: "asc" },
            select: [
              "id",
              "include_header",
              "position",
              "tag",
              "is_login",
              "screen_orientation",
              "mini_app_type",
              "color",
              "display",
              "rbac_key",
            ],
          });

        return entriesMiniAPP;
      } else {
        const entriesMiniAPP = await strapi.db
          .query("api::merchant-mini-app-mini-app.merchant-mini-app-mini-app")
          .findMany({
            populate: {
              title: true,
              ["icon"]: {
                select: ["url"],
              },
              ["merchant_deeplink"]: {
                select: [
                  "name",
                  "deeplink",
                  "deeplink_IOS",
                  "is_external",
                  "is_webURL",
                  "alternative_url",
                  "alternative_url_IOS",
                  "client_id",
                ],
              },
              paths: true,
              parameters: true,
              merchant_mini_app_category: true,
            },
            where: {
              publishedAt: {
                $notNull: true,
              },
            },
            orderBy: { position: "asc" },
            select: [
              "id",
              "include_header",
              "position",
              "tag",
              "is_login",
              "screen_orientation",
              "mini_app_type",
              "color",
              "display",
              "rbac_key",
            ],
          });

        return entriesMiniAPP;
      }
    },
  })
);
