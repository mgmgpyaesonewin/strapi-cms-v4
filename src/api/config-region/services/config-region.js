'use strict';

/**
 * config-region service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-region.config-region', ({strapi}) => ({
  async find(ctx) {
    const login = await strapi.entityService.findMany('api::config-region.config-region', {
      populate: 'deep',
      publicationState: 'live',
    });
    //return login;
    return await strapi.db.query('api::config-region.config-region').findMany({
      populate: {
        title: true,
        ['districts']: {
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
            districts: {
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

