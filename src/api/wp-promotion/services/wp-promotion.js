'use strict';

/**
 * wp-promotion service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-promotion.wp-promotion', ({ strapi }) => ({
  async find(ctx) {
    const promotions = await strapi.entityService.findMany('api::wp-promotion.wp-promotion', {
      populate: {
        photo_path: {
          select: ['url'],

        },
        wp_category: true,
        wp_promotion_type: true
      },

      publicationState: 'live',
      filters: {
        $and: [
          {
            wp_category: {
              id: {
                $notNull: true,
              },
            },
          }, {
            wp_category: {
              publishedAt: {
                $notNull: true,
              }
            },
          }

        ],
      }

    });
    return promotions;
  },
  async findOne(id) {
    const promotion = await strapi.entityService.findOne('api::wp-promotion.wp-promotion', id, {
      populate: {
        photo_path: {
          select: ['url'],

        },
        wp_category: true,
        wp_promotion_type: true
      },
      publicationState: 'live',
      filters: {
        wp_category: {
          id: {
            $notNull: true,
          },
        },
      },

    });
    return promotion;
  },
  async filterByCategoryID(id) {
    const promotion = await strapi.entityService.findMany('api::wp-promotion.wp-promotion', {
      populate: {
        photo_path: {
          select: ['url'],

        },
        wp_category: true,
        wp_promotion_type: true
      },
      publicationState: 'live',
      sort: { position: 'asc' },
      filters: {
        $and: [
          {
            wp_category: {
              id: id,
            },
          }, {
            wp_category: {
              publishedAt: {
                $notNull: true,
              }
            },
          }

        ],
      },
    });
    return promotion;
  }
}));

