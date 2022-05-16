let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("my-database-name").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, phone) {
		// TODO: Check if username exists
	    let user = await users.findOne({ "username": username });
		if (user) {
			return 'duplicate user name';
		} else {
		// TODO: Hash password
        const hashpassword = await bcrypt.hash(password, 10);
		// TODO: Save user to database
        await users.insertOne({"username": username, "password": hashpassword});
		return "user created";
		}
		// faker.js
		// return
	}

	static async login(username, password) {
		return users.findOne({
			"username":username
		}).then(async user => {
			// TODO: Check if username exists
			if(user) {
				// TODO: Validate password
				const match = await bcrypt.compare(password, user.password); 
				if(match) {
					return "login successful";
				}
				else {
					return "invalid password";
				}	
			}
			else {
				return "invalid username";
			}
		})

		// TODO: Return user object
		return user;

		// faker.js
		return
	}
}

module.exports = User;