
const termAndCondition = require("./api/mini-app/mini-app.js");
test('Get Mini App Category & Min App List', async () => {
    let response = await termAndCondition.fetchMiniApp();
    let data = response.data;

    let miniAppCategories = data.categories;
    let miniApp = data.mini_apps;
    expect.extend({
        alternativeURL(value) {
            expect(value).toBe([expect(value).toBeNull(), expect.any(String)]);
        },
      });
      
    expect(miniAppCategories).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                is_home: expect.any(Boolean),
                position: expect.any(Number),
                tag: expect.stringMatching('category'),
                title: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                icon: expect.any(String),
            })
        ])
    );
    expect(miniApp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                is_home: expect.any(Boolean),
                include_header: expect.any(Boolean),
                position: expect.any(Number),
                tag: expect.stringMatching('mini_app'),
                is_login: expect.any(Boolean),
                title: expect.objectContaining({
                    en: expect.any(String),
                    my: expect.any(String),
                    zw: expect.any(String)
                }),
                icon: expect.any(String),
                deep_link: expect.objectContaining({
                    name: expect.any(String),
                    deeplink: expect.any(String),
                    is_external: expect.any(Boolean),
                    is_webURL:expect.any(Boolean),
                   //alternative_url : expect.extend(toBeTypeOrNull(String)),
                   //alternative_url : expect(alternative_url === null || Number(alternative_url)).toBe(true),
                }),
            })
        ])
    );

});

