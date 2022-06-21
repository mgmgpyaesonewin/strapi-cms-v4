'use strict';

/**
 *  api-version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils');
module.exports = createCoreController('api::api-version.api-version', ({ strapi }) => ({
  async findEntityByName(ctx) {
    let { name } = ctx.params;
    const entriesCategories = strapi.db.query('api::api-version.api-version').findMany({ // uid syntax: 'api::api-name.content-type-name'
      where: {
        entity: {
          $startsWith: name,
         
        },
      },
      select:['entity','version']
     
    });
     
    return entriesCategories;
  },
}));
