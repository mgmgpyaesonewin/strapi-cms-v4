'use strict';

/**
 * wp-category service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-category.wp-category');
