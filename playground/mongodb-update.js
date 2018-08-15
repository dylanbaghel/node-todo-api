const { MongoClient, ObjectID } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.log('Unable To Connect To Mongo');
    }
    const db = client.db(dbName);

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b71402440ac3800f094ac34')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => console.log(result));

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b710da440ac3800f094a7c5')
    }, {
        $set: {
            name: "Abhishek"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => console.log(result));

});