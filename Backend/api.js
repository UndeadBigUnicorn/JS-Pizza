/**
 * Created by chaika on 09.02.16.
 */
var db = require('./models/dbworker');

console.log(db);
exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};