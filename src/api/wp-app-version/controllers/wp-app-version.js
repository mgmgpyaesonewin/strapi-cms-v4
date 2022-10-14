'use strict';

/**
 *  wp-app-version controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-app-version.wp-app-version');
