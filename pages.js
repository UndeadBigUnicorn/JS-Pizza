/*
 * Created by chaika on 09.02.16.
 */

var db = require('./models/dbworker');

exports.mainPage = function(req, res) {
   db.getPizzaList((Pizza_List)=>{
       console.log(2)
        res.render('mainPage', {
            pageTitle: 'Вибір Піци', 
            pizzas: Pizza_List
        });
    })
   
};

exports.orderPage = function(req, res) {
    //TODO: implement
};