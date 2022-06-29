'use strict';

/**
 * wp-tutorial router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wp-tutorial.wp-tutorial');
