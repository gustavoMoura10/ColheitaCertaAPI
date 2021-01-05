const dotenv = require("dotenv");
dotenv.config();
const { default: Axios } = require("axios");
const faker = require("faker");

let token = "";
describe("user", () => {
  it("save new user api", async () => {
    let pass = faker.internet.password();
    let request = await Axios.post("http://localhost:3030/users/save", {
      email: faker.internet.email(),
      password: pass,
      confirmPassword: pass,
      type: "PRODUTOR",
    });
    request = await Axios.get("http://localhost:3030/auth/login", {
      email: request.data.email,
      password: pass,
    });
    expect(request.status).toBe(200);
  });
  it("Find by id", async () => {
    let request = await Axios.get("http://localhost:3030/auth/login", {
      email: 'gustavo.moura@unip.com',
      password: '12345678',
    });
     request = await Axios.get("http://localhost:3030/users/findByPk/1", {
      headers: {
        Authorization: `Bearer ${request.data.token}`,
      },
    });
    expect(request.status).toBe(200);
  });
  it("not allowed", async () => {
    try {
      const request = await Axios.get("http://localhost:3030/users/findByPk/1");
      expect(request.status).toBe(401);
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});
