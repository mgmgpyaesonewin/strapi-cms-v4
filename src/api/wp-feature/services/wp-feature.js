"use strict";

/**
 * wp-feature service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::wp-feature.wp-feature",
  ({ strapi }) => ({
    async findByFeature(feature) {
      return await strapi.db.query("api::wp-feature.wp-feature").findOne({
        where: {
          feature: {
            $eq: feature,
          },
        },
        select: ["name", "feature", "id"],
      });
    },
    
    async getTooltipByFeature(ctx) {
      let data = await strapi.db.query("api::wp-feature.wp-feature").findMany({
        populate: {
          ["wp_tooltips"]: {
            select: ["id", "name"],
          },
        },
        where: {
          $and: [
            {
              wp_tooltips: {
                publishedAt: {
                  $notNull: true,
                },
              },
            },
            {
              publishedAt: {
                $notNull: true,
              },
            },
          ],
        },
        select: ["name", "feature", "id"],
      });
      return {
        data: data,
      };
    },
  })
);
