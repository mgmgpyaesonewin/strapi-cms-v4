'use strict';

/**
 *  wp-mini-app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-mini-app-category.wp-mini-app-category', ({ strapi }) => ({
  async find(ctx) {
    /* mini app category */
    
    const categories = await strapi.service('api::wp-mini-app-category.wp-mini-app-category').find(ctx);
    categories.map(category => {
      category.icon = !!category.icon ? category.icon.url : '';
      category.color =category.color == null ? '#000000' :category.color;
      category.widget_id =!!category.wp_home_widget ? category.wp_home_widget.id : null;
      delete category.wp_home_widget;

    });
    /* mini app */
    const miniApps = await strapi.service('api::wp-mini-app.wp-mini-app').find(ctx);
    if (miniApps.length > 0) {
      miniApps.map(miniApp => {
        let paths = miniApp.paths;
        miniApp.category_id = !!miniApp.mini_app_category ? miniApp.mini_app_category.id : 0;
        miniApp.category_name = !!miniApp.mini_app_category ? miniApp.mini_app_category.name : '';
        miniApp.color = miniApp.color == null ? '#000000' :miniApp.color;
        miniApp.icon = !! miniApp.icon ? miniApp.icon.url :'';
        miniApp.widget_id = !!miniApp.wp_home_widget ? miniApp.wp_home_widget.id : null;
        paths.map(path => {
          path.value = path.value_injector === "static" ? path.value : null;
        });
        delete miniApp.mini_app_category;
        delete miniApp.wp_home_widget;
      });
    }
    return {
      "categories": categories,
      "mini_apps": miniApps.length > 0 ? miniApps : []
    };
  },

}));
