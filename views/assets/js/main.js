$(function () {

    const ORDER_ITEM_TEMPLATE = $("#oreder-item-template");

    if(!localStorage.pizzas) {
        $("#order-amount").text("0");
        $("#order-list").text("Ви ще не зробили замовлення.");
    } else {
        localStorage.pizzas.forEach( (element) => {
          addItemToList(element);
        });
    }

    $(document).on('click' , '.btn-buy-small', (event)=>{
        add_item(event, "small");
    }); 
    
    $(document).on('click' , '.btn-buy-big', (event)=>{
        add_item(event, "big");
    });   

    function add_item(event, size) {
        console.log(2);
        let _id = $(event.target).data("id");
        let img_path = $(event.target).closest(".pizza-card").find(".pizza-img").attr("src");
        let order_item_clone = ORDER_ITEM_TEMPLATE.clone();
        let title = $(event.target).closest(".pizza-card").find(".pizza-title").text();

        if(size == "small"){
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

        renderItem(order_item_clone, {
            _id : id,
            title: title,
            pizza_size: pizza_size,
            pizza_weight: pizza_weight,
            pizza_price: pizza_price,
            img_path: img_path
        });
      
    }

    function addItemToList(element) {
        let order_item_clone = ORDER_ITEM_TEMPLATE.clone();
        if(element.size == "small"){
            title += " (Мала)";
        } else {
            title += " (Велика)";
        }

        renderItem(order_item_clone, {
            _id : element.id,
            title: title,
            pizza_size: element.pizza_size,
            pizza_weight: element.pizza_weight,
            pizza_price: element.pizza_price,
            img_path: element.img_path
        });

    }

    function renderItem(item, variables) {
        item.find(".item-id").val(variables.id);
        item.find(".item-title").text(variables.title);
        item.find(".item-pizza-size").text(variables.pizza_size);
        item.find(".item-pizza-weight").text(variables.pizza_weight);
        item.find(".item-price").text(variables.pizza_price);
        item.find(".item-image").text(variables.img_path);
        item.show();
        $("#order-list").append(item);

        let amount = 1;
        item.find(".increment").click(()=> {
            let total_price = Number($("#total-price").text());
            total_price += variables.pizza_price;
            amount++;
            $(this).closest(".second-column").find(".amount").text(amount);
        });

        item.find(".decrement").click(()=> {
            let total_price = Number($("#total-price").text());
            total_price -= variables.pizza_price;
            amount--;
            if(amount == 0){
                item.hide();
            } else {
                $(this).closest(".second-column").find(".amount").text(amount);
            }
        });

        item.find(".button-remove").click(()=> {
            let total_price = Number($("#total-price").text());
            total_price -= variables.pizza_price * amount;
            item.hide();
        });
    }

	var PRODUCT_TEMPLATE_RIGHT = $('#product-item-right');
	var PRODUCT_TEMPLATE_LEFT = $('#product-item-left');

    
	function add_item(productName) {
        
		var left_clone = PRODUCT_TEMPLATE_LEFT.clone();
		var right_clone = PRODUCT_TEMPLATE_RIGHT.clone();
        
		left_clone.find('.title').text(productName);
		right_clone.find('#lable').text(productName);
		left_clone.show();
		right_clone.show();
        
		$('.left').append(left_clone);
		$('#still').append(right_clone);
        var amount = 1;
		left_clone.find('.plus').click(function(){
            amount++;
            if (amount > 1)
            	left_clone.find('.minus').css('background', 'red');
            $(this).closest('.column').find('.amount').text(amount);
            right_clone.find('.circular-amount').text(amount);
		});
        
        left_clone.find('.minus').click(function(){
        	if (amount < 2)
        		return;
            amount--;
            if (amount < 2)
            	$(this).css('background', ' #ff8181');
            $(this).closest('.column').find('.amount').text(amount);
            right_clone.find('.circular-amount').text(amount);
		});
        
        left_clone.find('.button-delete').click(function(){
            left_clone.hide();
            right_clone.hide();
        });
        
        left_clone.find('.button-buy').click(function(){
            left_clone.find('.plus').hide();
        	left_clone.find('.minus').hide();
        	left_clone.find('.button-buy').hide();
        	left_clone.find('.button-delete').hide();
        	left_clone.find('.not-buy').show();
        	left_clone.find('.title').html('<s>' + productName + '</s>');
        	right_clone.find('#lable').html('<s>' + productName + '</s>');
            $('#bought').append(right_clone);
        });

        left_clone.find('.not-buy').click(function(){
            left_clone.find('.plus').show();
        	left_clone.find('.minus').show();
        	left_clone.find('.button-buy').show();
        	left_clone.find('.button-delete').show();
        	left_clone.find('.not-buy').hide();
        	right_clone.find('#lable').html(productName);
        	left_clone.find('.title').html(productName);
            $('#still').append(right_clone);
        });
	}

	add_item("Помідори");
	add_item("Морква");
	add_item("Сир");

	$('#add-button').click(function(){
		var productName = $('#product-name').val();
		$('#product-name').val('');
		add_item(productName);
	});

	$(document).keypress(function (e) {
    if (e.which == 13) {
            $("#add-button").click();
    }
});


});