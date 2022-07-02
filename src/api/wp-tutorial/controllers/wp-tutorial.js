'use strict';

/**
 *  wp-tutorial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial.wp-tutorial', ({ strapi }) => ({
    async findOne(ctx) {

        const { id } = ctx.params;

        const entity = await strapi.db.query('api::wp-tutorial.wp-tutorial').findOne({
            where: { id: id },
            select: ['name'],
            populate: {
                title: true,
                description: true,
                ["image"]: {
                    select: ["url"],
                },
                ["tutorials"]: {
                    populate: {
                        title: true,
                        description: true,
                        ["image"]: {
                            select: ["url"],
                        },
                    },

                }
            }

        });
        return entity;
    }
}));
