'use strict';

/**
 * wp-new-promotion service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-new-promotion.wp-new-promotion');

module.exports = createCoreService(
    "api::wp-new-promotion.wp-new-promotion",
    ({ strapi }) => ({
      async find(ctx) {
        const promotions = await strapi.entityService.findMany("api::wp-new-promotion.wp-new-promotion",
          {
            populate: {
              photo_path: {
                fields: ["url"],
              },
              title: true,
              wp_category: {
                fields: ["id", "name"],
              },
              wp_promotion_type: true,
              wp_deeplink: {
                fields: ["name", "deeplink", "is_external", "is_webURL", "alternative_url", "alternative_url_IOS", "deeplink_IOS", "client_id", "deeplink_id"],
                populate: {
                  wp_feature_id: {
                    fields: ["feature_id"],
                  }
                }
              },
              wp_feature_id: {
                fields: ["feature_id"]
              },
              paths: true,
              parameters: true,
              wp_home_widget: {
                fields: ["id"]
              },
            },
  
            publicationState: "live",
            sort: { position: "asc" },
            filters: {
              $and: [
                {
                  wp_category: {
                    id: {
                      $notNull: true,
                    },
                  },
                },
                {
                  wp_category: {
                    publishedAt: {
                      $notNull: true,
                    },
                  },
                },
              ],
            },
          }
        );
        return promotions;
      },
      async findOne(id) {
        const promotion = await strapi.entityService.findOne(
          "api::wp-promotion.wp-promotion",
          id,
          {
            populate: {
              photo_path: {
                select: ["url"],
              },
              wp_category: true,
              wp_promotion_type: true,
            },
            publicationState: "live",
            filters: {
              wp_category: {
                id: {
                  $notNull: true,
                },
              },
            },
          }
        );
        return promotion;
      },
      async filterByCategoryID(id) {
        const promotion = await strapi.entityService.findMany(
          "api::wp-promotion.wp-promotion",
          {
            populate: {
              photo_path: {
                select: ["url"],
              },
              wp_category: true,
              wp_promotion_type: true,
            },
            publicationState: "live",
            sort: { position: "asc" },
            filters: {
              $and: [
                {
                  wp_category: {
                    id: id,
                  },
                },
                {
                  wp_category: {
                    publishedAt: {
                      $notNull: true,
                    },
                  },
                },
              ],
            },
          }
        );
        return promotion;
      },
    })
  );