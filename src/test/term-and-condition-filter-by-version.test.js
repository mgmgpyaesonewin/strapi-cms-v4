
const termAndCondition = require("./api/term-and-condition/term-and-condition.js");
test('Get term and condition by version', async () => {
    let version = '1.0.0';
    let response = await termAndCondition.fetchTermAndConditionDetail(version);
    let data = response.data;
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title.id');
    expect(data).toHaveProperty('title.en');
    expect(data).toHaveProperty('title.my');
    expect(data).toHaveProperty('title.zw');
    expect(data).toHaveProperty('content.id');
    expect(data).toHaveProperty('content.en');
    expect(data).toHaveProperty('content.my');
    expect(data).toHaveProperty('content.zw');
    expect(data).toHaveProperty('version',version);
    
});