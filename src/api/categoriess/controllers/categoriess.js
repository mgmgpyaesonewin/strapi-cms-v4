'use strict';

/**
 *  categoriess controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::categoriess.categoriess', ({ strapi }) => ({


  async find(ctx) {
    let status = 'Success';
    ctx.query = { ...ctx.query, local: 'en' }
    const { data, meta } = await super.find(ctx);
    const entries = await strapi.entityService.findMany('api::categoriess.categoriess', {
      populate: 'deep',
      publicationState: 'live',
      locale: (ctx.query.locale) ? ((ctx.query.locale == 'zw') ? ("my-MM") : (ctx.query.locale)) : 'en'
      // (condition1) ? ((condition2) ? (true block2)  : (else block2) ) : (else block1)
    });

    let responseMap = entries.map((value, index) => {
      let photoNormalArr = value.photo_path_normal;
      let photoNormal = photoNormalArr.slice(0, 1).shift();

      let photoSelectedArr = value.photo_path_selected;
      let photoSelected = photoSelectedArr.slice(0, 1).shift();

      return {
        'category_id': value.category_id,
        'category_title': value.category_title,
        'photo_path_normal': photoNormal.url,
        'photo_path_selected': photoSelected.url,
        'position': value.position
      }
    });

    return { status, responseMap };


  },


}));
