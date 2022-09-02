'use strict';

/**
 * config-city-district service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-city-district.config-city-district', ({ strapi }) => ({
    async find(ctx) {
        return await strapi.db.query('api::config-city-district.config-city-district').findMany({
            populate: {
                title: true,
                ["region"]: {
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

    },
    async findByService(ctx) {
        return await strapi.entityService.findMany('api::config-city-district.config-city-district', {
            populate: ['region', 'title'],
            //populate: 'deep',
            publicationState: 'live',
            filters: {
                $and: [
                    {
                        townships: {
                            id: {
                                $notNull: true,
                            }
                        },
                        region: {
                            id: {
                                $notNull: true,
                            },
                        },
                    }
                ]
            }
        });
    },
    async findByCode(code) {
        return await strapi.db.query('api::config-city-district.config-city-district').findOne({
          where: { code: code },
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


