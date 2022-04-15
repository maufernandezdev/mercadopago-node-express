Products = [{
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

// fill product details 
let selectedProduct = localStorage.getItem("selected-product");
let product = Products[selectedProduct];
if(selectedProduct == null || product == 'undefined' || product == undefined)
{   
    window.location.href = "productos.html" ;// producto redirect
}
console.log("selected product:" + selectedProduct);
console.log("product:" +  JSON.stringify(product));

console.log("product name:" +  product.name);


var container = document.getElementsByClassName('container');
var img = document.createElement("div");
if(selectedProduct > 3)
{
    img.setAttribute("class", "img-container");
}
else
{
    img.setAttribute("class", "img-tall");
}


var detail = document.createElement("div");
detail.setAttribute("class", "details");

var buttons = document.createElement("div");
buttons.setAttribute("class", "button-container");

img.innerHTML = ` 
            <img src="${product.img}">
`;

detail.innerHTML = ` 
            <h3>${product.name}</h3>
            <h4>${product.description}</h4>
            <label>Leer mas <i class='bx bx-right-arrow-alt'></i></label>
            <div class="total">
                <h5>Total</h5>
                <h5>$${product.price}</h5>
            </div>
`;

buttons.innerHTML = ` 
            <form action="http://localhost:5500/checkout" method="POST">
                <input type="submit" value="Comprar ahora" class="buy">
                <input type="hidden" name="title"    value="${product.name}">
                <input type="hidden" name="price"    value="${product.price}">
            </form>
            <button class="add" onclick="Functions.addProduct(${selectedProduct});">Agregar al carrito</button>
`;
container[0].appendChild(img);
container[0].appendChild(detail);
container[0].appendChild(buttons);

// start object functions
var Functions = {
    addProduct: function(index)
    {   
        localStorage.setItem("user-active", true);
        console.log("prodcuto numero: " + index);
        for (var i = 0; i < Products.length; i++) {
            if (i == index) {
                var productName =  Products[i].name;

                var item = localStorage.getItem("cart"); 
                var cart =  JSON.parse(item); 
                var cartContent = [];
                if(cart)
                {
                    for(var j=0;j<cart.length;j++)
                    {
                        if(cart[j].name == productName)
                        {
                            cart[j].quantity ++; 
                        }
                        cartContent.push(cart[j]);
                    }
                }
                
                localStorage.removeItem("cart"); // vacio el localStorage antes de volver a llenarlo
                localStorage.setItem("cart" , JSON.stringify(cartContent)); // lleno el storage 
                console.log("local storage obj array: " + JSON.stringify(cartContent));

                let message = 'Se agregó ' + productName + ' al carrito';
                var element = document.getElementById('message-text');
                element.parentNode.removeChild(element);

                let divContainer = document.getElementsByClassName('message');
                var span = document.createElement("span");

                span.innerHTML = ` 
                
                    <span class="text text-2" id="message-text">${message}</span>

                `;
                divContainer[0].appendChild(span);
                const toast = document.querySelector(".toast"),
                closeIcon = document.querySelector(".close"),
                progress = document.querySelector(".progress");
      
                if(window.scrollY!=0) {
                    setTimeout(function() {
                    window.scrollTo(0,window.scrollY-30);
                    TopscrollTo();
                    }, 5);
                }
      
              let timer1, timer2;
              
              toast.classList.add("active");
              progress.classList.add("active");
      
              timer1 = setTimeout(() => {
                  toast.classList.remove("active");
              }, 5000); //1s = 1000 milliseconds
      
              timer2 = setTimeout(() => {
              progress.classList.remove("active");
              }, 5300);
              
      
              closeIcon.addEventListener("click", () => {
                  toast.classList.remove("active");
                  
                  setTimeout(() => {
                  progress.classList.remove("active");
                  }, 300);
      
                  clearTimeout(timer1);
                  clearTimeout(timer2);
              });
            }
        }
    },
};
    
