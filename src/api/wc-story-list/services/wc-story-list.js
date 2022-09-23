'use strict';

/**
 * wc-story-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-story-list.wc-story-list', ({ strapi }) => ({
    async find(ctx) {
      const entityStoryLists = await strapi.db.query('api::wc-story-list.wc-story-list').findMany({
        select: ['id', 'type', 'story_name', 'position'],
        orderBy: { position: 'asc' },
        where: {
          $and: [
            {
              publishedAt: {
                $notNull: true,
              }
            },
            {
                wc_story_contents: {
                publishedAt: {
                  $notNull: true,
                }
              }
            }
          ]
        },
        populate: {
          ["image"]: {
            select: ["url"],
          },
          title: true,
          description: true,
          ["wc_story_contents"]: {
            orderBy: { position: 'asc' },
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
  
