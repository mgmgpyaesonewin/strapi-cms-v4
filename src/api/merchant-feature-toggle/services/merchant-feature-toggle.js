'use strict';

/**
 * merchant-feature-toggle service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService("api::merchant-feature-toggle.merchant-feature-toggle",({ strapi }) => ({
    async find(ctx) {
      return await strapi.db.query("api::merchant-feature-toggle.merchant-feature-toggle").findMany({
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          select: ["id", "key", "value"],
        });
    },
  })
);


