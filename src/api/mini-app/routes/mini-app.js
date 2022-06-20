'use strict';

/**
 * mini-app router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::mini-app.mini-app');
