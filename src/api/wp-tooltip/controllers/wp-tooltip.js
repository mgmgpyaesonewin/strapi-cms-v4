"use strict";

/**
 * wp-tooltip controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wp-tooltip.wp-tooltip",
  ({ strapi }) => ({
    async find(ctx) {
      //   return ctx.query.versionCode;
      let features = await strapi
        .service("api::wp-feature.wp-feature")
        .getTooltipByFeature(ctx);

      let tooltips = await strapi
        .service("api::wp-tooltip.wp-tooltip")
        .find(ctx);

      const tooltipMap = Object.fromEntries(
        tooltips.data.map((item) => [item.id, item])
      );

      const mergedJson = features.data.map((feature) => ({
        ...feature,
        wp_tooltips: feature.wp_tooltips
          .filter((tooltip) => tooltip.id in tooltipMap)
          .map((tooltip) => ({
            ...tooltip,
            ...tooltipMap[tooltip.id],
          })),
      }));

      return mergedJson;
    },
  })
);
