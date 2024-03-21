"use strict";

/**
 * wc-faq-list controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wc-faq-list.wc-faq-list",
  ({ strapi }) => ({
    async find(ctx) {
      const faq = await strapi
        .service("api::wc-faq-list.wc-faq-list")
        .find(ctx);
      return {
        data: faq,
      };
    },
  })
);
