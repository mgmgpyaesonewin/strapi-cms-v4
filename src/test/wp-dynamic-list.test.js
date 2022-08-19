
const dynamicList = require("./api/wp-dynamic-list/wp-dynamic-list.js");
test('Get Wave Chanel localization contents List', async () => {
    let response = await dynamicList.fetchDynamicList();
    let data = response.data;
    expect(data).toHaveProperty('nrc');
    expect(data).toHaveProperty('send_money_denomintation');
    expect(data).toHaveProperty('cash_in_yoma_denomination');
    expect(data).toHaveProperty('cash_out_yoma_denomination');
    expect(data).toHaveProperty('mpu_denomination');
    expect(data).toHaveProperty('poi_types');
});

