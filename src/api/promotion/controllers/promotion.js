'use strict';

const { default: entityService } = require('@strapi/strapi/lib/services/entity-service');

/**
 *  promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promotion.promotion', ({ strapi }) => ({
  async find(ctx) {
    let status = "Success";
    let types = ['NORMAL', 'SPECIAL'];
    const { data, meta } = await super.find(ctx);
    let promotionType = ctx.query.promotionType;
    const entries = await strapi.entityService.findMany('api::promotion.promotion', {
      populate: 'deep',
      publicationState: 'live',
    });

    var finalData;
    if (types.includes(ctx.query.promotionType)) {
      finalData = entries.filter(function (filterType) {
        return filterType.promotion_type.type_title == ctx.query.promotionType;
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
    const entries = await strapi.entityService.findMany('api::promotion.promotion', {
      populate: 'deep',
      publicationState: 'live',
      sort: { position: 'asc' },
      filters: {
        categoriess: {
          category_id: id
        },
      },
    });

    let responseMap = responseMapping(entries);
    return { status, responseMap };

  },


  async findOne(ctx) {
    let status = "Success";
    const { id } = ctx.params;
    const { query } = ctx;
    const entity = await strapi.entityService.findOne('api::promotion.promotion', id, {
      populate: 'deep',
      publicationState: 'live',

    });

    if (!entity) {
      return ctx.badRequest('Promotion is not found', { detail: 'just testing'})
    }

    const responseMap = {
      promotion_id: entity.id,
      photo_path: entity.photo_path[0].url,
      promotion_type: !entity.promotion_type ? null : entity.promotion_type.type_title,
      category_id: !entity.categoriess ? null : entity.categoriess.category_id,
      category_title: !entity.categoriess ? null : entity.categoriess.category_title,
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

  promotionEntries.map((value, index) => {
    let photoArr = value.photo_path;
    let photo = photoArr.slice(0, 1).shift();

    mapping.push({
      "promotion_id": value.id,
      'promotion_title': value.promotion_title,
      "photo_path": photo.url,
      "promotion_type": !value.promotion_type ? null : value.promotion_type.type_title,
      "category_id": !value.categoriess ? null : value.categoriess.category_id,
      "category_title": !value.categoriess ? null : value.categoriess.category_title,
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
