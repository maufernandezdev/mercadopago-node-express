// Descripcion
// se le pedira un nombre al usuario ingresar a realizar la orden // 
// en el caso de que sea un cliente que ya este con una orden abierta solo se le pedira el numero de mesa //


// limpio la variable session a vacia antes de que el cliente ingrese//
const Cliente = "clienteSesion";
//localStorage.setItem(Cliente, ""); // limpiar esta variable en el click del boton volver en customer order //


// ejemplo de array de clientes 

let Tables = 
[   
    {
        name: "",
        table: "1",
    },
    {
        name: "",
        table: "2",
    },
    {
        name: "",
        table: "3",
    },
    {
        name: "",
        table: "4",
    },
    {
        name: "",
        table: "5",
    },
    {
        name: "",
        table: "6",
    },
    {
        name: "",
        table: "7",
    },
    {
        name: "",
        table: "8",
    },
    {
        name: "",
        table: "9",
    },
    {
        name: "",
        table: "10",
    },
];

for(var i = 0;i < Tables.length;i++)
{
    var table = i+1;
    if(!localStorage.getItem(table))
    {
        localStorage.setItem(table, ""); // cargo el local storage con las mesas
    }
}

// cargo el array con las mesas del storage
for(var i = 0;i < Tables.length;i++)
{
    var table = i+1;
    var customer = localStorage.getItem(table);
    if(customer)
    {
        Tables[i].name = customer;
    }
}




var Functions = {
    
    checkTable: function(table)
    {
        var table = document.getElementById('table-customer').value;
        var isNumber = /^[0-9]*$/.test(table);
        if(!isNumber || table == "") return false;
        var isTable = localStorage.getItem(table);
        console.log("valor de is table: " + isTable);
        if(localStorage.getItem(table) === null)
        {
            alert("Mesa inexistente");
            return true;   
        }
        else
        {
           // busco si alguien esta ocupando la mesa seleccionada
            for(var i = 0;i < Tables.length;i++)
            { 
                if(Tables[i].table == table && Tables[i].name != "")
                {
                    //La mesa seleccionada ya esta ocupada, no necesita ingresar nombre para seguir ordenando //
                    return true;
                }
            }
        } 
        return false;
    },
};


// adding new customers
function addCustomer() 
{
    var newCustomer = document.getElementById('name').value;
    var table = document.getElementById('table-customer').value;
    var isNumber = /^[0-9]*$/.test(table);
    var isString = /^[a-zA-Z]*$/.test(newCustomer);
    if(table == "")
    {
        alert("Ingrese un número de mesa");
        return;
    }
    if(table!= "" && isNumber && newCustomer == "" && !Functions.checkTable) // ver funcion check table //
    {
        alert("Ingrese su nombre para continuar");
        return;
    }
    if(!isNumber)
    {
        alert("Para ingresar , seleccione una mesa correcta");
        return;
    }
    if(!isString)
    {
        alert("Su nombre no puede contener caracteres numericos y/o especiales");
        return;
    }
    let isCustomer = false;
    for(var i = 0;i < Tables.length;i++)
    { 
        if(Tables[i].table == table && Tables[i].name != "")
        {
            //La mesa seleccionada ya esta ocupada, no necesita ingresar nombre para seguir ordenando //
            isCustomer = true;
            //localStorage.setItem(Cliente, Tables[i].name);
            localStorage.setItem(Cliente, JSON.stringify( {
                name: Tables[i].name,
                table: table,
            }));
            cleanFields();
            window.location.href = "customer_order.html"; // redirect to customer order
            return; 
        }
    }
    if(false && isString && newCustomer.length < 3)
    {
        alert("Su nombre es demasiado corto, ingrese minimo 3 caracteres");
        return;
    }
     addNewCustomer(newCustomer, table);
    
}

function addNewCustomer(newCustomer, table)
{
    //localStorage.setItem(Cliente, newCustomer); // seteo la variable de sesion "Cliente"
    localStorage.setItem(Cliente, JSON.stringify( {
        name: newCustomer,
        table: table,
    }));
    localStorage.setItem(table, newCustomer);
    var isTable = localStorage.getItem(table);
    console.log("valor de is table: " + isTable);
    for(var j = 0;j < Tables.length;j++)
    {
        if(Tables[j].table == table)
        {
            Tables[j].name = newCustomer; // new customer is added to array
        }
    }
    console.log(Tables);
    cleanFields();
    window.location.href = "customer_order.html"; // redirect to customer order 
}

function cleanFields()
{
    document.getElementById( 'name' ).value = ""; // set name field to empty
    document.getElementById( 'table-customer' ).value = "";
}

function seccionNoDisponibleAun()
{
    alert("Sección en proceso");
}
