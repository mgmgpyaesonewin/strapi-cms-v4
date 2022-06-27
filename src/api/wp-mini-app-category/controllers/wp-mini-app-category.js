'use strict';

/**
 *  wp-mini-app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-mini-app-category.wp-mini-app-category', ({ strapi }) => ({
    async find(ctx) {
        const entriesCategories = await strapi.db.query('api::wp-mini-app-category.wp-mini-app-category').findMany({
            populate: {
                title: true,
                icon: true
            },
            where: {
                publishedAt: {
                    $notNull: true,

                },
            },
            orderBy: { position: 'asc' },
            select: ['id', 'home', 'position']
        });
        entriesCategories.forEach(object => {
            object.icon = object.icon.url;
        });

        const entriesMiniAPP = await strapi.db.query('api::wp-mini-app.wp-mini-app').findMany({
            populate: {
                title: true,
                icon: true,
                deep_link: true,
                path: true,
                parameters: true,
                mini_app_category: true
            },
            where: {
                publishedAt: {
                    $notNull: true,

                },
            },
            orderBy: { position: 'asc' },
            select: ['id', 'is_home', 'include_header', 'position']
        });
        if (entriesMiniAPP.length > 0) {
            entriesMiniAPP.forEach(object => {
                object.category_id = object.mini_app_category.id;
                object.category_name = object.mini_app_category.name;
                object.icon = object.icon.url;
                delete object.mini_app_category;
            });
        }
        let finalResult = {
            "categories": entriesCategories,
            "mini_apps": entriesMiniAPP.length > 0 ? entriesMiniAPP: null
        }
        return finalResult;
    },
}));
