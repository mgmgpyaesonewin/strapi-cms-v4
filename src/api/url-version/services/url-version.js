'use strict';

/**
 * url-version service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::url-version.url-version', ({strapi}) => ({
  async findByName(name) {

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

