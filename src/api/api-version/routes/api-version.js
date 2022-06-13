'use strict';

/**
 * api-version router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::api-version.api-version');
