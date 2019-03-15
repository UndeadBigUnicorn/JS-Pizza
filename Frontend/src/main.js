/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var templates = require("./Templates");

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    

});