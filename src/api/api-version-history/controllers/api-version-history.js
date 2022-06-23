'use strict';

/**
 *  api-version-history controller
 */
const axios = require('axios');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::api-version-history.api-version-history', ({ strapi }) => ({

    async create(ctx) {

        if (ctx.request.body.model === 'api-version-history' || ctx.request.body.model === 'api-version') {
            return null;
        }

        if (ctx.request.body.model !== 'api-version-history' || ctx.request.body.model !== 'api-version') {
           
            const api_versions = await strapi.entityService.findMany('api::api-version.api-version', {
                filters: {
                    entity: {
                        $eq: ctx.request.body.model
                    }
                }
            });
            const api_version = {
                attribute: {
                    entity: ctx.request.body.model,
                    version: 1
                }
            };
            if (api_versions.length > 0) {

                api_version.attribute.version = ++api_versions[0].version;
            }

            const entry = await strapi.entityService.create('api::api-version-history.api-version-history', {
                data: {
                    entity: api_version.attribute.entity,
                    version: api_version.attribute.version,
                    response: ctx.request.body,
                },
            });

            const check_version = await strapi.db.query('api::api-version.api-version').findOne({
                where: { entity: api_version.attribute.entity },

            });
            if (!check_version) {
                const entry = await strapi.entityService.create('api::api-version.api-version', {
                    data: {
                        entity: api_version.attribute.entity,
                        version: api_version.attribute.version
                    },
                });
            } else {
                const entry = await strapi.db.query('api::api-version.api-version').update({
                    where: { entity: ctx.request.body.model },
                    data: {
                        entity: api_version.attribute.entity,
                        version: api_version.attribute.version
                    },
                });
            }

            /*
            axios.post('https://fcm.googleapis.com/fcm/send', {
                "to": process.env.NOTIFICATION_TO,
                "notification": {
                    "type": 1,
                    "title": "mixpanel testing6876876876",
                    "alert": "test1 mixpanel",
                    "extra": {
                        "paymentRequestId": "310924-1572420543082",
                        "client_id": "4f9b0470bf144ba4b03ccb74a4c81761"
                    },
                    "notification_id": "2",
                    "created_date": "1572443943"
                },
                "content_available": true
            }, {
                headers: {
                    'Authorization': process.env.NOTIFICATION_TOKEN
                }
            })
                .then(function (response) {
                    console.log("##########", process.env.NOTIFICATION_TO);
                    console.log(response.data);
                    console.log("##########", process.env.NOTIFICATION_TOKEN);

                })
                .catch(function (error) {
                    console.log(error);
                });
            */
           }
    }
}));
