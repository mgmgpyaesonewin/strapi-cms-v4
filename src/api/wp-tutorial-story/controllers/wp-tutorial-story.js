'use strict';

/**
 *  wp-tutorial-story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-story.wp-tutorial-story', ({ strapi }) => ({
    async findOne(ctx) {

        const { id } = ctx.params;
        const entity2 = await strapi.entityService.findOne('api::wp-tutorial-story.wp-tutorial-story', id, {
            populate: 'deep',
            publicationState: 'live',
      
          });
         // return entity2;


        const entity = await strapi.db.query('api::wp-tutorial-story.wp-tutorial-story').findOne({
            where: { id: id },
            select: ['name'],
            populate: {
                 title: true,
                 description: true,
                ["stories"]: {
                    populate: {
                        ['en']: {
                            populate: {
                                ["extra_large"]: {
                                    select: ["url"],
                                },
                                ["large"]: {
                                    select: ["url"],
                                },
                                ["mid"]: {
                                    select: ["url"],
                                },
                                ["small"]: {
                                    select: ["url"],
                                },
                                ["extra_small"]: {
                                    select: ["url"],
                                },

                            },
                        },
                        ['my']: {
                            populate: {
                                ["extra_large"]: {
                                    select: ["url"],
                                },
                                ["large"]: {
                                    select: ["url"],
                                },
                                ["mid"]: {
                                    select: ["url"],
                                },
                                ["small"]: {
                                    select: ["url"],
                                },
                                ["extra_small"]: {
                                    select: ["url"],
                                },
                            },
                        },


                    }

                }

            }
        });
        return entity;
    }
}));
