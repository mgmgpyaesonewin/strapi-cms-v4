'use strict';

/**
 * wp-tutorial-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-list.wp-tutorial-list', ({ strapi }) => ({
  async find(ctx) {
    const tutorials = await strapi.db.query('api::wp-tutorial-list.wp-tutorial-list').findMany({
      populate: {
        title: true,
        description: true,
        ["wp_tutorial_contents"]: {
          populate: {
            title: true,
            description: true,
            ["image"]: {
              select: ["url"],
            }
          },
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          orderBy: { position: 'asc' },
          select: ["name"],
        },
      },
      where: {
        $and: [
          {
            publishedAt: {
              $notNull: true,
            },
          },
          {
            wp_tutorial_contents: {
              publishedAt: {
                $notNull: true,
              }
            },
          }
        ],
      },
      orderBy: { position: 'asc' },
      select: ['id', 'type', 'position']
    });
    return tutorials;

  },


}));
