// const variables //
const Cliente = "clienteSesion";

let item = localStorage.getItem(Cliente); //obtengo el cliente conectado
let Customer =  JSON.parse(item); // cliente a JSON
let cartName = 'cartTable'+Customer.table; // obtengo el nombre del cart asignado a la mesa
let item2 = localStorage.getItem(cartName); // obtengo el detalle de la mesa del cliente
let cart =  JSON.parse(item2); // detalle de la mesa del cliente a JSON
let productsQuantity = 0;

/* [MRF 2021-07-19] add the total by product */
function getPrice(product)
{
    if(cart)
    {
        var price = 0;
        for(var i = 0;i < cart.length; i++)
        {
            if(cart[i].name == product)
            {
                price += cart[i].price;
            }   
        }
        return price;
    }
}

// getOriginalPrice obtiene el precio original osea por unidad de un producto //
function getOriginalPrice(product)
{
    if(cart)
    {
        var price = -1;
        for(var i = 0;i < cart.length; i++)
        {
            if(cart[i].name == product)
            {
                return cart[i].price;
            }   
        }
        return price;
    }
}

/* [MRF 2021-07-19]  get the quantity for each product */
function getQuantity(product)
{
    if(cart)
    {
        var quantity = 0;
        for(var i = 0;i < cart.length; i++)
        {
            if(cart[i].name == product)
            {
                quantity++;
            }   
        }
        return quantity;
    }
}


// se llena el carrito de compras con los elementos del localStorage //
function fillCart()
{
    if(cart)
    {
        var tbody = document.getElementById('table-body');
        // lleno la tabla con los items //
        for(var i = 0;i < cart.length; i++)
        {
            console.log("cart content: " + cart[i].name);
            var isProduct = document.getElementById(cart[i].name);
            if(!isProduct)
            {
                productsQuantity++;
                var price = getPrice(cart[i].name);
                var quantity = getQuantity(cart[i].name);
                var name = cart[i].name;
                var tr = document.createElement("tr");
                tr.innerHTML = ` 
                <th scope="row">${i + 1}</th>
                <td><img src="${cart[i].img}" alt="foto de producto"></td>
                <td id="${cart[i].name}">${cart[i].name}</td>
                <td>${cart[i].description}</td>
                <td><input id="${'q'+ i}" type="text" value="${quantity}" minlength="1" maxlength="2"></td>
                <td><input readonly id="${'p'+ i}" type="text" value="${price}"></td>
                <td><button onclick="removeProduct(${i});" class="button"><i class="fas fa-trash-alt"></i></button></td>
                    `;
                    tbody.appendChild(tr);
            }
        }
        fillOrderSummary();
    }
    else
    {
        var tbody = document.getElementById('table-body');
        var tr = document.createElement("tr");
        tr.innerHTML = ` `;
        tbody.appendChild(tr);
    }
}


// Se elimina un producto completamente del carrito de compras //
// removeProduct, a diferencia de "updateProduct", si guarda los nuevos valores en el storageglobal del carrito //
function removeProduct(product)
{
    console.log("elemento eliminado: " + product);
    var cartContent = [];
    if(cart) // aca lo quiero ver es, si esa mesa ya tiene productos  // si tiene los agrego a un array
    {
        for(var j=0;j< productsQuantity;j++)
        {
            if(j != product)
            {
                cartContent.push(cart[j]);
                console.log("elemento agregado: " + cart[j].name);    
            } 
        }
    }
    localStorage.setItem(cartName , ""); // vacio el localStorage antes de volver a llenarlo
    localStorage.setItem(cartName , JSON.stringify(cartContent)); // lleno el storage
    alert("Producto eliminado con éxito");
    alert("Actualizar carrito para visualizar cambios");
    fillCart();   
}

// la funcion actualizar solo actualiza los productos antes de realizar el pago //
// esta funcion no guarda las nuevas cantidades agregadas en el carrito //
function updateProduct()
{
    if(cart)
    {
        console.log("*** start update products ***");
        for(var i = 0;i < productsQuantity;i++)
        {
            var price = document.getElementById('p'+ i);
            var quantity = document.getElementById('q'+ i);
            var orignialPrice = getOriginalPrice(cart[i].name);
            var isNumber = /^[0-9]*$/.test(quantity.value);
            console.log("price: " + price.value);
            console.log("quantity: " + quantity.value);
            console.log("original price: " + orignialPrice);
            if(!isNumber)
            {
                alert("Ingrese solo numeros en la cantidad");
                return;
            }
            // actualizo el storage , el subtotal y el resumen //
            else
            {
                var newPrice = parseInt(quantity.value) * orignialPrice;
                price.value = newPrice;
                fillOrderSummary();
            }
        }
        console.log("*** end update products ***");
        location.reload();
    }
}

// Fill order summary llena el div con el resumen de la orden //
function fillOrderSummary()
{
    if(cart)
    {
        let sum = 0;
        for(var i = 0;i < productsQuantity;i++)
        {
            var price = document.getElementById('p'+ i).value;
            var quantity = document.getElementById('q'+ i);
            var isNumber = /^[0-9]*$/.test(quantity.value);
            console.log("price: " + price);
            console.log("quantity: " + quantity.value);
            if(!isNumber)
            {
                return;
            }
            sum += parseFloat(price);
        }
        var subtotal = document.getElementById("subtotal");
        var total = document.getElementById("total");
        var tax = document.getElementById("tax");

        subtotal.innerHTML = '$' + sum;
        tax.value = "$0.00";
        total.innerHTML = '$' + sum;
    }
}

// al finalizar la orden se deben vaciar los storage correspondientes a la mesa //
function finalizeOrder()
{
    //localStorage.setItem(cartName , ""); // vacio el localStorage de la mesa
    localStorage.removeItem(cartName);
    localStorage.setItem(Customer.table, ""); // vacio la mesa
    localStorage.setItem(Cliente, JSON.stringify( { // vacio el localStorage de la sesion del cliente
        name: "",
        table: "",
    }));
    window.location.href = "customer_login.html"; // redirect to customer order
    return; 
}


fillCart();