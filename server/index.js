const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// Routes //

// POST - create a todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

// GET - get todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo');

		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});
// PUT - update a todo

// DELETE - delete a todo

app.listen(5000, () => {
	console.log('server has started on port 5000');
});
