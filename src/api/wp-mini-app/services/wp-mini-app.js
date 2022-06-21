'use strict';

/**
 * wp-mini-app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-mini-app.wp-mini-app');
