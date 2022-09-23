'use strict';

/**
 * wc-deeplink service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wc-deeplink.wc-deeplink');
