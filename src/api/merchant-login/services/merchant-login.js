'use strict';

/**
 * merchant-login service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::merchant-login.merchant-login', ({strapi}) => ({
  async find(ctx) {
    const login = await strapi.entityService.findMany('api::merchant-login.merchant-login', {
      populate: {
        validations_create_pin: {
          populate: {
            error_message: true
          }
        },
        validations_msisdn: {
          populate: {
            error_message: true
          }
        },
        allowedLogin: true,
        signup_confirm_pin: {
          populate: {
            html_text: true,
          },
        },
        password_guide_dialog:{
          populate:{
            title:true,
            subtitle:true,
            rules:{
              populate:{
                title:true,
                items:true
              }
            }
          }
        },
        validations_confirm_pin:{
          populate:{
            error_message:true
          }
        },
        login_id_tf_validation:{
          populate:{
            error_message:true
          }
        }
      },
      publicationState: 'live',
    });
    return login;
  }
}));
