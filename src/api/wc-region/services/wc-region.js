'use strict';

/**
 * wc-region service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-region.wc-region', ({strapi}) => ({
    async find(ctx) {
      return await strapi.db.query('api::wc-region.wc-region').findMany({
        populate: {
          title: true,
          ['city_districts']: {
            populate: {
              title: true,
              ["townships"]: {
                populate: {
                  title: true,
                },
                where: {
                  publishedAt: {
                    $notNull: true,
                  },
                },
                select:['name','code']
              },
            },
            where: {
              publishedAt: {
                $notNull: true,
              },
            },
            select:['name','code']
  
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
              city_districts: {
                publishedAt: {
                  $notNull: true,
                },
                townships: {
                  publishedAt: {
                    $notNull: true,
                  },
                }
              },
            }
          ],
        },
        select:['name','code']
    });
  },

}));

  
