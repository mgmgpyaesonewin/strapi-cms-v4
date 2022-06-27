'use strict';

/**
 * merchant-on-boarding service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-on-boarding.merchant-on-boarding');
