const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"my-mongodb+srv-connection-string",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);
	if (user != null) {
		console.log("What is send to test : " + user._id, user.username, user.email);
		res.status(200).json({
			_id: user._id,
			name: user.username,
			email: user.email,
			//age: 18,
		})
	} else {
		console.log("Login Failed");
		res.status(401).json( {error : "Login Failed"} );
	}
})

app.post('/register', async (req, res) => {
	console.log(req.body);
	const user = await User.register(req.body.username, req.body.password, req.body.email);
	if (user != null ) {
		console.log("Register Successfully");
		res.status(200).json({
			_id: user._id,
			name: user.username,
			email: user.email,
			//age: 18,
		})
	} else {
		console.log("Register Failed");
		res.status(401).json( {error : "Register Failed"} );
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
