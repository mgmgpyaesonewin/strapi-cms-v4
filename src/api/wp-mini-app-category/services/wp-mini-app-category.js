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
      select: ['id', 'is_home', 'position', 'tag']
    });
    categories.forEach(object => {
      object.icon = object.icon.url;
    });
    return categories;

  }
}));

