'use strict';

/**
 * single-promotion service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::single-promotion.single-promotion');
