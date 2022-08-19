
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
    /* Mini App Category */
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
    /* Mini App */
    expect(miniApp).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                is_home: expect.any(Boolean),
                include_header: expect.any(Boolean),
                position: expect.any(Number),
                tag: expect.stringMatching('mini_app'),
                is_login: expect.any(Boolean),
                screen_orientation : expect.toBeNullOrAny(String),
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
                    is_webURL: expect.any(Boolean),
                    alternative_url: expect.toBeNullOrAny(String), //key I may receive string or null
                    alternative_url_IOS: expect.toBeNullOrAny(String),
                    deeplink_IOS: expect.toBeNullOrAny(String),
                    client_id:expect.toBeNullOrAny(String),

                }),
                paths: expect.arrayContaining([
                    expect.objectContaining({
                        value_injector: expect.any(String),
                        position: expect.any(Number),
                        value : expect.toBeNullOrAny(String),

                    })
                ]),
                parameters: expect.arrayContaining([
                    expect.objectContaining({
                        query_param: expect.any(String),
                        value_injector: expect.any(String),

                    })
                ]),
                category_id: expect.any(Number),
                category_name: expect.any(String),
            })
        ])
    );
});

expect.extend({
    toBeNullOrAny(received, expected) {
        if (received === null) {
            return {
                pass: true,
                message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
            };
        }
        if (expected == String) {
            return {
                pass: typeof received == 'string' || received instanceof String,
                message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
            };
        }
    }
});