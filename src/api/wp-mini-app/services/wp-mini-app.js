'use strict';

/**
 * wp-mini-app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-mini-app.wp-mini-app', ({ strapi }) => ({
  async find(ctx) {
    if (ctx.query.versionCode) {
      let entriesMiniAPP = await strapi.db.query('api::wp-mini-app.wp-mini-app').findMany({
        populate: {
          title: true,
          icon: true,
          ["deep_link"]: {
            populate: {
              wp_feature_id: {
                select:["feature_id"]
              }
              
            },
            select: ["name", "deeplink", "is_external", "is_webURL", "alternative_url", "alternative_url_IOS", "deeplink_IOS", "client_id", "deeplink_id"],
            
          },
          paths: true,
          parameters: true,
          mini_app_category: true,
          ['wp_home_widget']: {
            select: ["id","name"],
          },
         
          ['wp_feature_id']:{
            select: ["feature_id"],
          }
        },
        where: {
          $and: [
            {
              wp_app_version_lists: {
                version_code: ctx.query.versionCode,
              },
            },
            {
              mini_app_category:{
                publishedAt: {
                  $notNull: true,
                },
              }
            },
            {
              publishedAt: {
                $notNull: true,
              },
            },
          ],
        },
        orderBy: { position: 'asc' },
        select: ['id', 'mini_app_type', 'include_header', 'position', 'is_login', 'screen_orientation', 'color', 'tag','display','kyc_level_check','is_service']
      });
      return entriesMiniAPP;
    } else {
      let entriesMiniAPP = await strapi.db.query('api::wp-mini-app.wp-mini-app').findMany({
        populate: {
          title: true,
          icon: true,
          ["deep_link"]: {
            select: ["name", "deeplink", "is_external", "is_webURL", "alternative_url", "alternative_url_IOS", "deeplink_IOS", "client_id"],
          },
          paths: true,
          parameters: true,
          mini_app_category: true,
          ['wp_home_widget']: {
            select: ["id","name"],
          },
        },
        where: {
          $and: [
            {
              wp_app_version_lists: {
                version_code: 'mini_app_v1',
              },
            },
            {
              publishedAt: {
                $notNull: true,
              },
            },
          ],
        },
        orderBy: { position: 'asc' },
        select: ['id', 'mini_app_type', 'include_header', 'position', 'is_login', 'screen_orientation', 'color', 'tag','display','kyc_level_check','is_service']
      });
      return entriesMiniAPP;
    }
  }
}));

