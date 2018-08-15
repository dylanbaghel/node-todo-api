//THIRD PARTY MODULES
const express = require('express');
const app = express();
const {ObjectID} = require('mongodb'); 

//CUSTOM FILES
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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

//GET - ROUTE /todos - LIST ALL TODOS
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos});
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//GET - ROUTE /todos/:id - LIST INDIVIDUAL TODO
app.get('/todos/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id Not Found');
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => console.log('Server At 3000'));

module.exports = {app};