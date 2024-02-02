'use strict';

/**
 * wp-promotions-ad controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-promotions-ad.wp-promotions-ad', ({strapi}) => ({
    async find(ctx) {
      let types = ['NORMAL', 'SPECIAL'];
      let promotionType = ctx.query.promotionType;
      const promotionList = await strapi.service('api::wp-promotions-ad.wp-promotions-ad').find(ctx);
      var finalData;
      if (types.includes(ctx.query.promotionType)) {
        finalData = promotionList.filter(function (filterType) {
          return filterType.wp_promotion_type.type_title == ctx.query.promotionType;
        });
      } else {
        finalData = promotionList;
      }
      let promotions = responseMapping(finalData,ctx.request.header);
      return {promotions};
    },
  
    async filterByCategory(ctx, next) {
      let status = "Success";
      let {id} = ctx.params;
      const promotions = await strapi.service('api::wp-promotions-ad.wp-promotions-ad').filterByCategoryID(id);
      let responseMap = responseMapping(promotions,ctx.request.header);
      
      return {status, responseMap};
    },
  
  
    async findOne(ctx,requestHeader) {
      let status = "Success";
      const {id} = ctx.params;
      const {query} = ctx;
      const promotion = await strapi.service('api::wp-promotions-ad.wp-promotions-ad').findOne(id);
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
        "category": !value.wp_category ? {} : value.wp_category,
        // "include_header": value.include_header,
        "is_login": value.is_login,
        "kyc_level_check":value.kyc_level_check,
        "deeplink_id": value.wp_deeplink ? value.wp_deeplink.deeplink_id : null, 
        "feature_id": value.wp_feature_id ? value.wp_feature_id.feature_id : null, 
        "hasDetails": value.hasDetails,
        "promotion_details": value.promotion_details,
        "is_featured": value.is_featured,
        "paths": value.paths,
        "parameters": value.parameters,
        "widget_id": !value.wp_home_widget ? null : value.wp_home_widget.id,
        
      });
    });
    return mapping;
  
  }