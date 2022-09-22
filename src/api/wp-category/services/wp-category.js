'use strict';

/**
 * wp-category service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-category.wp-category', ({strapi}) => ({
  async find(ctx) {
    const categories = await strapi.entityService.findMany('api::wp-category.wp-category', {
      populate: {
        photo_path_selected:{
          select: ['url']
        },
        photo_path_normal:{
          select: ['url']
        },
        category_title:true,
        wp_promotions:true
      },
      publicationState: 'live',
      sort: {position: 'asc'},
      //locale: (ctx.query.locale) ? ((ctx.query.locale == 'zw') ? ("my-MM") : (ctx.query.locale)) : 'en'
      // (condition1) ? ((condition2) ? (true block2)  : (else block2) ) : (else block1)
    });
    return categories;
  }

}));
