'use strict';

/**
 *  wp-term-and-condition controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wp-term-and-condition.wp-term-and-condition', ({strapi}) => ({

  async version(ctx) {
    const data= await strapi.service('api::wp-term-and-condition.wp-term-and-condition').findByVersion(ctx);
    if(data){
      data.version = data.wp_version.version;
      delete data.wp_version;
    }
    return data;
  },
  async find(ctx) {
    const terms= await strapi.service('api::wp-term-and-condition.wp-term-and-condition').find(ctx);
    if (terms.length > 0) {
      terms.map(term => {
        term.version = !!term.wp_version ? term.wp_version.version : '';
        delete term.wp_version;
      });
    }
    return terms;
  }

}));
