'use strict';

/**
 * config-region service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-region.config-region', ({ strapi }) => ({
  async find(ctx) {

    return await strapi.db.query('api::config-region.config-region').findMany({
      populate: {
        title: true,
        where: {
          publishedAt: {
            $notNull: true,
          }
        }
      },
        select: ['name', 'code']
      });
  },

}));

