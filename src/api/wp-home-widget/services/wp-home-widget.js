'use strict';

/**
 * wp-home-widget service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-home-widget.wp-home-widget', ({ strapi }) => ({
    async find(ctx) {
        const categories = await strapi.db.query('api::wp-home-widget.wp-home-widget').findMany({
            populate: {
                ['background']: {
                    populate: {
                        ["image"]: {
                            select: ["url"],
                        },
                    }
                },
                title:true,
            },
            select: ['id', 'show_title','is_horizontal_scroll','type', 'position', 'text_color', 'icon_theme_color'],
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
            orderBy: {position: 'asc'},
        });
        return categories;
    }
}));


