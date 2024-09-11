"use strict";

/**
 * wp-localization-content controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wp-localization-content.wp-localization-content",
  ({ strapi }) => ({
    async find(ctx) {
      const localizationService = strapi.service(
        "api::wp-localization-content.wp-localization-content"
      );

      // Fetch content based on whether 'language' is provided in the query
      let contents = ctx.query.language
        ? await localizationService.findByLanguage(ctx)
        : await localizationService.find(ctx);

      // Modify the content only if there is a 'language' query
      if (ctx.query.language) {
        contents = contents.map((item) => {
          if (item.value) {
            item.value.text =
              item.value.en || item.value.my || item.value.zw || item.value.zh; // Set text based on available language
            delete item.value.en;
            delete item.value.my;
            delete item.value.zw;
            delete item.value.zh;
          }
          return item;
        });

        console.log(JSON.stringify(contents, null, 2)); // Correct logging of modified contents
      }

      return {
        contents,
      };
    },

    async findKey(ctx) {
      const { key } = ctx.params;
      let content = await strapi
        .service("api::wp-localization-content.wp-localization-content")
        .findByKey(key);
      return {
        contents: content,
      };
    },
  })
);
