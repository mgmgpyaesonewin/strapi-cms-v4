'use strict';

/**
 * wp-mini-app-category service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-mini-app-category.wp-mini-app-category', ({strapi}) => ({
  async find(ctx) {
    const categories = await strapi.db.query('api::wp-mini-app-category.wp-mini-app-category').findMany({
      populate: {
        title: true,
        icon: true,
      },
      where: {
        publishedAt: {
          $notNull: true,
        },
      },
      orderBy: {position: 'asc'},
      select: ['id', 'position', 'tag','mini_app_category_type','color']

    });

    return categories;

  }
}));

