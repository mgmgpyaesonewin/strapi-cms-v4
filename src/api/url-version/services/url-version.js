'use strict';

/**
 * url-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::url-version.url-version', ({ strapi }) => ({
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
  async findByURL(url) {

    return await strapi.db.query('api::url-version.url-version').findOne({
      select: ['url', 'version'],
      where: { url: url },
    });
  },
  async create(api_version_url, url, app) {

    return await strapi.entityService.create('api::url-version.url-version', {
      data: {
        url: url,
        version: api_version_url.attribute.version,
        publishedAt: new Date(),
        app: app,
      },
    });
  },
  async update(api_version_url, url, app) {

    return await strapi.db.query('api::url-version.url-version').update({
      where: { url: url },
      data: {
        version: api_version_url.attribute.version,
        publicationState: 'live',
        publishedAt: new Date(),
        app: app,
      },
    });
  },

  
}));

