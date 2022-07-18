'use strict';

/**
 * merchant-home service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-home.merchant-home', ({ strapi }) => ({
    async find(ctx) {
        const home = await strapi.db.query('api::merchant-home.merchant-home').findOne({
            populate: {
                action_row: {
                    populate: {
                        ['items']: {
                            populate: {
                                ["icon"]: {
                                    select: ["url"],
                                },
                            },
                            select: ['width', 'title_en', 'title_my', 'isShow'],
                        },
                    }
                },

                what_new: {
                    populate: {
                        ["items"]: {
                            
                            orderBy: { position: 'asc' },
                            where: {
                                $and: [
                                  {
                                    publishedAt: {
                                      $notNull: true,
                                    },
                                  },
                                  {
                                    app: {
                                      $eq: 'merchant',
                                    },
                                  },
                                ],
                              },
                            populate: {
                                title: true,
                                description: true,
                                ["image"]: {
                                    select: ["url"],
                                },

                            }
                        },
                    }
                },
            }

        });
        return home;
    }


}));