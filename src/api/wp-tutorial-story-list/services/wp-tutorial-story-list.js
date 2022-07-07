'use strict';

/**
 * wp-tutorial-story-list service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-story-list.wp-tutorial-story-list', ({strapi}) => ({
  async find(ctx) {
    const entityStoryLists = await strapi.db.query('api::wp-tutorial-story-list.wp-tutorial-story-list').findMany({
      select: ['id', 'type', 'story_name', 'position'],
      orderBy: {position: 'asc'},
      where: {
        publishedAt: {
          $notNull: true,
        },
      },
      populate: {
        ["image"]: {
          select: ["url"],
        },
        title: true,
        description: true,
        ["wp_tutorial_stories"]: {
          orderBy: {position: 'asc'},
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          populate: {
            title: true,
            description: true,
            ["image"]: {
              select: ["url"],
            },

          }
        }

      },

    });

    return entityStoryLists;
  }

}));
