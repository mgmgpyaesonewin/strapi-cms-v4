const Strapi = require("@strapi/strapi");
// let instance;
//
// async function setupStrapi() {
//   if (!instance) {
//     await Strapi().start();
//     instance = strapi;
//   }
//   return instance;
// }
const http = require('http');
let instance;
async function setupStrapi() {
  //console.log("here");
  if (!instance) {
    /** the following code is copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is now global
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods
    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}
module.exports = { setupStrapi };
