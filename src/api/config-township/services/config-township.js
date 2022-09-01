'use strict';

/**
 * config-township service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-township.config-township', ({strapi}) => ({
    async find(ctx) {
    return await strapi.db.query('api::config-township.config-township').findMany({
        populate: {
          title: true,
          ["city_district"]: {
            populate: {
                title: true,
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            select: ['name', 'code']
        },
          where: {
            publishedAt: {
              $notNull: true,
            }
          }
        },
          select: ['name', 'code']
        });
    }
  }));
  
  
