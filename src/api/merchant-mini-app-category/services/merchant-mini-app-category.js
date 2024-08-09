'use strict';

/**
 * merchant-mini-app-category service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-mini-app-category.merchant-mini-app-category', ({ strapi }) => ({
  async find(ctx) {
    const categories = await strapi.db.query('api::merchant-mini-app-category.merchant-mini-app-category').findMany({
      populate: {
        title: true,
        icon: true,
      },
      where: {
        publishedAt: {
          $notNull: true,
        },
      },
      orderBy: { position: 'asc' },
      select: ['id', 'position', 'tag', 'mini_app_category_type', 'color']
    });

    return categories;
  }
}));
