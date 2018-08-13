const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log("Unable To Connect To Mongo Server");
    }
    console.log('Connected To Mongo');
    const db = client.db(dbName);

    // db.collection('Todos').insertOne({
    //     text: 'Something To Do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable To Insert Todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Abhishek Baghel',
        age: 20,
        location: 'Gwalior'
    }, (err, result) => {
        if (err) {
            return console.log('Unable To Insert User', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});