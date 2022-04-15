# mercadopago-node-express

The project includes the design of an e-commerce (No plugins or templates are used and it is fully responsive).
It also has a connection to `mercadopago` made with node js and express.
You can use the project to set up your own store and charge with mercadopago from Argentina

### node installations
Step 1: Start node (npm init --yes)
Step 2: Install express (npm install express)
Step 3: Install nodemon to display real-time server (npm install –D nodemon)
Step 4: Install body parser to be able to parse the body of the request (npm install body-parser)
Step 4: in package.json: Go to scripts and add shortcut to run nodemon pointing to the file where we are going to start express (npx nodemon js/file)
Step 5: Install the Mercadopago SDK (npm install mercadopago)
Step 6: We look for the Access token in our Mercadopago account

note: this access token will be use in `checkout.js` (mercadopago.configure)

### Contributing
If you are an Js o Node developer and want to propose new changes to be added into this project please feel free to:

Fork
Create a new local branch with your specific change.
Create a pull request so that I can review it and merge it into `DEV` branch. Eventually it will be merge into `PROD` branch to be used.
