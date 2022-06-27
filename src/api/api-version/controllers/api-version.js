'use strict';

/**
 *  api-version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils');
module.exports = createCoreController('api::api-version.api-version', ({ strapi }) => ({
  async findEntityByName(ctx) {
    let { name } = ctx.params;
    const entriesAPI = strapi.db.query('api::api-version.api-version').findMany({
      where: {
        entity: {
          $startsWith: name,

        },
      },
      select: ['entity', 'version']

    });

    return entriesAPI;
  },
}));
