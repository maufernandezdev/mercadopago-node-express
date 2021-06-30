// se le pedira un nombre al usuario ingresar a realizar la orden // 

// ejemplo de array de clientes 

let Customers = [{
        name: "Maria",
        table: "7",
    },
    {
        name: "Lucia",
        table: "2",
    },
    {
        name: "Pablo",
        table: "1",
    },
    {
        name: "Ian",
        table: "3",
    }

];
let lastCustomer = "";

var Functions = {
    //set last customer
    setLastCustomer: function() {
        lastCustomer = Customers[Customers.length - 1].toString();
    },

    // return last customer entered
    getLastCustomer: function() {
        return lastCustomer;
    },
    // sortArray:function()
    // {
    //     Customers.sort((a,b) =>{
    //         const nameA = a.toLowerCase();
    //         const nameB = b.toLowerCase();
    //         if(nameA < nameB)
    //         {
    //             return -1;
    //         }
    //         if(nameA > nameB)
    //         {
    //             return 1;
    //         }

    //         return 0;

    //     });
    // },

};


// adding new customers
function addCustomer() {
    var newCustomer = document.getElementById('name').value;
    var table = document.getElementById('table').value;
    addNewCustomer(newCustomer, table);

}

function addCustomerByEnter(e) {
    if (e.keyCode === 13) {
        var newCustomer = document.getElementById('name').value;
        var table = document.getElementById('table').value;
        addNewCustomer(newCustomer, table);
    }
}


function addNewCustomer(newCustomer, table) {
    Customers.push({ name: newCustomer, table: table }); // new customer is added to array
    Functions.setLastCustomer(); // set last customer variable 
    //Functions.sortArray(); //array order with sort method
    console.log(Customers);
    console.log(Functions.getLastCustomer());
    // document.getElementById('name').value = ""; // set name field to empty
    // document.getElementById('table').value = "";
    //window.location.href = "customer_order.html"; // redirect to customer order 
}