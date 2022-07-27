
const termAndCondition = require("./api/merchant-term-and-condition/term-and-condition.js");
test('Get merchant term and condition', async () => {
    let response = await termAndCondition.fetchTermAndCondition();
    let data = response.data;
    expect(data).toHaveProperty('terms_html.id');
    expect(data).toHaveProperty('terms_html.en');
    expect(data).toHaveProperty('terms_html.my');
    expect(data).toHaveProperty('terms_html.version');
    
});