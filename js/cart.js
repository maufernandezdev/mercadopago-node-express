/* [MRF 2022-04-15] fill DOM with cards */
function onLoadPage()
{
    let container = document.getElementsByClassName('item-container');
    let buttonContainer = document.getElementsByClassName('button-container');
    
    let div = document.createElement("div");
    div.setAttribute("class", "item");
    
    let divButton = document.createElement("div");
    divButton.setAttribute("class", "total");
    divButton.setAttribute("id", "total");
    
    let divForm = document.createElement("div");
    divForm.setAttribute("id", "form-div");
        
    let item = localStorage.getItem("cart"); 
    let cart =  JSON.parse(item); 
    let quantity = 0;
    let total = 0;
    let count = 0;
    let producto = '';
    
    for(var j=0;j<cart.length;j++)
    {   
        if(cart[j].quantity > 0)
        {   
            count++;
            quantity += cart[j].quantity;
            total += cart[j].price * cart[j].quantity;
            producto = cart[j].name;
    
            let div = document.createElement("div");
            div.setAttribute("class", "item");
            div.setAttribute("id", cart[j].img);
            let imgClass = 'img-container';
            let detailClass = 'detail-container';
            if(cart[j].imgType == 'tall')
            {
                imgClass = 'img-container-tall';
                detailClass = 'detail-container-tall';
            }
            div.innerHTML = ` 
            <div class="${imgClass}">
            <img src="${cart[j].img}">
            </div>
            <div class="${detailClass}">
            <h3>${cart[j].name}</h3>
        
            <p>$${cart[j].price}</p>
            <div class="quantity">
                <button class="subtract" value="${cart[j].quantity}" name="${cart[j].name}">-</button>
                <label id="${cart[j].name}">${cart[j].quantity}</label>
                <button class="add" value="${cart[j].quantity}" name="${cart[j].name}">+</button>
            </div>
            </div>
            <div class="trash-container" name="${cart[j].img}">
                <i class='bx bx-trash'></i>
            </div>
            `;
            container[0].appendChild(div);
        }
    }
    
    localStorage.setItem("count", count);
    divButton.innerHTML = ` 
        <h3>${quantity} items</h3>
        <h3>$${total}</h3>
        `;
    buttonContainer[0].appendChild(divButton);
    if(quantity == 0 && total == 0)
    {
        divForm.innerHTML = ` 
            <button class="empty-cart-button" onclick="error()">Pagar</button>
        `;
    }
    else
    {
        if(count > 1)
        {
            producto = 'Productos';
        }
        divForm.innerHTML = ` 
                        <form action="http://localhost:5500/checkout" method="POST">
                            <input type="submit" value="Pagar" id="pay">
                            <input type="hidden" name="title" value="${producto}">
                            <input type="hidden" name="price" value="${total}">
                        </form>
        `;
    }
    buttonContainer[0].appendChild(divForm);
    
    initializeEvents();
  
}

onLoadPage();

