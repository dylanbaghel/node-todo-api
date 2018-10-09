require('./config/config');

//THIRD PARTY MODULES
const express = require('express');
const app = express();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const cors = require('cors');

//CUSTOM FILES
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

//PORT
const PORT = process.env.PORT;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//ROUTES

//POST - ROUTE /todos
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((todo) => {
        res.status(200).send(todo);
    })
        .catch((e) => {
            res.status(400).send(e);
        })
});

//GET - ROUTE /todos - LIST ALL TODOS
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.status(200).send({ todos });
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//GET - ROUTE /todos/:id - LIST INDIVIDUAL TODO
app.get('/todos/:id', authenticate, (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo });
    })
        .catch((e) => {
            res.status(400).send(e);
        });
});

//DELETE - ROUTE /todos/:id - REMOVE PARTICULAR TODO
app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//PATCH - ROUTE /todos/:id - UPDATE PARTICULAR TODO
app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//POST - ROUTE /users - CREATE NEW USER
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//GET - ROUTE /users/me - GET AUTH User
app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user);
});

//POST - ROUTE /users/login - LOGIN USER
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
});

//DELETE - ROUTE /users/me/token - LOG OUT USER
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(PORT, () => console.log(`Server Started At ${PORT} PORT`));

module.exports = { app };