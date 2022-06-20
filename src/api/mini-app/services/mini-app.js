'use strict';

/**
 * mini-app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mini-app.mini-app');
