'use strict';

/**
 *  api-version controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::api-version.api-version');

