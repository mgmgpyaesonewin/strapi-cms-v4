'use strict';

const { default: entityService } = require('@strapi/strapi/lib/services/entity-service');

/**
 *  wp-promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-promotion.wp-promotion', ({ strapi }) => ({
    async find(ctx) {
      let status = "Success";
      let types = ['NORMAL', 'SPECIAL'];
      const { data, meta } = await super.find(ctx);
      let promotionType = ctx.query.promotionType;
      const entries = await strapi.entityService.findMany('api::wp-promotion.wp-promotion', {
        populate: 'deep',
        publicationState: 'live',
        //sort: {position: 'asc'},
      });
  
      var finalData;
      if (types.includes(ctx.query.promotionType)) {
        finalData = entries.filter(function (filterType) {
          return filterType.wp_promotion_type.type_title == ctx.query.promotionType;
        });
      } else {
        finalData = entries;
      }
  
      let responseMap = responseMapping(finalData);
      return { status, responseMap };
    },
  
    async indexTest(ctx, next) {
      let status = "Success";
      let { id } = ctx.params;
      const entries = await strapi.entityService.findMany('api::wp-promotion.wp-promotion', {
        populate: 'deep',
        publicationState: 'live',
        sort: { position: 'asc' },
        filters: {
            wp_category: {
            category_id: id
          },
        },
        //locale: ctx.query.locale
      });
  
      let responseMap = responseMapping(entries);
      return { status, responseMap };
  
    },
  
  
    async findOne(ctx) {
      let status = "Success";
      const { id } = ctx.params;
      const { query } = ctx;
      const entity = await strapi.entityService.findOne('api::wp-promotion.wp-promotion', id, {
        populate: 'deep',
        publicationState: 'live',
  
      });
  
      if (!entity) {
        return ctx.badRequest('Promotion is not found', { detail: 'just testing'})
      }
  
      const responseMap = {
        promotion_id: entity.id,
        photo_path: entity.url,
        promotion_type: !entity.wp_promotion_type ? null : entity.wp_promotion_type.type_title,
        category_id: !entity.wp_category ? null : entity.wp_category.category_id,
        category_title: !entity.wp_category ? null : entity.wp_category.category_title,
        hasDetails: entity.hasDetails,
        action_link_ios: entity.action_link_ios,
        action_link_android: entity.action_link_android,
        promotion_title: entity.promotion_title,
        position: entity.position,
        promotion_code: entity.promotion_code,
        is_external: entity.is_external,
        external_deeplink: entity.external_deeplink,
      };
      return { status, responseMap };
  
  
    }
  
  }));
  
  function responseMapping(promotionEntries) {
    let mapping = [];
    console.log(promotionEntries);
     promotionEntries.map((value, index) => {
        mapping.push({
        "promotion_id": value.id,
        'promotion_title': value.promotion_title,
        "photo_path": value.photo_path.url,
        "promotion_type": !value.wp_promotion_type ? null : value.wp_promotion_type.type_title,
        "category_id": !value.wp_category ? null : value.wp_category.category_id,
        "category_title": !value.wp_category ? null : value.wp_category.category_title,
        "hasDetails": value.hasDetails,
        "action_link_ios": value.action_link_ios,
        "action_link_android": value.action_link_android,
        "position": value.position,
        "promotion_code": value.promotion_code,
        "is_external": value.is_external,
        "external_deeplink": value.external_deeplink,
  
      });
    });
    return mapping;
  
  }
  
