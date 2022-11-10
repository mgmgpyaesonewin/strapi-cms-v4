'use strict';

/**
 * wp-mini-app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-mini-app.wp-mini-app', ({ strapi }) => ({
  async find(ctx) {
    if (ctx.request.header.versioncode) {
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
        },
        where: {
          $and: [
            {
              wp_app_version_lists: {
                version_code: ctx.request.header.versioncode,
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
        select: ['id', 'mini_app_type', 'include_header', 'position', 'is_login', 'screen_orientation', 'color', 'tag']
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
        },
        where: {
          publishedAt: {
            $notNull: true,
          },
        },
        orderBy: { position: 'asc' },
        select: ['id', 'mini_app_type', 'include_header', 'position', 'is_login', 'screen_orientation', 'color', 'tag']
      });
      return entriesMiniAPP;
    }
  }
}));

