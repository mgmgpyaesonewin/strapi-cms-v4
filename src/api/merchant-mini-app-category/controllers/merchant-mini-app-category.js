'use strict';

/**
 *  merchant-mini-app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::merchant-mini-app-category.merchant-mini-app-category', ({ strapi }) => ({
    async find(ctx) {
      /* mini app category */
      const categories = await strapi.service('api::merchant-mini-app-category.merchant-mini-app-category').find(ctx);
      categories.map(category => {
        category.icon = !!category.icon ? category.icon.url : '';
    });
    
    /* mini app */
      const miniApps = await strapi.service('api::merchant-mini-app-mini-app.merchant-mini-app-mini-app').find(ctx);
      if (miniApps.length > 0) {
        miniApps.map(miniApp => {
          let paths = miniApp.paths;
          miniApp.category_id = !!miniApp.merchant_mini_app_category ? miniApp.merchant_mini_app_category.id : 0;
          miniApp.category_name = !!miniApp.merchant_mini_app_category ? miniApp.merchant_mini_app_category.name : '';
          miniApp.icon = !! miniApp.icon ? miniApp.icon.url :'';
          paths.map(path => {
            path.value = path.value_injector === "static" ? path.value : null;
  
          });
          delete miniApp.merchant_mini_app_category;
        });
      }
      return {
        "categories": categories,
        "mini_apps": miniApps.length > 0 ? miniApps : []
      };
    },
  
  }));
  
