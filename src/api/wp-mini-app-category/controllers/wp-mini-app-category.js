'use strict';

/**
 *  wp-mini-app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-mini-app-category.wp-mini-app-category', ({ strapi }) => ({
    async find(ctx) {
        const entriesCategories = await strapi.entityService.findMany('api::wp-mini-app-category.wp-mini-app-category', {
            populate: ['icon'],
            publicationState: 'live',
            sort: { position: 'asc' },
        });

        const entriesMiniAPP = await strapi.entityService.findMany('api::wp-mini-app.wp-mini-app', {
            populate: 'deep',
            publicationState: 'live',
            sort: { position: 'asc' },
        });



        entriesMiniAPP.forEach(object => {
            object.category_id = object.mini_app_category.id;
            object.category_name = object.mini_app_category.name;
            delete object.mini_app_category;
        });
        let finalResult = {
            "categories": entriesCategories,
            "mini_apps": entriesMiniAPP
        }
        return finalResult;
    },
}));
