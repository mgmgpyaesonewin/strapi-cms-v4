'use strict';

/**
 * wp-mini-app router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wp-mini-app.wp-mini-app');
