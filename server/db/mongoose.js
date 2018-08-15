const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://dylan:anya2692@ds123012.mlab.com:23012/dylan-todo-api';
const LOCAL_URI = 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {  useNewUrlParser: true});

module.exports = {mongoose};