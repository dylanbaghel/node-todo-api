const env = process.env.NODE_ENV || 'development';
console.log('env *******', env);
if (env === 'development') {
    process.env.PORT = 3000;
    MONGO_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
    process.env.PORT = 3000;
    MONGO_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if(env === 'production') {
    MONGO_URI = 'mongodb://dylan:anya2692@ds123012.mlab.com:23012/dylan-todo-api';
}

