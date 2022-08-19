
const termAndCondition = require("./api/merchant-term-and-condition/term-and-condition.js");
test('Get merchant term and condition', async () => {
    let response = await termAndCondition.fetchTermAndCondition();
    let data = response.data;
    expect(data.terms_html).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            en: expect.any(String),
            my: expect.any(String),
            version: expect.any(String)
        })
    );


});