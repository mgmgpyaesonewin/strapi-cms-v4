'use strict';

/**
 * wp-app-version router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wp-app-version.wp-app-version');