/* [MRF 2022-04-15] initialize events like "on subtract click" or "on add click" */
function initializeEvents()
{   
    let count = localStorage.getItem("count");
    for(var i = 0;i < count;i++)
    {   
        let subtract = document.getElementsByClassName('subtract')[i];
        let add = document.getElementsByClassName('add')[i];
        let trash = document.getElementsByClassName('trash-container')[i];
        subtract.addEventListener("click" , () =>{
             
            var name = subtract.getAttribute('name');
            let subtractValue = subtract.value;
            console.log("resta");
            let newValue = subtractValue - 1;
            if(newValue > 0)
            {
                subtract.value = newValue;
                add.value = newValue;
                document.getElementById(name).innerHTML= newValue;
    
                var item = localStorage.getItem("cart"); 
                var cart =  JSON.parse(item); 
                var cartContent = [];
                if(cart)
                {
                    for(var j=0;j<cart.length;j++)
                    {
                        if(cart[j].name == name)
                        {
                            cart[j].quantity --; 
                        }
                        cartContent.push(cart[j]);
                    }
                }
                
                localStorage.removeItem("cart"); // empty the localStorage before refilling it
                localStorage.setItem("cart" , JSON.stringify(cartContent)); // fill localStorage
                console.log("local storage obj array: " + JSON.stringify(cartContent));
    
                updatePrice(); // update price in DOM
            }
    
        });
    
        add.addEventListener("click" , () =>{
             
            var name = add.getAttribute('name');
            let addValue = add.value;
            console.log("suma");
            let newValue = parseInt(addValue) + 1;
            // chequear stock aqui (cuando lo haya)
            add.value = newValue;
            subtract.value = newValue;
            document.getElementById(name).innerHTML= newValue;
    
            var item = localStorage.getItem("cart"); 
            var cart =  JSON.parse(item); 
            var cartContent = [];
            if(cart)
            {
                for(var j=0;j<cart.length;j++)
                {
                    if(cart[j].name == name)
                    {
                        cart[j].quantity ++; 
                    }
                    cartContent.push(cart[j]);
                }
            }
                
            localStorage.removeItem("cart"); // empty the localStorage before refilling it
            localStorage.setItem("cart" , JSON.stringify(cartContent)); // fill localStorage
            console.log("local storage obj array: " + JSON.stringify(cartContent));
    
            updatePrice(); // update price in DOM
        });
    
        trash.addEventListener("click" , () =>{
             
            var imgName = trash.getAttribute('name');
            
            console.log("remove element");
    
            var element = document.getElementById(imgName);
            element.parentNode.removeChild(element);
    
            var item = localStorage.getItem("cart"); 
            var cart =  JSON.parse(item); 
            var cartContent = [];
            if(cart)
            {
                for(var j=0;j<cart.length;j++)
                {
                    if(cart[j].img == imgName)
                    {
                        cart[j].quantity = 0;
                    }
    
                    cartContent.push(cart[j]);
                }
            }
                
            localStorage.removeItem("cart"); // empty the localStorage before refilling it
            localStorage.setItem("cart" , JSON.stringify(cartContent)); // fill localStorage
            console.log("local storage obj array: " + JSON.stringify(cartContent));
    
            updatePrice(); // update price in DOM
        });
    }
}



/* [MRF 2022-04-15] update price in total div, and set inputs hidden to send the correct value to mercadopago */
function updatePrice()
{   
    let count = 0;
    let total = 0;
    var item = localStorage.getItem("cart"); 
    var cart =  JSON.parse(item); 
    if(cart)
    {
        for(var j=0;j<cart.length;j++)
        {   
            if(cart[j].quantity > 0)
            {
                count += cart[j].quantity;
                total += cart[j].price * cart[j].quantity;
            }
        }
    }
    let element = document.getElementById('total');
    element.parentNode.removeChild(element);

    element = document.getElementById('pay');
    element.parentNode.removeChild(element);

    let buttonContainer = document.getElementsByClassName('button-container');

    let divButton = document.createElement("div");
    divButton.setAttribute("class", "total");
    divButton.setAttribute("id", "total");
    divButton.innerHTML = ` 
    <h3>${count} items</h3>
    <h3>$${total}</h3>
    `;
    buttonContainer[0].appendChild(divButton);

    /* [MRF 2022-04-13] form creation */
    element = document.getElementById('form-div');
    element.parentNode.removeChild(element);
    let divForm = document.createElement("div");
    divForm.setAttribute("id", "form-div");
    if(total == 0 && count == 0)
    {
        divForm.innerHTML = ` 
            <button class="empty-cart-button" onclick="error()">Pagar</button>
        `;
    }
    else
    {
        divForm.innerHTML = ` 
                    <form action="http://localhost:5500/checkout" method="POST">
                        <input type="submit" value="Pagar" id="pay">
                        <input type="hidden" name="title" value="Productos">
                        <input type="hidden" name="price" value="${total}">
                    </form>
        `;
    }
    buttonContainer[0].appendChild(divForm);
}

function error()
{
    let message = 'El carrito esta vacío';
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

/* [MRF 2022-04-13] next to do */
// cartel para cuando quieren comprar y el carrito esta vacio
// estilos para version desktop
// cambios sugeridos por el equipo (paper)