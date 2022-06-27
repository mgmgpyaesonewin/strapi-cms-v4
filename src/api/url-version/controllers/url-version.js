'use strict';

/**
 *  url-version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::url-version.url-version', ({ strapi }) => ({
  async findEntityByName(ctx) {
    let { name } = ctx.params;
    const entriesAPI = strapi.db.query('api::url-version.url-version').findMany({
      where: {
        app: {
          $containsi: name,

        },
      },
      select: ['url', 'version', 'app']

    });

    return entriesAPI;
  },
}));
