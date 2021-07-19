// se tomaran los pedidos de los clientes y se enviaran a order manager // 
// example of a sales order
// var Order =
// {
//     orderNumber: 1234,
//     total: 500,
//     customer: "Lucia",
//     description: [Product,Product]
// }

// const variables //
const Cliente = "clienteSesion";
// Start array products //
var Products = [{
        name: "Caffe Latte",
        price: 210.00,
        description: "Una mezcla refrescante de espresso con cremosa leche es la clave de este delicioso latte clásico.",
        type: "coffee",
    },
    {
        name: "Cappuccino",
        price: 275.00,
        description: "Una mezcla de espresso con suave y cremosa leche, ligeramente endulzado con toques de cacao.",
        type: "coffee",
    },
    {
        name: "Signature Chocolate",
        price: 275.00,
        description: "Nuestro signature chocolate es una deliciosa mezcla de cremosa leche y notas de chocolate.",
        type: "coffee",
    },
    {
        name: "Caramel Macchiato",
        price: 250.00,
        description: "Deliciosa mezcla de intenso espresso con cremosa leche y el dulce sabor y textura del caramelo.",
        type: "coffee",
    },
    {
        name: "Batido frutal",
        price: 250.00,
        description: "Descripcion pendiente.",
        type: "food",
    },
    {
        name: "Tostadas c/palta",
        price: 250.00,
        description: "Descripcion pendiente.",
        type: "food",
    },
    {
        name: "Yogur c/Frutas",
        price: 250.00,
        description: "Descripcion pendiente.",
        type: "food",
    },
    {
        name: "Fideos c/verduras",
        price: 250.00,
        description: "Descripcion pendiente.",
        type: "food",
    },

];
// End array Coffees //




// Start array Foods //
var Foods = [{
        name: "Sandwich",
        price: 300.00,
        description: "Grilled Ham and Cheese sandwich"
    },
    {
        name: "Brownie",
        price: 275.00,
        description: "Walnut brownie"
    }
];
// End array Foods //

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
    // createCart:function()
    // {
    //     var item = localStorage.getItem(Cliente); // obtengo el cliente
    //     var Customer =  JSON.parse(item); // cliente a JSON
    //     var item2 = localStorage.getItem(Customer.table); // obtengo el detalle de la mesa del cliente
    //     var cart = 'cartTable'+Customer.table;
    //     if(localStorage.getItem(cart) === null)
    //     {
    //         var obj = {};
    //         for(var i =0;i < Products.length;i++)
    //         {
    //             obj[i] = 0; 
    //         }
    //         if(Object.keys(obj).length > 0)
    //         {
    //             localStorage.setItem(cart, JSON.stringify({obj}));
    //         }
    //     }
    // }
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
//Functions.createCart();