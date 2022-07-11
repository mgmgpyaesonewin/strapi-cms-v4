// const fs = require('fs');
// const { setupStrapi } = require('./helpers/strapi');
//
// /** this code is called once before any test */
// beforeAll(async done => {
//   await setupStrapi();
//   done();
// });
//
// /** this code is called after all the tests are finished */
// afterAll(done => {
//   const dbSettings = strapi.config.get('database.connections.default.settings');
//   //console.log(dbSettings);
//   done();
// });
//
// it('strapi is defined', () => {
//   expect(strapi).toBeDefined();
// });
// jest.setTimeout(30000)

const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');
/** this code is called once before any test */
beforeAll(async done => {
  await setupStrapi();
  done();
});
/** this code is called after all the tests are finished */
afterAll(async done => {
  const dbSettings = strapi.config.get('database.connections.default.settings');
  //This will delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});
//Run test to make sure Strapi is defined.
it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});

