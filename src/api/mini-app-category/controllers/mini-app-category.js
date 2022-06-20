'use strict';

/**
 *  mini-app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mini-app-category.mini-app-category', ({ strapi }) => ({
  async find(ctx) {
    const entriesCategories = await strapi.entityService.findMany('api::mini-app-category.mini-app-category', {
      populate: ['icon'],
      publicationState: 'live',
      sort: { position: 'asc' },
    });

    const entriesMiniAPP = await strapi.entityService.findMany('api::mini-app.mini-app', {
      populate: ['deep_link', 'path', 'parameters', 'mini_app_category', 'icons'],
      publicationState: 'live',
      sort: { position: 'asc' },
    });

    // const arrWithColor = entriesMiniAPP.map(object => {
    //   return {...object, category_id:  object.mini_app_category.id  };
    // });

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
