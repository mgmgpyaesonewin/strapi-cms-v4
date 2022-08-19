
const termAndCondition = require("./api/term-and-condition/term-and-condition.js");
test('Get WP term and condition', async () => {
    let response = await termAndCondition.fetchTermAndCondition();
    let data = response.data;
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: expect.objectContaining({
                id: expect.any(Number),
                en: expect.any(String),
                my: expect.any(String),
                zw: expect.any(String),
            }),
            content: expect.objectContaining({
                id: expect.any(Number),
                en: expect.any(String),
                my: expect.any(String),
                zw: expect.any(String),
            }),
            version : expect.any(String)
        })
    );
});