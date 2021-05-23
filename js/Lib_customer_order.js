// se tomaran los pedidos de los clientes y se enviaran a order manager // 
// example of a sales order
// var Order =
// {
//     orderNumber: 1234,
//     total: 500,
//     customer: "Lucia",
//     description: [Product,Product]
// }

/* Start [MRF 2021-05-23] builders */
function Product(product)
{
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
}

function Order(order)
{
    this.orderNumber = order.orderNumber;
    this.total = order.total;
    this.customer = order.customer;
    this.description = order.description;
}
/* End   [MRF 2021-05-23] builders */

// array products
var Products = 
[
    {
        name:"Americano",
        price:200,
        description:"Shots of espresso and filtered hot water"
    },
    {
        name:"Cappuccino",
        price:275,
        description:"A shot of espresso topped with a deep layer of foamed milk"
    },
    {
        name:"Macchiato",
        price:250,
        description:"Foamed whole milk marked with shots of espresso"
    },
    {
        name:"Latte",
        price:210,
        description:"A shot of espresso in steamed milk lightly topped with foam"
    },
    {
        name:"Sandwich",
        price:300,
        description:"Grilled Ham and Cheese sandwich"
    },
    {
        name:"Brownie",
        price:275,
        description:"Walnut brownie"
    }

];
