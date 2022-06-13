'use strict';

/**
 * api-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::api-version.api-version');
