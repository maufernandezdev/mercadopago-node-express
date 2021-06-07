

/* Start [MRF 2021-05-23] builders */
function Product (product)
{
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
}

function Order (order)
{
    this.orderNumber = order.orderNumber;
    this.total = order.total;
    this.customer = order.customer;
    this.description = order.description;
}
/* End   [MRF 2021-05-23] builders */

// array order //
function sortArrayBasedOnName()
{
    Products.sort((a,b) =>{
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(nameA < nameB)
        {
            return -1;
        }
        if(nameA > nameB)
        {
            return 1;
        }

        return 0;
    
    });
}

// Example
// Other examples on how to get the class name of an element:

