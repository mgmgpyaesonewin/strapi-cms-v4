'use strict';

/**
 * config-region service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-region.config-region', ({ strapi }) => ({
    async find(ctx) {
      return await strapi.db.query('api::config-region.config-region').findMany({
        populate: {
          title: true,
        },
        where: {
          publishedAt: {
            $notNull: true,
          }
        },
        orderBy: { position: 'asc' },
        select: ['name', 'code', 'position']
      });
    },
    async findByService(ctx) {
      return await strapi.entityService.findMany('api::config-region.config-region', {
        populate: ['districts', 'title'],
        publicationState: 'live',
        filters: {
          districts: {
            id: {
              $notNull: true,
            }
          }
  
        }
      });
    },
    async findByCode(code) {
      return await strapi.db.query('api::config-region.config-region').findOne({
        where: {
          code: {
            $eq: code,
          },
        },
        populate: {
          title: true,
        },
        where: {
          $and: [
            {
              code: {
                $eq: code,
              },
  
            },
            {
              publishedAt: {
                $notNull: true,
              },
  
            }
          ]
  
        },
        select: ['name', 'code']
      });
  
    },
  
  }));
