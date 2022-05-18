const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"my-mongodb+srv-connection-string",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})
	test("New user registration", async () => {
		const res = await User.register("tony", "123abc","tony@gmail.com");
		expect(res).toBe("user created");
	})

	test("Duplicate username", async () => {
		const res = await User.register("tony", "123abc","tony@gmail.com");
		expect(res).toBe("duplicate user name")
	})

	test("User login invalid username", async () => {
		const res = await User.login("useless name", "123abc")
		expect(res).toBe("invalid username")
	})

	test("User login invalid password", async () => {
		const res = await User.login("tony", "wrong password")
		expect(res).toBe("invalid password")
	})

	test("User login successfully", async () => {
		const res = await User.login("tony", "123abc")
		expect(res).toBe(true)
	})

	// test('should run', () => {
	// });
});
