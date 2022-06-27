'use strict';

/**
 * url-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::url-version.url-version');
