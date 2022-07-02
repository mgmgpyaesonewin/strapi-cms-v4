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
                        ['ios']: {
                            populate: {
                                ["ios_640_1136"]: {
                                    select: ["url"],
                                },
                                ["ios_750_1334"]: {
                                    select: ["url"],
                                },
                                ["ios_1080_1920"]: {
                                    select: ["url"],
                                },
                                ["ios_1125_2436"]: {
                                    select: ["url"],
                                },

                            },
                        },
                        ['android']: {
                            populate: {
                                ["ldpi"]: {
                                    select: ['url'],
                                },
                                ["mdpi"]: {
                                    select: ['url'],
                                },
                                ["hdpi"]: {
                                    select: ['url'],
                                },
                                ["xhdpi"]: {
                                    select: ['url'],
                                },
                                ["xxhdpi"]: {
                                    select: ['url'],
                                },
                                ["xxxhdpi"]: {
                                    select: ['url'],
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
