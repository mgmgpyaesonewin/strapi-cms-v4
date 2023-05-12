'use strict';

/**
 *  app controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
var crypto = require('crypto-js');

module.exports = createCoreController('api::app.app', ({ strapi }) => ({
    async find(ctx) {
        const entriesMiniAPP = await strapi.db.query('api::app.app').findMany({
            populate: {
                ["app_urls"]: {
                    select: ["url"],
                    populate: {
                        model: true,
                    },
                },
            },
            where: {
                publishedAt: {
                    $notNull: true,
                },
            },
        });
        return entriesMiniAPP;
    },
    async getToken(ctx) {
        let { name } = ctx.params;
        let hmacValue = ctx.request.headers.hashvalue;
        const getValue = strapi.config.get(`config.app.${name.toLowerCase()}`);
        var data = [
            getValue.client_id,
            getValue.client_secret
        ].join('');
        let secret_key = getValue.secret_key;
        var expectedHmacValue = crypto.HmacSHA256(data, secret_key).toString();
        let token = [];
        if (hmacValue === expectedHmacValue) {
            token = await strapi.service('api::app.app').findToken(name);
        }
        return {
            "data": token,
        };
    },
}));
