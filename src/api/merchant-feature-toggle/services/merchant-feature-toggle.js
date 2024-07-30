
"use strict";

/**
 * merchant-feature-toggle service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::merchant-feature-toggle.merchant-feature-toggle",
  ({ strapi }) => ({
    async find(ctx) {
      const versionCode = ctx.query.versionCode;

      if (versionCode != null) {
        // Query to get all entries
        let entries = await strapi.db
        .query("api::merchant-feature-toggle.merchant-feature-toggle")
        .findMany(
          {
          populate: {
            merchant_app_version_lists: true,
          },
        }
        );

        // Transform the value based on the requirement
        let transformedEntries = entries.map((entry) => {

          let hasVersionCode = entry.merchant_app_version_lists.some(
            (version) => version.version_code == versionCode
             && version.publishedAt !=null
          );

          // If the list is empty or contains the version code, retain the original value
          // Otherwise, negate the value
          return {
            id: entry.id,
            key: entry.key,
            value: entry.merchant_app_version_lists.length === 0 || hasVersionCode
              ? entry.value
              : !entry.value,
          };
        });

        return transformedEntries;
      } else {
        return [];
      }
    },
  })
);
