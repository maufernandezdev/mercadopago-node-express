// Start array products //
var Products = [{
    name: "Caffe Latte",
    price: 210.00,
    description: "Una mezcla refrescante de espresso con cremosa leche es la clave de este delicioso latte clásico.",
    type: "coffee",
    img:"images/caffe-latte-en2.jpg",
    imgType:"tall"
    // img:"images/Starbucks-Coffee.png"
},
{
    name: "Cappuccino",
    price: 275.00,
    description: "Una mezcla de espresso con suave y cremosa leche, ligeramente endulzado con toques de cacao.",
    type: "coffee",
    img:"images/cappuccino-en2.jpg",
    imgType:"tall"
    // img:"images/Starbucks-Coffee2.png"
},
{
    name: "Signature Chocolate",
    price: 275.00,
    description: "Nuestro signature chocolate es una deliciosa mezcla de cremosa leche y notas de chocolate.",
    type: "coffee",
    img:"images/signature-chocolate-en2.jpg",
    imgType:"tall"
    // img:"images/Starbucks-Coffee4.png"
},
{
    name: "Caramel Macchiato",
    price: 250.00,
    description: "Deliciosa mezcla de intenso espresso con cremosa leche y el dulce sabor y textura del caramelo.",
    type: "coffee",
    img:"images/caramel-macchiato-en2.jpg",
    imgType:"tall"
    // img:"images/Starbucks-Transparent.png"
},
{
    name: "Batido frutal",
    price: 250.00,
    description: "Batido con las más deliciosas frutas de estación.",
    type: "food",
    img:"images/jugos-naturales-shutterstock_121270552.jpg",
    imgType:"width"
},
{
    name: "Tostadas c/palta",
    price: 250.00,
    description: "Tostadas con huevo y palta.",
    type: "food",
    img:"images/pexels-foodie-factor-566566.jpg",
    imgType:"width"
},
{
    name: "Yogur c/Frutas",
    price: 250.00,
    description: "Yogur con colchón de frutas.",
    type: "food",
    img:"images/pexels-jane-d-1099680.jpg",
    imgType:"width"
},
{
    name: "Fideos c/verduras",
    price: 250.00,
    description: "Fideos con verduras salteadas.",
    type: "food",
    img:"images/pexels-jane-d-769969.jpg",
    imgType:"width"
},
{
    name: "Yogures",
    price: 600.00,
    description: "Delisioso yogurt c/ frutos secos y colchón de frutos rojos.",
    type: "food",
    img:"images/pexels-ella-olsson-1640768.jpg",
    imgType:"width"
},

];
// End array Coffees //

localStorage.removeItem("selected-product");

// start object functions
var Functions = {

    createCart:function()
    {    
        var cart = [];
        for (var i = 0; i < Products.length; i++)
        {
            cart.push({
                name:Products[i].name,
                price:Products[i].price,
                description:Products[i].description,
                img:Products[i].img,
                imgType:Products[i].imgType,
                quantity:0
            });
        }
        localStorage.setItem('cart' , JSON.stringify(cart));
        console.log("local storage obj array: " + JSON.stringify(cart));
    }
};

function viewDetail(product)
{
    localStorage.setItem("selected-product",product);
    window.location.href = "detalle.html" ;// details redirect
}

/* [MRF 2022-04-10] check if the cart have any product or if there are a user active */
let isUser = localStorage.getItem("user-active");

if(isUser == null)
{
    Functions.createCart();
}
