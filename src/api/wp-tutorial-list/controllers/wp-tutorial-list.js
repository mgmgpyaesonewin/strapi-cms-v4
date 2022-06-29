'use strict';

/**
 *  wp-tutorial-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial-list.wp-tutorial-list', ({ strapi }) => ({
    async find(ctx) {
        const entriesCategories = await strapi.db.query('api::wp-tutorial-list.wp-tutorial-list').findMany({
            populate: {
                title: true,
                //image: true,
                ["image"]: {
                    select: ["url"],

                },
                ["wp_tutorial"]: {
                    select: ["code"],

                },
                ["wp_tutorial_story"]: {
                    select: ["code"],

                },
            },

            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            //orderBy: { position: 'asc' },
            select: ['id', 'type']
        });

        return entriesCategories;
    }
}));