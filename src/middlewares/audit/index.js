// module.exports = (strapi) => {
//     return {
//       initialize() {
//         strapi.app.use(async (ctx, next) => {
//           await next();
//           console.log("######YES Audit###########");
//           await strapi.info("Yayy!, audit middleware rocks!")
//           console.log("#################");
//           strapi.log.debug(
//             `Method:${ctx.method}, URL: ${ctx.url}, status code: ${ctx.status}`

//           );
//           console.log("Middle wawre digger");
//         });
//       }
//     }
//   };

// // module.exports = (config, { strapi })=> {
// //     return (context, next) => {
// //         console.log("yay");
// //         console.log("#################");
// //     };
// //   };
   
// // module.exports = () => {
// //     return async (ctx, next) => {
// //       const start = Date.now();
  
// //       await next();
// //       console.log("yay");
// //               console.log("#################");
// //       const delta = Math.ceil(Date.now() - start);
// //       ctx.set('X-Response-Time', delta + 'ms');
// //     };
// //   };
   


module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      const start = Date.now();
  
      await next();
      console.log("yay");
               console.log("#################");
      const delta = Math.ceil(Date.now() - start);
  
      let headerName = config.headerName || 'X-Response-Time';
      ctx.set(headerName, delta + 'ms');
    };
  };
   