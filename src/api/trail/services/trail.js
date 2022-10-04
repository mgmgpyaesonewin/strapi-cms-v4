'use strict';

/**
 * trail service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trail.trail', ({ strapi }) => ({
    async create(test) {
       // const obj = JSON.parse(test);
        // console.log('######################');
        // console.log(test.contentType);
        // console.log('######################');
        //return;
        return await strapi.entityService.create('api::trail.trail', {
            data: {
                "contentType": test.contentType,
                "action": test.action,
                "content":test.content,
                "author": test.author,
                "request": test.request,
                "method": test.method,
                "route": test.route,
                "params": test.params,
                "statusCode": test.statusCode
               
            },
        });
    }
}));
