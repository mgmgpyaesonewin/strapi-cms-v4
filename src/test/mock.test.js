const axios = require('axios');
const promotion = require("./promotion");

//jest.mock("axios");

describe("fetchPromotion", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
      let response = await promotion('http://localhost:1337/api');
      expect(response.data).toMatchSnapshot();
    });
  });

  // describe("when API call fails", () => {
  //   it("should return empty users list", async () => {
  //     // given
  //     const message = "Network Error";
  //     axios.get.mockRejectedValueOnce(new Error(message));
  //
  //     // when
  //     const result = await fetchPromotions();
  //
  //     // then
  //     expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
  //     expect(result).toEqual([]);
  //   });
  // });
});
