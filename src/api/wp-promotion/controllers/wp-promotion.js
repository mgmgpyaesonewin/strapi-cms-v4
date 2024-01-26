'use strict';

const {default: entityService} = require('@strapi/strapi/lib/services/entity-service');

/**
 *  wp-promotion controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-promotion.wp-promotion', ({strapi}) => ({
  async find(ctx) {
    let status = "Success";
    let types = ['NORMAL', 'SPECIAL'];
    let promotionType = ctx.query.promotionType;
    const promotionList = await strapi.service('api::wp-promotion.wp-promotion').find(ctx);
    var finalData;
    if (types.includes(ctx.query.promotionType)) {
      finalData = promotionList.filter(function (filterType) {
        return filterType.wp_promotion_type.type_title == ctx.query.promotionType;
      });
    } else {
      finalData = promotionList;
    }
    let promotions = responseMapping(finalData,ctx.request.header);
    return {status, promotions};
  },

  async filterByCategory(ctx, next) {
    let status = "Success";
    let {id} = ctx.params;
    const promotions = await strapi.service('api::wp-promotion.wp-promotion').filterByCategoryID(id);
    let responseMap = responseMapping(promotions,ctx.request.header);
    
    return {status, responseMap};
  },


  async findOne(ctx,requestHeader) {
    let status = "Success";
    const {id} = ctx.params;
    const {query} = ctx;
    const promotion = await strapi.service('api::wp-promotion.wp-promotion').findOne(id);
    if(promotion){    
      const responseMap = {
      promotion_id: promotion.id,
      photo_path: promotion.photo_path ? promotion.photo_path.url : '',
      promotion_type: !promotion.wp_promotion_type ? '' : promotion.wp_promotion_type.type_title,
      category_id: !promotion.wp_category ? '' : promotion.wp_category.category_id,
      category_title: !promotion.wp_category ? '' : promotion.wp_category.category_title,
      hasDetails: promotion.hasDetails,
      action_link_ios: promotion.action_link_ios,
      action_link_android:  ctx.request.header.versioncode ? promotion.new_action_link_android :promotion.action_link_android , 
      promotion_title: promotion.promotion_title,
      position: promotion.position,
      promotion_code: promotion.promotion_code,
      is_external: promotion.is_external,
      external_deeplink: promotion.external_deeplink,
      promotion_details: promotion.promotion_details,
      kyc_level_check:promotion.kyc_level_check
    };
    return {status, responseMap};
  }
 }

}));

function responseMapping(promotionEntries,requestHeader) {
  let mapping = [];
  promotionEntries.map((value, index) => {
    mapping.push({
      "id": value.id,
      "position": value.position,
      "title": value.title,
      "photo_path": value.photo_path ? value.photo_path.url : '',
      "promotion_type": !value.wp_promotion_type ? '' : value.wp_promotion_type.type_title,
      "category": !value.wp_category ? {} : value.wp_category,
      // "category_id": !value.wp_category ? '' : value.wp_category.id,
      // "category_title": !value.wp_category ? '' : value.wp_category.category_title,
      "include_header": value.include_header,
      "is_login": value.is_login,
      "display": value.display,
      "kyc_level_check":value.kyc_level_check,
      "deep_link": value.wp_deeplink, 
      "feature_id": !value.wp_feature_id ? null : value.wp_feature_id.feature_id, 
      "hasDetails": value.hasDetails,
      "action_link_ios": value.action_link_ios,
      "action_link_android": requestHeader.versioncode ? value.new_action_link_android : value.action_link_android,
      "promotion_code": value.promotion_code,
      "is_external": value.is_external,
      "external_deeplink": value.external_deeplink,
      "promotion_details": value.promotion_details,
      "paths": value.paths,
      "parameters": value.parameters,
      "widget_id": !value.wp_home_widget ? null : value.wp_home_widget.id,
      
    });
  });
  return mapping;

}

