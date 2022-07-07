'use strict';

/**
 *  wp-mini-app-category controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-mini-app-category.wp-mini-app-category', ({strapi}) => ({
  async find(ctx) {
    /* mini app category */
    const categories = await strapi.service('api::wp-mini-app-category.wp-mini-app-category').find(ctx);
    categories.forEach(category => {
      category.icon = category.icon.url;
    });

    /* mini app */
    const miniApps = await strapi.service('api::wp-mini-app.wp-mini-app').find(ctx);
    if (miniApps.length > 0) {
      miniApps.forEach(miniApp => {
        miniApp.category_id = !!miniApp.mini_app_category ? miniApp.mini_app_category.id : 0;
        miniApp.category_name = !!miniApp.mini_app_category ? miniApp.mini_app_category.name : null;
        miniApp.icon = miniApp.icon.url;
        delete miniApp.mini_app_category;
      });
    }
    return {
      "categories": categories,
      "mini_apps": miniApps.length > 0 ? miniApps : []
    };
  },

}));
