const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pizzaScheme = new Schema({title: String, type: String, icon: String, content: JSON, is_new: Boolean, is_popular: Boolean, small_size: JSON}, {versionKey: false});
const Pizza = mongoose.model("Pizza", pizzaScheme);
const CONNECTION_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/pizzadb";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (err)=> {
    if(err) return console.log(err);
});

var Pizza_List = require("./Pizza_List.js");

module.exports.getPizzaList = () => {
    Pizza.find((err,doc)=> {
        if(err)  return console.log(err);
        return(doc);
    });
}