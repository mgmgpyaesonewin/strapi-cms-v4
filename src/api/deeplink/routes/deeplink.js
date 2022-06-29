'use strict';

/**
 * deeplink router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::deeplink.deeplink');
