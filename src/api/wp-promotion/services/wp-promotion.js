'use strict';

/**
 * wp-promotion service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-promotion.wp-promotion');
