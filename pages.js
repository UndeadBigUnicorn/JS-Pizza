/*
 * Created by chaika on 09.02.16.
 */

var db = require('./models/dbworker');

exports.mainPage = function(req, res) {
   let category = req.session.category || "All";
   db.getPizzaList((Pizza_List)=>{
        res.render('mainPage', {
            pageTitle: 'Вибір Піци',
            searchCategory: category,
            pizzas: Pizza_List
        });
    })
   
};

exports.orderPage = function(req, res) {
    //TODO: implement
};