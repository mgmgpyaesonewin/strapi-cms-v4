'use strict';

/**
 * trail service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trail.trail', ({ strapi }) => ({
    async create(test) {
        return await strapi.entityService.create('api::trail.trail', {
            data: {
                "contentType": test.contentType,
                "action": test.action,
                "content": JSON.parse(JSON.stringify(test.content, removePasswords)),
                "author": test.author,
                "request": JSON.parse(JSON.stringify(test.request, removePasswords)),
                "method": test.method,
                "route": test.route,
                "params": test.params,
                "statusCode": test.statusCode
            },
        });
    }
}));

const removePasswords = (key, value) => key === "currentPassword" ? undefined : value;
