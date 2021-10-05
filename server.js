require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const PORT = process.env.PORT || 3000;
const validTokens = [];
const someData = [
	{
		name: 'Adarsh Chakraborty',
		password: 'Some password'
	},
	{
		name: 'Zomato',
		password: 'Some Zomato'
	},
	{
		name: 'Swiggy',
		password: 'Some Swiggy'
	}
];

// app.set('json spaces', 4);
app.use(express.json());

app.post('/login', (req, res, next) => {
	const { username } = req.body;
	if (!username) return sendStatus(401);
	const user = {
		name: username,
		password: '1234'
	};
	// What to serialize (user object), key (secret)
	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
	validTokens.push(refreshToken);
	res.json({ result: 'success', accessToken, refreshToken });
});

app.get('/users', validateToken, (req, res, next) => {
	res.json(someData);
});

app.post('/refreshtoken', (req, res, next) => {
	// taking the token property but I want to call it refreshToken.
	const { token: refreshToken } = req.body;
	if (!refreshToken) return res.sendStatus(401);

	if (!validTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}

	jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, user) => {
		if (err) return sendStatus(403);
		const accessToken = generateAccessToken({ name: user.name }); // user contains additional info like createdAt so we just need name
		res.json({ accessToken });
	});
});

function validateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}

		req.user = user;
		next();
	});
}

function generateAccessToken(user) {
	return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '2m' });
}
app.listen(PORT, () => {
	console.log('listening on PORT: ' + PORT);
});
