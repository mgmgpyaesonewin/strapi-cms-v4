'use strict';

/**
 *  categoriess controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::categoriess.categoriess', ({strapi}) => ({


  async find(ctx) {

    let status = 'success';
    ctx.query = {...ctx.query, local: 'en'}
    const {data, meta} = await super.find(ctx);
    const entries = await strapi.entityService.findMany('api::categoriess.categoriess', {
      populate: 'deep',
      sort: {position: 'asc'},
      locale: ctx.query.locale
    });


    let responseMap = entries.map((value, index) => {
      let photoArr = value.photo_path;
      let photo = photoArr.slice(0, 1).shift();

      return {
        'category_id': value.category_id,
        //'category_id': value.id,
        'category_title': value.category_title,
        'photo_path': photo.url,
        'position': value.position
      }
    });

    return {status, responseMap};


  },

}));
