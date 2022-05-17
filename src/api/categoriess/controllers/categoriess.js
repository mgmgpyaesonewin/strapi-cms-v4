'use strict';

/**
 *  categoriess controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::categoriess.categoriess',({ strapi }) =>  ({

  
    async find(ctx) {
       
        let status = 'success';
        ctx.query = { ...ctx.query, local: 'en' }
        const { data, meta } = await super.find(ctx);
       
        // let responseMap=[];

        // data.forEach((value, index) => {
        //     let photoArr = value.attributes.photo_path.data;
        //     let photo = photoArr.slice(0, 1).shift();
        
        //     responseMap.push({
        //         'category_id': value.id,
        //         'category_title': value.attributes.category_title,
        //         'photo_path': photo.attributes.formats.thumbnail.url
                
        //     });
        // });

        let responseMap = data.map((value, index) => {

            let photoArr = value.attributes.photo_path.data;
            let photo = photoArr.slice(0, 1).shift();

            return {
                'category_id': value.id,
                'category_title': value.attributes.category_title,
                'photo_path': photo.attributes.formats.thumbnail.url
            }
        });

        return {status,responseMap,meta};

       
      },
    

    /*
      async find(ctx) {
         
        // some custom logic here
        ctx.query = { ...ctx.query, local: 'en' }
        const { data, meta } = await super.find(ctx);
        //console.log(,data);
        let responseMap=[];

        
        data.forEach(function callback(value, index) {
            let photoArr = value.attributes.photo_path.data;
            let photo = photoArr.slice(0, 1).shift();
           // console.log(photo);
            //console.log(photo.attributes.formats.thumbnail.url,"first");
            
            responseMap.push({
                'category_id': value.id,
                'category_title': value.attributes.category_title,
                'photo_path': photo.attributes.formats.thumbnail.url
                
            });
        });
          return {responseMap,meta};

      },
     */
}));