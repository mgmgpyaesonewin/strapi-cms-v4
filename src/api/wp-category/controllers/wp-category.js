'use strict';

/**
 *  wp-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-category.wp-category', ({ strapi }) => ({


  async find(ctx) {
    let status = 'Success';
    ctx.query = { ...ctx.query, local: 'en' }
    const { data, meta } = await super.find(ctx);
    const entries = await strapi.entityService.findMany('api::wp-category.wp-category', {
      populate: 'deep',
      publicationState: 'live',
      sort: { position: 'asc' },
      locale: (ctx.query.locale) ? ((ctx.query.locale == 'zw') ? ("my-MM") : (ctx.query.locale)) : 'en'
      // (condition1) ? ((condition2) ? (true block2)  : (else block2) ) : (else block1)
    });
    let responseMap = entries.map((value, index) => {
      let photoNormal = value.photo_path_normal.url;
      let photoSelected = value.photo_path_selected.url;

      return {
        'category_id': value.category_id,
        'category_title': value.category_title,
        'photo_path_normal': photoNormal,
        'photo_path_selected': photoSelected,
        'position': value.position
      }
    });
    return { status, responseMap };
  },


}));
