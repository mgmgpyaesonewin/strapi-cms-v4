'use strict';

/**
 *  wp-category controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-category.wp-category', ({strapi}) => ({
  async find(ctx) {
    let status = 'Success';
    const categories = await strapi.service('api::wp-category.wp-category').find(ctx);
    let responseMap = categories.map((value, index) => {
      let photoNormal = value.photo_path_normal ? value.photo_path_normal.url : '';
      let photoSelected = value.photo_path_selected ? value.photo_path_selected.url :'';
      return {
        'category_id': value.id,
        'category_title': value.category_title,
        'photo_path_normal': photoNormal,
        'photo_path_selected': photoSelected,
        'position': value.position
      }
    });
    return {status, responseMap};
  },
}));
