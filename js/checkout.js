const express = require ('express');
const app = express();
const mercadopago = require("mercadopago"); // SDK de Mercado Pago
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded // middleware

// // Agrega credenciales // cuenta del vendedor
mercadopago.configure({
    access_token: "TEST-7974656510754281-030814-20836cabe8f81d381a051d44e9a11510-162067010",
  });

app.post('/checkout',(req , res) => {

    // Creo un objeto de preferencia
    let preference = {

    items: [

      {
        title: req.body.title,
        unit_price: parseFloat(req.body.price),
        quantity:1,
      },
  
    ],
    // back_urls: {
    //   success: "http://localhost:3000/feedback",
    //   failure: "http://localhost:3000/feedback",
    //   pending: "http://localhost:3000/feedback",
    // },
    // auto_return: "approved",
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      console.log("response body: " + JSON.stringify(response.body));
      res.redirect(response.body.init_point);
    
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(5500,() => {
    console.log("server on port 5500");
});