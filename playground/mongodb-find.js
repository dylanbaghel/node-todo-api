const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable To connect To Mongo');
    }
    const db = client.db(dbName);

    // db.collection('Todos').find({ completed: false }).toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     })
    //     .catch((err) => console.log('Unable To Find Todos'));

    // db.collection('Todos').find().count()
    //     .then((count) => console.log('Todos Count: ', count))
    //     .catch((err) => console.log('Unable To Count Todos'));

    db.collection('Users').find({ name: "Abhishek Baghel" }).toArray()
        .then((docs) => {
            console.log('Todos')
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => console.log('Unable To Find Todos'));

    client.close();
});