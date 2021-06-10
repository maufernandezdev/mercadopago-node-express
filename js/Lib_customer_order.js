// se tomaran los pedidos de los clientes y se enviaran a order manager // 
// example of a sales order
// var Order =
// {
//     orderNumber: 1234,
//     total: 500,
//     customer: "Lucia",
//     description: [Product,Product]
// }
// Start array Coffees //
var Products =
[
    {
        name: "Caffe Latte",
        price: 210.00,
        description: "Una mezcla refrescante de espresso con cremosa leche es la clave de este delicioso latte clásico."
    },
    {
        name: "Cappuccino",
        price: 275.00,
        description: "Descubre el Cappuccino, una mezcla de espresso con suave y cremosa leche, ligeramente endulzado con toques de cacao."
    },
    {
        name:"Signature chocolate",
        price:275.00,
        description:"Deliciosa mezcla de cremosa leche y notas de chocolate."
    },
    // {
    //     name:"Skinny Latte Lactose Free",
    //     price:210.00,
    //     description:"Una versión con menos grasa del aclamado clásico. Espresso con suave leche sin lactosa para disfrutar de tu latte con menos calorías. Ahora sin azúcar añadida."
    // },
    {
        name:"Caramel Macchiato",
        price:250.00,
        description:"Nuestro Caramel Macchiato es una deliciosa mezcla de intenso espresso con cremosa leche y el dulce sabor y textura del caramelo."
    },
];
// End array Coffees //

// Start array Foods //
var Foods = 
[
    {
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
var Functions =
{
    addProduct: function(index)
    {
        alert("elemento seleccionado " + (index + 1 ));
        for(var i = 0;i < Products.length;i++)
        {
            if(i == index)
            {
                alert("Se agrego " + Products[i].name + " a la orden");
            }
        }
    },
};
// start object functions

var coffees = document.getElementsByClassName('coffee-galery__item');
for(var i = 0;i < coffees.length;i++)
{
    var div = document.createElement("div");
    div.innerHTML = ` 
    <h2>${Products[i].name}</h2>
    <h3>$ ${Products[i].price.toFixed(2)}</h3>
    <p>${Products[i].description}</p>
    <button class="add" onclick="Functions.addProduct(${i})">Añadir</button>
    `;
    coffees[i].appendChild(div); 
}






