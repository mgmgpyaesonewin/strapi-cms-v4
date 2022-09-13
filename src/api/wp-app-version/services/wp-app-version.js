'use strict';

/**
 * wp-app-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wp-app-version.wp-app-version');
