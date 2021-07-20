// const variables //
const Cliente = "clienteSesion";
// Start array products //
var Products = [{
        name: "Caffe Latte",
        price: 210.00,
        description: "Una mezcla refrescante de espresso con cremosa leche es la clave de este delicioso latte clásico.",
        type: "coffee",
        img:"images/caffe-latte-en2.jpg"
    },
    {
        name: "Cappuccino",
        price: 275.00,
        description: "Una mezcla de espresso con suave y cremosa leche, ligeramente endulzado con toques de cacao.",
        type: "coffee",
        img:"images/cappuccino-en2.jpg"
    },
    {
        name: "Signature Chocolate",
        price: 275.00,
        description: "Nuestro signature chocolate es una deliciosa mezcla de cremosa leche y notas de chocolate.",
        type: "coffee",
        img:"images/signature-chocolate-en2.jpg"
    },
    {
        name: "Caramel Macchiato",
        price: 250.00,
        description: "Deliciosa mezcla de intenso espresso con cremosa leche y el dulce sabor y textura del caramelo.",
        type: "coffee",
        img:"images/caramel-macchiato-en2.jpg"
    },
    {
        name: "Batido frutal",
        price: 250.00,
        description: "Batido con las más deliciosas frutas de estación.",
        type: "food",
        img:"images/jugos-naturales-shutterstock_121270552.jpg"
    },
    {
        name: "Tostadas c/palta",
        price: 250.00,
        description: "Tostadas con huevo y palta.",
        type: "food",
        img:"images/pexels-foodie-factor-566566.jpg"
    },
    {
        name: "Yogur c/Frutas",
        price: 250.00,
        description: "Yogur con colchón de frutas.",
        type: "food",
        img:"images/pexels-jane-d-1099680.jpg"
    },
    {
        name: "Fideos c/verduras",
        price: 250.00,
        description: "Fideos con verduras salteadas.",
        type: "food",
        img:"images/pexels-jane-d-769969.jpg"
    },

];
// End array Coffees //

// start object functions
var Functions = {
    addProduct: function(index)
    {
        console.log("prodcuto numero: " + index);
        for (var i = 0; i < Products.length; i++) {
            if (i == index) {
                var productName =  Products[i].name;
                alert("Se agrego " + productName + " a la orden");

                var item = localStorage.getItem(Cliente); // obtengo el cliente y la mesa 
                var Customer =  JSON.parse(item); // cliente a JSON

                var cartName = 'cartTable'+Customer.table; // creo el nombre de la mesa del cliente

                var item2 = localStorage.getItem(cartName); // obtengo el detalle de la mesa del cliente
                var cart =  JSON.parse(item2); // detalle de la mesa del cliente a JSON
                var cartContent = [];
                if(cart) // aca lo quiero ver es, si esa mesa ya tiene productos  // si tiene los agrego a un array
                {
                    for(var j=0;j<cart.length;j++)
                    {
                        cartContent.push(cart[j]);
                    }
                }
                cartContent.push({
                    name:Products[i].name,
                    price:Products[i].price,
                    description:Products[i].description,
                    img:Products[i].img
                });
                localStorage.setItem(cartName , ""); // vacio el localStorage antes de volver a llenarlo
                localStorage.setItem(cartName , JSON.stringify(cartContent)); // lleno el storage 
                console.log("local storage obj array: " + JSON.stringify(cartContent));
            }
        }
    },
    cleanSesion:function()
    {
        localStorage.setItem(Cliente, JSON.stringify( {
            name: "",
            table: "",
        }));
    },
};
// start object functions
// coffees 
var coffees = document.getElementsByClassName('coffee-galery__item');
for (var i = 0; i < Products.length; i++) {
    var div = document.createElement("div");
    if (Products[i].type == "coffee") {
        div.innerHTML = ` 
        <h2>${Products[i].name}</h2>
        <h3>$ ${Products[i].price.toFixed(2)}</h3>
        <button class="button" onclick="Functions.addProduct(${i})">Añadir</button>
        <button class="button">Detalle</button>
        `;
        coffees[i].appendChild(div);
    }
}

// foods
var foods = document.getElementsByClassName('food-galery__item');
var j = 0;
for (var i = 0; i < Products.length; i++) {
    if (Products[i].type == "food") {
        var div = document.createElement("div");
        div.innerHTML = ` 
        <h2>${Products[i].name}</h2>
        <h3>$ ${Products[i].price.toFixed(2)}</h3>
        <button class="button" onclick="Functions.addProduct(${i})">Añadir</button>
        <button class="button">Detalle</button>
        `;
        foods[j].appendChild(div);
        j++;
    }
}

function setName()
{
    var customerSession = document.getElementById('customer-session');
    var div = document.createElement("div");
    var item = localStorage.getItem(Cliente); // obtengo el cliente
    var Customer =  JSON.parse(item); // cliente a JSON
        div.innerHTML = ` 
        <label>${Customer.name}</label>
        `;
    customerSession.appendChild(div);
}

setName();
