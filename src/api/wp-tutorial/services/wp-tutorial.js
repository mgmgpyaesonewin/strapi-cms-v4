'use strict';

/**
 * wp-tutorial service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial.wp-tutorial', ({ strapi }) => ({

    async findOne(id) {

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
