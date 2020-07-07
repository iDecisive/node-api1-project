const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

const PORT = 8000;

let users = [
	{
		id: shortid.generate(), // hint: use the shortid npm package to generate it
		name: 'Jane Doe', // String, required
		bio: "Not Tarzan's Wife, another Jane", // String, required
	},
];

server.post('/api/users', (req, res) => {
	if (req.body.name === undefined || req.body.name === undefined) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		let newUser = {
			id: shortid.generate(),
			name: req.body.name,
			bio: req.body.bio,
		};

		users.push(newUser);

		res.json(users).status(201);
	}
});

server.get('/api/users', (req, res) => {
	res.json(users);
});

server.get('/api/users/:id', (req, res) => {
	let foundUser = users.filter((item) => item.id === req.params.id);

	res.json(foundUser);
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const deleted = users.find(item => item.id === id);

    users = users.filter(item => item.id !== id);

    res.json(deleted);
});

server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
