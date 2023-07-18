'use strict';

/**
 * config-township service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-township.config-township', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.db.query('api::config-township.config-township').findMany({
      populate: {
        title: true,
        ["city_district"]: {
          populate: {
            title: true,
            ["region"]: {
              populate: {
                title: true,
              }
            },
          },
          where: {
            publishedAt: {
              $notNull: true,
            },
          },
          select: ['name', 'code']
        }

      },
      where: {
        $and: [
          {
            publishedAt: {
              $notNull: true,
            },
          },
          {
            city_district: {
              publishedAt: {
                $notNull: true,
              }
            },
          }
        ],
      },
      orderBy: [
        {
          city_district: {
            code: 'asc',
          },
        },
        {
          name: 'asc',
        }
      ],
      select: ['name', 'code']
    });
  },
  async findByService(ctx) {
    return await strapi.entityService.findMany('api::config-township.config-township', {
      populate: ['city_district', 'title'],
      publicationState: 'live',
      filters: {
        city_district: {
          id: {
            $notNull: true,
          }
        }

      }
    });
  }
}));
