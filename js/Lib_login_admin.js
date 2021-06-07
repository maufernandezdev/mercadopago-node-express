let useradminok = ['testuser', 'test1', 'admin']; // users array
let contraadminok = ['testuser123', 'test1', 'admin']; // admin password array

// crear array con usuarios y contraseñas para supuestos clientes para luego poder listarlos en el sector administrador

// object functions
var Functions =
{
    // check if the user entered is registered
    checkUser: function (user)
    {
        for (var i = 0; i < useradminok.length; i++)
        {
            if (useradminok[i] == user)
            {
                return i;
            }
        }
        return -1;
    },
    // check if the password entered belongs to a registered user 
    checkPass: function (pass)
    {
        for (var i = 0; i < contraadminok.length; i++)
        {
            if (contraadminok[i] == pass)
            {
                return i;
            }
        }
        return -1;
    },
    // check if the username and password are correct
    login: function (user, pass)
    {
        let ingresoExitoso = false;
        // check if user and pass are in the array 
        var userok = Functions.checkUser(user);
        var passok = Functions.checkPass(pass);
        if (userok == passok && userok != -1 && passok != -1)
        {
            ingresoExitoso = true;
            return ingresoExitoso;
        }
        else
        {
            if (userok == -1 && passok == -1)
            {
                alert("Lo siento usuario y contraseña incorrectas");
            }
            else
            {
                if (userok == -1)
                {
                    alert("Lo siento el usuario " + user + " no se encuentra registrado");
                }
                if (passok == -1)
                {
                    alert("Lo siento la contraseña ingresada es incorrecta");
                }
            }
            if (userok != passok && userok != -1 && passok != -1)
            {
                alert("Usuario y/o contraseña no coinciden");
            }
        }
        return ingresoExitoso;
    },
    administratorLoginToTheSystem: function ()
    {
        alert("Ingresando al sistema");
        let user = prompt("Usuario");
        let pass = prompt("Contraseña");
        /* Start [MRF 2021-05-13] for loop that allows you to make mistakes only 3 times in the username or password */
        for (var i = 0; i < 3; i++)
        {
            if (Functions.login(user, pass) == true)
            {
                alert("¡Bienvenido de nuevo " + user + "!");
                // redirect to customer order html
                window.location.href = "order_manager.html";
                break;
            }
            if (i != 2)
            {
                user = prompt("Usuario");
                pass = prompt("Contraseña");
            }
            else
            {
                alert("¡Límite de intentos alcanzado, conectar con el administrador para reiniciar!");
            }
        }
        /* End   [MRF 2021-05-13] for loop that allows you to make mistakes only 3 times in the username or password */
    },
};
// end object functions

// on html script begin
Functions.administratorLoginToTheSystem();
























