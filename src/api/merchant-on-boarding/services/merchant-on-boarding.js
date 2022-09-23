'use strict';

/**
 * merchant-on-boarding service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-on-boarding.merchant-on-boarding', ({strapi}) => ({
  async find(ctx) {
    const entries = await strapi.entityService.findMany('api::merchant-on-boarding.merchant-on-boarding', {
      populate: {
        submitButton:{
          populate:{
            label:true,
            labelStyle:true,
            iconUrl:true,
          }
        },
        guestButton:{
          populate:{
            label:true,
            labelStyle:true,
            iconUrl:true,
          }
        },
        indicator:true,
        pages: {
         populate: {
          image: {
            populate:{
              imageURL_en:true,
              imageURL_mm:true

            }
          },
          page_design: true,
          },
          sort: 'position:asc',
        },
      },
      publicationState: 'live',
    });
    return entries;
  },
  
}));

