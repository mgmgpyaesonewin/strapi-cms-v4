'use strict';

/**
 * app-url router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::app-url.app-url');
