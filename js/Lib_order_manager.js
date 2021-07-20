// se administraran las ordenes pedidas por los clientes //
// se listaran las ordenes pendientes
// se mostraran las ordenes finalizadas 
// se listaran los productos
// se podran agregar nuevos productos, borrar y/o modificar
// exportar objeto de funciones


// /* Start [MRF 2021-06-02] imports */
// import {Products} from "./Products.js";
// /* End   [MRF 2021-06-02] imports */
// alert(Products[0].name); // prueba de imports


    function viewProduct()
    {
        var table = document.getElementsByClassName('table');
        var description = localStorage.getItem("description");
        for(var i = 0;i < localStorage.length;i++)
        {
            var prod = 'Product_' + i;
            var item = localStorage.getItem(prod);
            var Product = JSON.parse(item)
            var div = document.createElement("div");
            div.innerHTML = ` 
            <h2>Producto: ${Product.name}</h2>
            <h3>$ ${Product.price.toFixed(2)}</h3>
            <p>Descripción: ${description}</p>
            <p>Cantidad: ${Product.quantity}</p>
            
            `;
            table[0].appendChild(div);
        }
    }

    viewProduct();
  

