
const localization = require("./api/wp-localization-contents/wc-localization-contents.js");
test('Get Wave Pay localization contents List', async () => {
    let response = await localization.fetchLocalizationList();
    let data = response.data;
    expect(data.contents).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                key: expect.any(String),
                type: expect.any(String),
                value: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                })
            })
        ])
    );
});

