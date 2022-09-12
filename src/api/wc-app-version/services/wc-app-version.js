'use strict';

/**
 * wc-app-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-app-version.wc-app-version');
