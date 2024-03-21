'use strict';

/**
 * wp-home router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wp-home.wp-home');