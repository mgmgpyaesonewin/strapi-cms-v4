'use strict';

/**
 *  wp-tutorial controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-tutorial.wp-tutorial', ({strapi}) => ({
  async findOne(ctx) {
    const {id} = ctx.params;
    let tutorial = await strapi.service('api::wp-tutorial.wp-tutorial').findOne(id);
    return {
      data:tutorial
    }
  },
  async find(ctx) {

    let tutorials = await strapi.service('api::wp-tutorial.wp-tutorial').find();
    return {
      data:tutorials
    }
  }
}));
