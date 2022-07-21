
const termAndCondition = require("./api/merchant-home/home.js");
test('Get merchant home', async () => {
    let response = await termAndCondition.fetchHome();
    let data = response.data;

    expect(data).toEqual(
        expect.objectContaining({
            action_row: expect.objectContaining({
                position: expect.any(String),
            }),
        }),
        expect(data.action_row.items).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    width: expect.any(String),
                    title_en: expect.any(String),
                    isShow: expect.any(Boolean),
                    title_my: expect.any(String),
                    icon: expect.any(Object),
                })
            ])
        ),
        expect.objectContaining({
            what_new: expect.objectContaining({
                position: expect.any(String),
            }),
        }),
        expect(data.what_new.items).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    position: expect.any(String),
                    name: expect.any(String),
                    isPinned: expect.any(Boolean),
                    image: expect.any(Object),
                    title: expect.objectContaining({
                        en: expect.any(String),
                        my: expect.any(String),
                    }),
                    description: expect.objectContaining({
                        en: expect.any(String),
                        my: expect.any(String),
                    }),
                })
            ])
        ),

    );

});

