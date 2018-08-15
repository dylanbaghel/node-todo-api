const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable To Connect To Mongo');
    }
    const db = client.db(dbName);

    //Delete One
    // db.collection('Todos').deleteOne({ text: 'Something To Do' }).then((result) => console.log(result));

    //DeleteMany
    // db.collection('Todos').deleteMany({ text: "Something To Do" }).then((result) => console.log(result));

    //FindOneand Delete
    // db.collection('Todos').findOneAndDelete({ text: "Second Todo"}).then((result) => console.log(result));

    // db.collection('Users').deleteOne({ age: 20 }).then((result) => console.log(result));
    // db.collection('Users').deleteMany({ age: 20 }).then((result) => console.log(result));
    db.collection('Users').findOneAndDelete({ location: "Philedalphia" }).then((result) => console.log(result));
});