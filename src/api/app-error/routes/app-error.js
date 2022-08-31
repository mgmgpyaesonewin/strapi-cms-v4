'use strict';

/**
 * app-error router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::app-error.app-error');
