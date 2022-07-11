const axios = require('axios');
const promotion = require("./promotion");
// test('the data is peanut butter', async () => {
//   //it("should return users list", async () => {
//   let response = await promotion('http://localhost:1337/api');
//   console.log(response);
//   let promotions = response.data;
//   console.log(promotions);
//   expect(promotions).toHaveProperty('status');
//   expect(promotions).toHaveProperty('responseMap',[
//     'promotion_code'
//   ]
//   );
//   // });

// });

test('the data is peanut butter', async () => {
  const data = await promotion('http://localhost:1337/api');
  console.log(data.data);
  // expect(data.data).toHaveProperty('responseMap',[
  //   'promotion_code'
  // ]
  // );
  expect(data.data).toHaveProperty('responseMap[0].promotion_code');
});

