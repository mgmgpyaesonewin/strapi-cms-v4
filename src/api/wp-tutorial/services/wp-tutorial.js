'use strict';

/**
 * wp-tutorial service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-tutorial.wp-tutorial');
