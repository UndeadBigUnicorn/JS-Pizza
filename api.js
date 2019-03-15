/**
 * Created by chaika on 09.02.16.
 */
var db = require('./models/dbworker');

exports.getPizzaList = function(req, res) {
    db.getPizzaList((Pizza_List)=>{
        res.send(Pizza_List);
    })
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};