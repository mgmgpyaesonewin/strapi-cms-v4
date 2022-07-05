'use strict';

/**
 * wp-tutorial-list service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial-list.wp-tutorial-list', ({ strapi }) =>  ({
    // Method 1: Creating an entirely new custom service

    async find(params) {  
        const tutorials = await strapi.db.query('api::wp-tutorial-list.wp-tutorial-list').findMany({
            populate: {
                title: true,
                description: true,
                ["image"]: {
                    select: ["url"],
                },
                ["subcategories"]: {
                    populate: {
                        title: true,
                        description: true,
                        ["image"]: {
                            select: ["url"],
                        },
                        ["wp_tutorial_items"]: {
                            select: ['name'],
                            orderBy: { position: 'asc' },
                            where: {
                                publishedAt: {
                                    $notNull: true,
                                },
                            },
                            populate: {
                                title: true,
                                description: true,
                                ["image"]: {
                                    select: ["url"],
                                },
                            },

                        }

                    },
                    where: {
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                    orderBy: { position: 'asc' },
                    select: ["sub_category_name"],
                },
            },

            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            orderBy: { position: 'asc' },
            select: ['id', 'type','position']
        });
        return tutorials;

      },

      
}));