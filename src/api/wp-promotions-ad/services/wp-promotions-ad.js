'use strict';

/**
 * wp-promotions-ad service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-promotions-ad.wp-promotions-ad');
module.exports = createCoreService(
    "api::wp-promotions-ad.wp-promotions-ad",
    ({ strapi }) => ({
      async find(ctx) {
        const promotions = await strapi.entityService.findMany("api::wp-promotions-ad.wp-promotions-ad",
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
                fields: ["deeplink_id"],
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
          "api::wp-promotions-ad.wp-promotions-ad",
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
          "api::wp-promotions-ad.wp-promotions-ad",
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