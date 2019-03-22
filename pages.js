/*
 * Created by chaika on 09.02.16.
 */

var db = require('./models/dbworker');

exports.mainPage = function(req, res) {
   let category = req.session.category || "All";
   db.getPizzaList(category,(Pizza_List)=>{
        res.render('mainPage', {
            pageTitle: 'Вибір Піци',
            searchCategory: category,
            pizzas: Pizza_List
        });
    })
   
};

exports.category = function(req,res) {
    req.session.category = req.params.category;
    res.redirect('/');
};

exports.orderPage = function(req, res) {
    res.render('orderPage',{
        pageTitle: 'Оформлення замовлення'
    });
};