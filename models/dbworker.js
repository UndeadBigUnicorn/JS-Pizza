const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pizzaScheme = new Schema({
    title: String,
    type: String,
    icon: String,
    content: JSON,
    is_new: Boolean,
    is_popular: Boolean,
    small_size: JSON,
    big_size: JSON
}, {
    versionKey: false
});
const Pizza = mongoose.model("Pizza", pizzaScheme);
const CONNECTION_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/pizzadb";

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true
}, (err) => {
    if (err) return console.log(err);

    // mongoose.connection.db.dropDatabase();
});

var Pizza_List = require("./Pizza_List.js");

// Pizza_List.forEach((element)=>{
//     var pizza = new Pizza({title: element.title, type: element.type, icon: element.icon, content: element.content, is_new: element.is_new || false, is_popular: element.is_popular || false, small_size: element.small_size, big_size: element.big_size});
//     pizza.save((err)=>{
//         if (err) return console.log(err);
//     });
// });

module.exports.getPizzaList = (category, callback) => {
    if (category == "All") {
        Pizza.find((err, doc) => {
            if (err) return console.log(err);
            // console.log(doc);
            callback(doc);
        });
    } else if (category == "Vega") {
        Pizza.find({
            type: "Вега піца"
        }, (err, doc) => {
            if (err) return console.log(err);
            callback(doc);
        });
    } else if (category == "Sea") {
        Pizza.find({
            type: "Морська піца"
        }, (err, doc) => {
            if (err) return console.log(err);
            callback(doc);
        });
    } else if (category == "Meat") {
        Pizza.find({
            type: "М’ясна піца"
        }, (err, doc) => {
            if (err) return console.log(err);
            callback(doc);
        });
    } else if (category == "Pineapple") {
        Pizza.find({
            "content.pineapple": {
                $all: ['ананаси']
            }
        }, (err, doc) => {
            if (err) return console.log(err);
            callback(doc);
        });
    }  else if (category == "Mushrooms") {
        Pizza.find({
            "content.mushroom": {
                $all: ["шампінйони"]
            }
        }, (err, doc) => {
            if (err) return console.log(err);
            callback(doc);
        });
    }

}
