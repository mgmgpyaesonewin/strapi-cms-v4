'use strict';

/**
 * wp-feature-toggle router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wp-feature-toggle.wp-feature-toggle');
