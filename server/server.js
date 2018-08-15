//THIRD PARTY MODULES
const express = require('express');
const app = express();


//CUSTOM FILES
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./db/todo');
const {User} = require('./db/todo');

//MIDDLEWARE
app.use(express.json());


//ROUTES

//POST - ROUTE /todos
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo) => {
        res.status(200).send(todo);
    })
    .catch((e) => {
        res.status(400).send(e);
    })
});



app.listen(3000, () => console.log('Server At 3000'));