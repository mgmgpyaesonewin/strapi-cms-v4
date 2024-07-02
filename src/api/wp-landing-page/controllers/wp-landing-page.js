"use strict";

/**
 * wp-landing-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wp-landing-page.wp-landing-page",
  ({ strapi }) => ({
    async find(ctx) {
      let contents = await strapi
        .service("api::wp-landing-page.wp-landing-page")
        .find(ctx);

      if (contents.length > 0) {
        contents = contents.map((content) => {
          const { fromColor, toColor, bgColor, ...rest } = content;
          return {
            ...rest,
            theme: {
              fromColor,
              toColor,
              bgColor,
            },
          };
        });
      }
      return {
        data: contents,
      };
    },
  })
);
