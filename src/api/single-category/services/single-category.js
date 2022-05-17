'use strict';

/**
 * single-category service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::single-category.single-category');
