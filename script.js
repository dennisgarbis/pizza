// This program will allow the user to order pizzas. They will select the order type, size of pizza, and the toppings included. Then they will submit a form that includes their personal information.


"use strict"

const personal = 6;
const small = 9;
const medium = 12;
const large = 14;

const pizzasArray = [];

// debugger;

window.addEventListener("load", function () {
    document.getElementById("checkoutBtn").addEventListener("click", checkoutBtn);
    document.getElementById("checkoutBtn").addEventListener("click", dataPizza);
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("submitOrder").addEventListener("click", submitBtn);
    document.getElementById("order").addEventListener("click", getType);
    document.getElementById("resetBtn").addEventListener("click", reset);
    document.getElementById("form").addEventListener("input", getPizza);
    document.getElementById("addPizzaBtn").addEventListener("click", validateAddButton);
    document.getElementById("addPizzaBtn").addEventListener("click", addPizza);

    let elements = document.getElementsByClassName("form-control");

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("focus", inputChange);
        elements[i].addEventListener("input", inputInput);
    }
    // document.getElementById("submitOrder").addEventListener("focus", submitFocus);
    document.getElementById("submitOrder").addEventListener("click", submitClick);

});

function getPizza() {
    let orderType = getType();
    let pizzaSize = getSize();
    let toppings = getToppings();
    let total = getPriceSize();
    let toppingTotal = getPriceToppings()
    let subtotal = getSubtotal(total, toppingTotal);
    let tax = getTax(subtotal);
    let totalPrice = getTotalPrice(subtotal, tax)
    displayPizza(orderType, pizzaSize, toppings, subtotal, tax, totalPrice);
};

function validateAddButton() {
    let orderType = getType();
    let pizzaSize = getSize();
    let toppings = getToppings();

    let error = "";
    if (orderType == "") {
        error = "-- Select an order type --";
    } else if (pizzaSize == "") {
        error = "-- Select a pizza size --";
    } else if (toppings.length == 0) {
        error = "-- Select a topping --";
    }
    document.getElementById("error").innerHTML = error;
    if (error == "") {
        document.getElementById("addPizzaBtn").disabled = false;
        document.getElementById("checkoutBtn").disabled = false;
    } else {
        document.getElementById("checkoutBtn").disabled = true;
    } return;
};


function inputChange() {
    //document.activeElement.select();
    displayPrompt();
    checkButtons();
}

//getting the pizza type
function getType() {
    let type = document.getElementsByName("orderType");
    let orderType = "";
    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            orderType = type[i].value;
        }
    } return orderType;
}

//getting the pizza size
function getSize() {
    let size = document.getElementsByName("pizzaSize");
    let pizzaSize = "";
    for (let i = 0; i < size.length; i++) {
        if (size[i].checked) {
            pizzaSize = size[i].value;
        }
    }
    return pizzaSize;
}

//getting the toppings selected
function getToppings() {
    let selectedToppings = document.getElementsByName("pizzaTopping");
    let text = "";
    let toppingsArray = [];

    let toppings = document.querySelectorAll(".checkbox");

    for (let checkbox of toppings) {
        if (checkbox.checked == true) {
            toppingsArray.push(checkbox.value);
        }
    }
    selectedToppings.innerHTML = text + toppingsArray.join(", ");
    return toppingsArray;
};

function getPriceSize() {
    let size = getSize();
    let total = 0;
    switch (size) {
        case "personal":
            total += 6;
            break;
        case "small":
            total += 9;
            break;
        case "medium":
            total += 12;
            break;
        case "large":
            total += 14;
            break;
    }
    return total;
}

function getPriceToppings() {
    let toppingsArray = getToppings();
    let topping = 1.25;
    let toppingTotal = 0;
    let count = toppingsArray.length;
    toppingTotal += count * topping;
    return toppingTotal;
}

function getSubtotal(total, toppingTotal) {
    let subtotal = parseFloat(total) + parseFloat(toppingTotal);
    subtotal = Number(subtotal).toFixed(2);
    return subtotal;
}

function getTax(subtotal) {
    let tax = parseFloat(subtotal) * .10;
    tax = Number(tax).toFixed(2);
    return tax;
}

function getTotalPrice(subtotal, tax) {
    let totalPrice = parseFloat(subtotal) + parseFloat(tax);
    totalPrice = Number(totalPrice).toFixed(2);
    return totalPrice;
}

function displayPizza(orderType, pizzaSize, toppingsArray, subtotal, tax, totalPrice) {
    document.getElementById("selectedType").innerHTML = orderType;
    document.getElementById("selectedSize").innerHTML = pizzaSize;
    document.getElementById("selectedToppings").innerHTML = toppingsArray;
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("tax").innerHTML = tax;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

function displayPrompt(id = null) {
    const prompts = {
        name: "Enter your first and last name",
        address: "Enter your address",
        email: "Enter your email - Ex: johndoe@email.com",
        phone: "*Enter your phone number as: ###-###-####",
        comment: "Please enter a message"
    }

    let elements = document.getElementsByTagName("output");

    if (id == null) {
        id = document.activeElement.id;

        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = "";
        }
    }

    try {
        document.getElementById(id + "-prompt").innerText = prompts[id];
    }

    catch {
        //ignore when the active element is a button
    }
}

function inputInput() {
    let element = document.activeElement;
    let id = element.id;

    if (id == "phone") {
        checkPhone();
    }
    if (!element.checkValidity()) {
        document.getElementById(id + "-prompt").innerText = element.validationMessage;
    }

    checkButtons();
}

