//THIRD PARTY MODULES
const express = require('express');
const app = express();
const {ObjectID} = require('mongodb'); 

//CUSTOM FILES
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

//PORT
const PORT = process.env.PORT || 3000;

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
        return res.status(404).send('Invalid ID');
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

//DELETE - ROUTE /todos/:id - REMOVE PARTICULAR TODO
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.listen(PORT, () => console.log(`Server Started At ${PORT} PORT`));

module.exports = {app};