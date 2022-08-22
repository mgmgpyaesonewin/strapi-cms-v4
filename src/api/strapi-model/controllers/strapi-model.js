'use strict';

/**
 *  strapi-model controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::strapi-model.strapi-model', ({strapi}) => ({
    async find(ctx) {
       return await strapi.entityService.findMany('api::strapi-model.strapi-model', {
            populate: 'deep',
       
          });
          
      //return  await strapi.service('api::strapi-model.strapi-model').find(ctx);
    }
  
  }));
  
