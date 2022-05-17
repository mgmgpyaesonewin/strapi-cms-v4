'use strict';

/**
 *  single-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::single-category.single-category', ({ strapi }) => ({
    async find(ctx) {

        let status = "success";
        const { data, meta } = await super.find(ctx);
        //return data;
        console.log(ctx.request.querystring);
        let param = ctx.request.querystring;
        let isInclude = param.includes("populate=deep");
        console.log(isInclude);
        if (isInclude) {
            let responseMap = [];
            data.map((value, index) => {
                let imageArr = value.attributes.image;

                imageArr.map((imageValue, imageIndex) => {
                    let photoArr = imageValue.photo_path.data;
                    let photo = photoArr.attributes.url;
                    responseMap.push({
                        'category_id': imageValue.id,
                        'category_title': imageValue.category_title,
                        'photo_path': photoArr.attributes.url

                    });
                    //console.log(imageValue, "image value");
                    //console.log(photoArr.attributes.url);
                });

            });
            return { status, responseMap };

        }
        return data;



    },



}));