function checkPhone() {
    let element = document.getElementById("phone")
    let value = element.value;

    if (value.length > 3 && value.substr(3, 1) != "-") {
        value = value.substr(0, 3) + "-" + value.substr(3);
    }

    if (value.length > 7 && value.substr(7, 1) != "-") {
        value = value.substr(0, 7) + "-" + value.substr(7);
    }

    if (element.value != value) {
        element.value = value;
    }
}

function checkButtons() {
    let elements = document.getElementsByClassName("form-control")

    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].checkValidity()) {
            document.getElementById("submitOrder").disabled = true;
            return;
        }
    }
    document.getElementById("submitOrder").disabled = false;
}

function checkoutBtn() {
    let pizzaForm = document.getElementById("pizzaForm");
    let fillForm = document.getElementById("fillForm");
    let checkout = document.getElementById("checkout");
    let totalPizza = document.getElementById("totalPizza");

    getSize();
    getToppings();

    pizzaForm.style.display = "none";
    fillForm.style.display = "inline";
    checkout.style.display = "none";
    totalPizza.style.display = "inline";
    showPizzaTable(pizzasArray);
};

function submitBtn() {
    let checkout = document.getElementById("checkout");
    checkout.style.display = "none";
};

function goBack() {
    let pizzaForm = document.getElementById("pizzaForm");
    let fillForm = document.getElementById("fillForm");

    pizzaForm.style.display = "inline";
    fillForm.style.display = "none";
};

function reset() {
    let resetBtn = document.getElementById("resetBtn");
    window.location.reload();
}

function Pizza(orderType, pizzaSize, toppings, subtotal, tax, totalPrice) {
    this.orderType = orderType;
    this.pizzaSize = pizzaSize;
    this.toppings = toppings;
    this.subtotal = subtotal;
    this.tax = tax;
    this.totalPrice = totalPrice;
    this.pizzaOrdered = function () {
        return "<h3><u>Your Current Pizza:</u></h3>" + "<br>" + "<b>Type: </b>" + this.orderType + "<br>" + "<b>Size: </b>" + this.pizzaSize + "<br>" + "<b>Toppings: </b>" + this.toppings;
    };
}

function createPizza() {
    let orderType = getType();
    let pizzaSize = getSize();
    let toppings = getToppings();
    let total = getPriceSize();
    let toppingTotal = getPriceToppings();
    let subtotal = getSubtotal(total, toppingTotal);
    let tax = getTax(subtotal);
    let totalPrice = getTotalPrice(subtotal, tax);
    let pizza = new Pizza(orderType, pizzaSize, toppings, subtotal, tax, totalPrice);
    return pizza;
}


function addPizza() {
    validateAddButton();
    let pizza = createPizza();
    let size = document.getElementsByName("pizzaSize");
    let toppings = document.querySelectorAll(".checkbox");

    for (var i = 0; i < size.length; i++)
        size[i].checked = false;

    for (var i = 0; i < toppings.length; i++)
        toppings[i].checked = false;

    document.getElementById("pizzaOrder").innerHTML = pizza.pizzaOrdered();
    pizzasArray.push(pizza);
    console.log(pizzasArray);
    return pizzasArray;
}

function User(name, address, email, phone, comment) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.comment = comment;
    this.createdUser = function () {
        return this.name + ", we have your address as " + this.address + " and your email as " + this.email + ", with your phone number " + this.phone + " and a message of: '" + this.comment + "'. Thank you very much for your business, and we will see you soon.";
    }
}

function createUser() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let comment = document.getElementById("comment").value;

    let user = new User(name, address, email, phone, comment);
    return user;
}

//SOMETHING NOT WORKING CORRECTLY HERE ---------
function showPizzaTable() {
    let order = "";
  
    console.log(pizzasArray);
    for (let i = 0; i < pizzasArray.length; i++) {
        order += "<h3>Pizza " + (i + 1) + ":</h3>" + "<b>" + pizzasArray[i].pizzaSize + ":</b> " +
            pizzasArray[i].toppings;
    }

    document.getElementById("pizzaTable").innerHTML = order;
}

function dataPizza() {
    let dataPizza = document.getElementById("dataPizza").innerText;
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        let pizza = pizzasArray;
        document.getElementById("dataPizza").innerText = JSON.stringify(pizza, null, 2);
        //document.getElementById("response").innerText = user.createdUser();

    };
    request.send(dataPizza);
}

function dataPizza() {
    document.getElementById("url").innerText =
        "https://jsonplaceholder.typicode.com/users";

    let pizza = pizzasArray;
    document.getElementById("dataPizza").innerText = JSON.stringify(pizza, null, 2);
    //document.getElementById("response").innerText = user.createdUser();
}


function submitClick() {
    let data = document.getElementById("data").innerText;
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        let user = createUser();
        document.getElementById("data").innerText = JSON.stringify(user, null, 2);
        document.getElementById("response").innerText = "status: " + request.status + "\n";
        document.getElementById("response").innerText = user.createdUser();

    };
    request.send(data);
}

function submitClick() {
    document.getElementById("url").innerText =
        "https://jsonplaceholder.typicode.com/users";

    let user = createUser();
    document.getElementById("data").innerText = JSON.stringify(user, null, 2);
    document.getElementById("response").innerText = user.createdUser();
}

/*
function submitPizzaClick() {
    let pizzaTable = document.getElementById("pizzaTable").innerText;
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.onreadystatechange = function () {
        let pizza = createPizza();
        document.getElementById("pizzaTable").innerText = JSON.stringify(pizza, null, 2);
        document.getElementById("totalTotal").innerText = pizza.createdUser();
    
    };
    request.send(pizzaTable);
}*/


