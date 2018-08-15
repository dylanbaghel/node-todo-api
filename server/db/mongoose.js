const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://dylan:anya2692@ds123012.mlab.com:23012/dylan-todo-api';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {  useNewUrlParser: true});

module.exports = {mongoose};