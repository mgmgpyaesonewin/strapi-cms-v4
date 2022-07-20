'use strict';

/**
 * wp-term-and-condition service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-term-and-condition.wp-term-and-condition', ({ strapi }) => ({

  async findByVersion(version) {
    return await strapi.db.query('api::wp-term-and-condition.wp-term-and-condition').findOne({
      populate: {
        title: true,
        content: true,
        ['wp_version']: {
          select: ['version'],
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
            wp_version: {
              $and: [
                {
                  version: {
                    $eq: version,
                  },

                }, {
                  publishedAt: {
                    $notNull: true,
                  },

                },
              ]
            }
          },
        ],
      },
      select: ['id']
    });
  },
  async find(ctx) {
    return await strapi.db.query('api::wp-term-and-condition.wp-term-and-condition').findMany({
      populate: {
        title: true,
        content: true,
        ['wp_version']: {
          select: ['version'],
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
            wp_version: {
              publishedAt: {
                $notNull: true,
              },
            }
          },
        ],
      },
      select: ['id']
    });
  }

}));
