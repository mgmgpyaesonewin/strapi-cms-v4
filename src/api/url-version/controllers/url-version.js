'use strict';

/**
 *  url-version controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::url-version.url-version', ({strapi}) => ({
  async findEntityByName(ctx) {
    let {name} = ctx.params;
    return await strapi.service('api::url-version.url-version').findByName(name);
  },
}));
