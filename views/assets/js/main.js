$(function () {

    const ORDER_ITEM_TEMPLATE = $("#order-item-template");
//localStorage only supports strings. Use JSON.stringify() and JSON.parse().
    if (!localStorage["pizzas"] || localStorage["pizzas"]=="[]") {
        $("#order-amount").text("0");
        $("#order-list-is-empty").show();
        localStorage["pizzas"] = "";
    } else {
        renderAllPizzas("refresh", 0);
    }

    $(document).on('click', '.btn-buy-small', (event) => {
        add_item(event, "small");
    });

    $(document).on('click', '.btn-buy-big', (event) => {
        add_item(event, "big");
    });

    function add_item(event, size) {
        let _id = $(event.target).data("id");
        let index = getPizzaById(_id, size);
        let img_path = $(event.target).closest(".pizza-card").find(".pizza-img").attr("src");
        let order_item_clone = ORDER_ITEM_TEMPLATE.clone();
        let title = $(event.target).closest(".pizza-card").find(".pizza-title").text();

        if (size == "small") {
            title += " (Мала)";
            var pizza_size = $(event.target).closest(".pizza-card").find(".pizza-sizes-small").find(".pizza-size").text();
            var pizza_weight = $(event.target).closest(".pizza-card").find(".pizza-sizes-small").find(".pizza-weight").text();
            var pizza_price = $(event.target).closest(".pizza-card").find(".pizza-sizes-small").find(".pizza-price").text();
        } else {
            title += " (Велика)";
            var pizza_size = $(event.target).closest(".pizza-card").find(".pizza-sizes-big").find(".pizza-size").text();
            var pizza_weight = $(event.target).closest(".pizza-card").find(".pizza-sizes-big").find(".pizza-weight").text();
            var pizza_price = $(event.target).closest(".pizza-card").find(".pizza-sizes-big").find(".pizza-price").text();
        }

        if (index != -1) {
            let pizzas = JSON.parse(localStorage["pizzas"]);
            let amount = pizzas[index].amount;
            pizzas[index].amount = ++amount;
            localStorage["pizzas"] = JSON.stringify(pizzas);
            // let total_price = Number($("#total-price").text());
            // total_price += Number(pizza_price);
            // $("#total-price").text(total_price);
            // let total_amount = Number($("#order-amount").text());
            // $("#order-amount").text(++total_amount);
            renderAllPizzas("loaded", pizza_price);
            return;
        } else {
            let pizzas = [];
            if (localStorage["pizzas"]=="" || localStorage["pizzas"]=="[]") {
                pizzas.push({
                    id: _id,
                    size: size,
                    title: title,
                    pizza_size: pizza_size,
                    pizza_weight: pizza_weight,
                    pizza_price: pizza_price,
                    amount: 1,
                    img_path: img_path
                });
            } else {
                pizzas = JSON.parse(localStorage["pizzas"]);
                pizzas.push({
                    id: _id,
                    size: size,
                    title: title,
                    pizza_size: pizza_size,
                    pizza_weight: pizza_weight,
                    pizza_price: pizza_price,
                    amount: 1,
                    img_path: img_path
                });
        }   
            localStorage["pizzas"] = JSON.stringify(pizzas);
            let total_price = Number($("#total-price").text());
            total_price += Number(pizza_price);
            $("#total-price").text(total_price);
            let total_amount = Number($("#order-amount").text());
            $("#order-amount").text(++total_amount);

        }

        renderItem(order_item_clone, {
            id: _id,
            title: title,
            size: size,
            amount: 1,
            pizza_size: pizza_size,
            pizza_weight: pizza_weight,
            pizza_price: pizza_price,
            img_path: img_path
        });

    }

    function addItemToList(element, mode) {
        let order_item_clone = ORDER_ITEM_TEMPLATE.clone();
        let total_price = Number($("#total-price").text());

        if(mode=="refresh"){
            total_price += Number(element.pizza_price)*Number(element.amount);
            $("#total-price").text(total_price);
            let total_amount = Number($("#order-amount").text())+Number(element.amount);
            $("#order-amount").text(total_amount);
        }

        renderItem(order_item_clone, {
            id: element.id,
            size: element.size,
            title: element.title,
            amount: element.amount,
            pizza_size: element.pizza_size,
            pizza_weight: element.pizza_weight,
            pizza_price: element.pizza_price,
            img_path: element.img_path
        });

    }

    function renderItem(item, variables) {
        $("#order-list-is-empty").hide();
        let amount = variables.amount;
        // let total_amount = Number($("#order-amount").text());
        // $("#order-amount").text(++total_amount);
        item.find(".item-id").val(variables.id);
        item.find(".item-title").text(variables.title);
        item.find(".item-pizza-size").text(variables.pizza_size);
        item.find(".item-pizza-weight").text(variables.pizza_weight);
        item.find(".item-price").text(variables.pizza_price);
        item.find(".item-image").text(variables.img_path);
        item.find(".amount").text(amount);
        item.show();
        $("#order-list").append(item);

        // let total_price = Number($("#total-price").text());
        // total_price += Number(variables.pizza_price);
        // $("#total-price").text(total_price);

        let index = getPizzaById(variables.id, variables.size);
        item.find(".increment").click(() => {
            let total_price = Number($("#total-price").text());
            total_price += Number(variables.pizza_price);
            $("#total-price").text(total_price);
            let total_amount = Number($("#order-amount").text());
            $("#order-amount").text(++total_amount);
            amount++;
            $(item).find(".second-column").find(".amount").text(amount);
            let pizzas = JSON.parse(localStorage["pizzas"]);
            pizzas[index].amount = amount;
            localStorage["pizzas"] = JSON.stringify(pizzas);
        });

        item.find(".decrement").click(() => {
            let total_price = Number($("#total-price").text());
            total_price -= Number(variables.pizza_price);
            $("#total-price").text(total_price);
            let total_amount = Number($("#order-amount").text());
            $("#order-amount").text(--total_amount);
            amount--;
            if (amount == 0) {
                item.hide();
                let pizzas = JSON.parse(localStorage["pizzas"]);
                pizzas.splice(index, 1);
                localStorage["pizzas"] = JSON.stringify(pizzas);
            } else {
                $(item).find(".second-column").find(".amount").text(amount);
                let pizzas = JSON.parse(localStorage["pizzas"]);
                pizzas[index].amount==amount;
                localStorage["pizzas"] = JSON.stringify(pizzas);
            }
        });

        item.find(".button-remove").click(() => {
            let total_price = Number($("#total-price").text());
            total_price -= Number(variables.pizza_price) * amount;
            $("#total-price").text(total_price);
            let total_amount = Number($("#order-amount").text());
            total_amount -= amount;
            $("#order-amount").text(total_amount);
            item.hide();
            let pizzas = JSON.parse(localStorage["pizzas"]);
            pizzas.splice(index, 1);
            localStorage["pizzas"] = JSON.stringify(pizzas);
        });
    }

    $("#clear-right-column").click(() => {
        localStorage["pizzas"]="";
        $("#order-list").text("");
        $("#total-price").text("0");
        $("#order-amount").text("0");
    });

    function getPizzaById(id, size) {
        if(localStorage["pizzas"]=="" || localStorage["pizzas"]=="[]"){
            return -1;
        }
        let pizzas = JSON.parse(localStorage["pizzas"]);
        for (var i = 0; i < pizzas.length; i++) {
            if (pizzas[i].id == id && pizzas[i].size == size) {
                return i;
            }
        }
        return -1;
    }

    function renderAllPizzas(mode, price) {
        $("#order-list").text("");
        if(mode=="loaded"){
            let total_amount = Number($("#order-amount").text());
            total_amount++;
            $("#order-amount").text(total_amount);
            let total_price = Number($("#total-price").text())+Number(price);
            $("#total-price").text(total_price);
        } else {
            $("#order-amount").text("0");
            $("#total-price").text("0");
        }
        $("#total-amount").text("0");
        let pizzas = JSON.parse(localStorage["pizzas"]);
        pizzas.forEach((element) => {
            addItemToList(element, mode);
        });
    }

});