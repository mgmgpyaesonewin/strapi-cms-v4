'use strict';

/**
 * deeplink service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::deeplink.deeplink');
