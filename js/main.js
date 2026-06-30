console.log("JavaScript conectado correctamente");

// =====================================
// REGISTRO DE USUARIO
// =====================================

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {

    formRegistro.addEventListener("submit", function(e) {

        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let password = document.getElementById("password").value;
        let confirmarPassword = document.getElementById("confirmarPassword").value;

        // VALIDAR NOMBRE

        if(nombre.trim().length < 3){

            alert(
                "El nombre debe tener mínimo 3 caracteres"
            );

            return;

        }


        // VALIDAR CORREO

        const regexCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regexCorreo.test(correo)){

            alert(
                "Ingrese un correo electrónico válido"
            );

            return;

        }


        // VALIDAR CONTRASEÑA

        if(password.length < 4){

            alert(
                "La contraseña debe tener mínimo 4 caracteres"
            );

            return;

        }

        if (password !== confirmarPassword) {

            alert("Las contraseñas no coinciden");
            return;

        }

        let usuario = {

            nombre: nombre,
            correo: correo,
            password: password

        };

        fetch("http://localhost:3000/registrar", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)

        })

        .then(async response => {

            const data = await response.json();

            if(!response.ok){

                throw new Error(data.mensaje);

            }

            return data;

        })

        .then(data => {

        alert(data.mensaje);

        window.location.href =
            "login.html";

    })

        .catch(error => {

        alert(error.message);

    });

    });   

} 


// =====================================
// LOGIN
// =====================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(e){

        e.preventDefault();

        let correo =
            document.getElementById("correoLogin").value;

        let password =
            document.getElementById("passwordLogin").value;

        

                fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo,
                password
            })

        })

        .then(async response => {

            const data = await response.json();

            if(!response.ok){

                throw new Error(data.mensaje);

            }

            return data;

        })

.then(data => {

    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(data.usuario)
    );

    alert(
        "Bienvenido " +
        data.usuario.nombre
    );

    window.location.href =
        "index.html";

})

.catch(error => {

    alert(error.message);

});

    });

}



// =====================================
// MOSTRAR USUARIO LOGUEADO
// =====================================

let sesion =
    JSON.parse(localStorage.getItem("sesionActiva"));

let usuarioLogueado =
    document.getElementById("usuarioLogueado");

if(sesion && usuarioLogueado){

    usuarioLogueado.innerHTML =
        "👋 Bienvenido, " + sesion.nombre;

}
// =====================================
// CERRAR SESIÓN
// =====================================
function cerrarSesion(){

    localStorage.removeItem("sesionActiva");

    alert("Sesión cerrada");

    window.location.href = "login.html";

}

// MOSTRAR NOMBRE EN NAVBAR

sesion =
JSON.parse(localStorage.getItem("sesionActiva"));

let nombreUsuarioNav =
    document.getElementById("nombreUsuarioNav");

console.log(sesion);
console.log(nombreUsuarioNav);

if(sesion){

    if(nombreUsuarioNav){

        nombreUsuarioNav.textContent =
            sesion.nombre;
    }
}

let datosUsuario =
    document.getElementById("datosUsuario");

if(sesion){

    if(nombreUsuarioNav){

    nombreUsuarioNav.textContent =
        " " + sesion.nombre;

    }

    if(datosUsuario){

        datosUsuario.innerHTML =
            "<strong>" + sesion.nombre + "</strong><br>" +
            sesion.correo;

    }

}

// MENU DESPLEGABLE

function toggleMenuUsuario(){

    let menu =
        document.getElementById("menuUsuario");

    if(menu){

        menu.classList.toggle("mostrar-menu");

    }

}

// CERRAR MENU AL HACER CLICK FUERA
document.addEventListener("click", function(e){

    let menu = document.getElementById("menuUsuario");
    let boton = document.getElementById("btnUsuario");

    if(
        menu &&
        boton &&
        !menu.contains(e.target) &&
        !boton.contains(e.target)
    ){
        menu.classList.remove("mostrar-menu");
    }

});


// ================================
// BUSCADOR DE PRODUCTOS
// ================================

const buscador =
document.getElementById("buscarProducto");

if(buscador){

    buscador.addEventListener("keyup", function(){

        const texto =
        this.value.toLowerCase();

        const filas =
        document.querySelectorAll(
            "#tablaProductos tr"
        );

        filas.forEach((fila, indice) => {

            // No ocultar encabezado
            if(indice === 0){
                return;
            }

            const contenido =
            fila.textContent.toLowerCase();

            if(
                contenido.includes(texto)
            ){
                fila.style.display = "";
            }
            else{
                fila.style.display = "none";
            }

        });

    });

}
// ===========================
// FILTRO POR CATEGORIAS
// ===========================

const categorias =
document.querySelectorAll(".categoria-item");

if(categorias.length > 0){

    categorias[0].classList.add(
        "categoria-activa"
    );

    categorias.forEach(categoria => {

        categoria.addEventListener("click", () => {

            categorias.forEach(item => {
                item.classList.remove(
                    "categoria-activa"
                );
            });

            categoria.classList.add(
                "categoria-activa"
            );

            const categoriaSeleccionada =
            categoria.dataset.categoria;

            const filas =
            document.querySelectorAll(
                "#tablaProductos tr[data-categoria]"
            );

            filas.forEach(fila => {

                if(
                    categoriaSeleccionada ===
                    "todos"
                ){

                    fila.style.display = "";

                }
                else if(
                    fila.dataset.categoria ===
                    categoriaSeleccionada
                ){

                    fila.style.display = "";

                }
                else{

                    fila.style.display = "none";

                }

            });

        });

    });

}

// ======================================
// MOSTRAR PRODUCTO SELECCIONADO
// ======================================

document.addEventListener("DOMContentLoaded", function(){

    let detallePago =
    document.getElementById("detallePago");

    let totalPago =
    document.getElementById("totalPago");

    if(detallePago){

        detallePago.innerHTML =
        localStorage.getItem("detallePago")
        || "Sin productos";

    }

    if(totalPago){

        totalPago.textContent =
        localStorage.getItem("totalPago")
        || "0";

    }

});

// ======================================
// AUTOCOMPLETAR NOMBRE DEL CLIENTE
// ======================================

document.addEventListener("DOMContentLoaded", function(){

    let sesion =
    JSON.parse(
        localStorage.getItem("sesionActiva")
    );

    let nombreCliente =
    document.getElementById(
        "nombreCliente"
    );

    if(
        sesion &&
        nombreCliente
    ){

        nombreCliente.value =
        sesion.nombre;

        nombreCliente.readOnly = true;

    }

});

// ======================================
// AUTOCOMPLETAR PRODUCTO SELECCIONADO
// ======================================

document.addEventListener("DOMContentLoaded", function(){

    let productoSeleccionado =
    localStorage.getItem(
        "productoSeleccionado"
    );

    let plato =
    document.getElementById("plato");

    if(
        productoSeleccionado &&
        plato
    ){

        plato.value =
        productoSeleccionado;

        actualizarResumen();

    }

});

// ======================================
// AGREGAR PRODUCTO AL PEDIDO
// ======================================

function agregarPedido(nombreProducto){

    console.log("PRODUCTO:", nombreProducto);

    localStorage.setItem(
        "productoSeleccionado",
        nombreProducto
    );

    window.location.href =
        "form_pedido.html";

}
// agregarPedido desde oferta//
function pedirOferta(nombreProducto){

    localStorage.setItem(
        "productoSeleccionado",
        nombreProducto
    );

    window.location.href =
        "form_pedido.html";

}


/*platos secundarios */

let contadorPlatos = 1;

function agregarPlato(){

    contadorPlatos++;

    const contenedor =
    document.getElementById("platosExtras");

    if(!contenedor){
        return;
    }

    const nuevoPlato =
    document.createElement("div");

    nuevoPlato.classList.add("plato-extra");

    nuevoPlato.innerHTML = `

        <hr>

        <h4>
            🍽 Plato ${contadorPlatos}
        </h4>

        <label>Plato:</label>

        <select onchange="actualizarResumen()">

            <option disabled selected>
                Seleccione un plato
            </option>

            <option>Pollo a la brasa</option>
            <option>Arroz Chaufa</option>
            <option>Hamburguesa</option>
            <option>Lomo Saltado</option>
            <option>Ají de Gallina</option>
            <option>Tallarines Verdes</option>
            <option>Pizza Familiar</option>
            <option>Salchipapas</option>
            <option>Ceviche</option>
            <option>Chicharrón de pollo</option>
            <option>Broaster</option>
            <option>Ensalada César</option>
            <option>Hot Dog</option>
            <option>Empanadas</option>
            <option>Arroz con Pollo</option>
            <option>Combo ReFood</option>
            <option>Mega Burger XL</option>
            <option>Salchi Monster</option>
            <option>Combo Sushi</option>
            <option>Combo Marino</option>
            <option>Bisteck a lo pobre</option>
            <option>Menú Megaeconómico</option>
            <option>Taco Mix</option>
            <option>Crunchy Mix</option>
            <option>Chinese Combo</option>
            <option>Meat House</option>
            <option>Mega Nuggets de Pollo</option>

        </select>

        <br><br>

        <label>Cantidad:</label>

        <input
            type="number"
            min="1"
            value="1"
            oninput="actualizarResumen()">

        <br><br>

        <button
        type="button"
        onclick="eliminarPlato(this)"
        class="btn-eliminar">

        ❌ Eliminar

        </button>

    `;

    contenedor.appendChild(
        nuevoPlato
    );

    actualizarResumen();

}


function eliminarPlato(boton){

    boton.parentElement.remove();

    renumerarPlatos();

    actualizarResumen();

}

function renumerarPlatos(){

    const platos =
    document.querySelectorAll(".plato-extra");

    platos.forEach((plato, indice) => {

        let titulo =
        plato.querySelector("h4");

        if(titulo){

            titulo.innerHTML =
            "🍽 Plato " + (indice + 2);

        }

    });

    contadorPlatos =
    platos.length + 1;

}


/*PRECIOS DE LOS PRODUCTOS*/
const precios = {

    "Pollo a la brasa": 15,
    "Arroz Chaufa": 10,
    "Hamburguesa": 12,
    "Lomo Saltado": 14,
    "Ají de Gallina": 13,
    "Tallarines Verdes": 11,
    "Pizza Familiar": 18,
    "Salchipapas": 7,
    "Ceviche": 16,
    "Chicharrón de pollo": 12,
    "Broaster": 11,
    "Ensalada César": 9,
    "Hot Dog": 6,
    "Empanadas": 5,
    "Arroz con Pollo": 10,
    "Mega Burger XL": 5,
    "Salchi Monster": 9,
    "Combo ReFood": 8,
    "Combo Sushi": 9,
    "Combo Marino": 11,
    "Bisteck a lo pobre": 9,
    "Taco Mix":6,
    "Crunchy Mix": 12,
    "Chinese Combo": 10,
    "Meat House": 14,
    "Mega Nuggets de Pollo": 8,
    "Menú Megaeconómico": 6

};


function actualizarResumen(){
    

    let textoResumen = "";

    let totalCantidad = 0;

    let totalPedido = 0;

    // Plato principal

    let platoPrincipal =
    document.getElementById("plato");

    let cantidadPrincipal =
    document.getElementById("cantidadPrincipal");

    if(
        platoPrincipal &&
        cantidadPrincipal
    ){

        let precioPrincipal =
        (precios[platoPrincipal.value] || 0) *
        (parseInt(cantidadPrincipal.value) || 0);

        textoResumen +=
        `
        <div class="item-resumen">
            <span>
                • ${platoPrincipal.value} x${cantidadPrincipal.value}
            </span>
            <span>
                S/ ${precioPrincipal}
            </span>
        </div>
        `;

        totalCantidad +=
        parseInt(
            cantidadPrincipal.value
        ) || 0;

        totalPedido +=
    (precios[platoPrincipal.value] || 0) * (parseInt(cantidadPrincipal.value) || 0);

    }

    // Platos extras

    let platosExtras =
    document.querySelectorAll(
        ".plato-extra"
    );

    platosExtras.forEach(plato => {

    let select =
    plato.querySelector("select");

    let cantidad =
    plato.querySelector(
        "input[type='number']"
    );

    if(select && cantidad){

        let precioExtra =
        (precios[select.value] || 0) *
        (parseInt(cantidad.value) || 0);

        textoResumen +=
        `
        <div class="item-resumen">
            <span>
                • ${select.value} x${cantidad.value}
            </span>
            <span>
                S/ ${precioExtra}
            </span>
        </div>
        `;

        totalCantidad +=
        parseInt(
            cantidad.value
        ) || 0;

        totalPedido +=
        (precios[select.value] || 0)
        *
        (parseInt(cantidad.value) || 0);

    }

    });

    document.getElementById(
        "listaResumen"
    ).innerHTML =
    textoResumen;

    document.getElementById(
    "resumenTotal"
    ).textContent =
    totalPedido;

    document.getElementById(
    "resumenCantidad"
    ).textContent =
    totalCantidad;

    localStorage.setItem(
    "ultimoTotal",
    totalPedido
    );

    let productoSeleccionado =
    document.getElementById(
        "nombreProductoSeleccionado"
    );

    if(productoSeleccionado){

        productoSeleccionado.innerHTML =
        textoResumen;

    }
    if(textoResumen === ""){

    textoResumen =
    "Ningún plato seleccionado";

    }

}

document.addEventListener("DOMContentLoaded", function(){

    if(document.getElementById("listaResumen")){

        actualizarResumen();

    }

});


// ======================================
// GUARDAR PEDIDO
// ======================================

async function guardarPedido(){

    let pedidos =
    JSON.parse(localStorage.getItem("pedidos")) || [];

    let plato =
    document.getElementById("plato").value;

    let cantidad =
    document.getElementById("cantidadPrincipal").value;

    let detallePedido =
    document.getElementById("listaResumen").innerText;

    let total =
    document.getElementById("resumenTotal").textContent;

    console.log("TOTAL:", total);

    let fechaHora =
    new Date().toLocaleString("es-PE");

    let nuevoPedido = {

    id: pedidos.length + 1,

    fecha:
    fechaHora,

    producto:
    detallePedido,

    cantidad:
    cantidad,

    total:
    total,

    estado:
    "Preparando",

    tiempoCreacion: Date.now()


};

    localStorage.setItem(
    "detallePago",
    detallePedido
);

    localStorage.setItem(
        "cantidadPago",
        cantidad
    );

    localStorage.setItem(
        "totalPago",
        total
    );

    pedidos.push(nuevoPedido);

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    console.log("ANTES DEL FETCH");
    console.log(nuevoPedido);

    const response = await fetch(
    "http://localhost:3000/pedido",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoPedido)
    }
);

const data = await response.json();

console.log(data.mensaje);

nuevoPedido.idSQLite =
    data.idSQLite;

pedidos[pedidos.length - 1] =
    nuevoPedido;

localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidos)
);

console.log(
    "ID SQLITE:",
    data.idSQLite
);

}

// ======================================
// MOSTRAR PEDIDOS REALIZADOS
// ======================================

document.addEventListener("DOMContentLoaded", function(){

    let tablaPedidos =
    document.getElementById("tablaPedidos");

    if(!tablaPedidos){
        return;
    }

    let pedidos =
    JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    tablaPedidos.innerHTML = "";

    if(pedidos.length === 0){

    tablaPedidos.innerHTML = `

    <tr>

        <td colspan="7">

            📦 Aún no has realizado ningún pedido.

        </td>

    </tr>

    `;

    return;

    }   

    pedidos.forEach(pedido => {

        if(
        pedido.estado === "Preparando" &&
        Date.now() - pedido.tiempoCreacion >= 20000
        ){

            pedido.estado = "Entregado";

            fetch(
                "http://localhost:3000/pedido/" + pedido.idSQLite,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        estado: "Entregado"
                    })
                }
            );

        }

        tablaPedidos.innerHTML += `

        <tr>

            <td>${pedido.id}</td>

            <td>${pedido.fecha}</td>

            <td class="productos-pedido">
                ${pedido.producto}
            </td>

            <td>${pedido.cantidad}</td>

            <td>S/ ${pedido.total}</td>

            <td class="${
                pedido.estado === 'Preparando'
                    ? 'preparando'
                    : pedido.estado === 'Entregado'
                    ? 'entregado'
                    : 'cancelado'
            }">
                ${pedido.estado}
            </td>


        </tr>

`;

    });

    localStorage.setItem(
    "pedidos",
    JSON.stringify(pedidos)
);

});


// ======================================
// CONFIRMAR PAGO
// ======================================

function confirmarPago(){

    let metodo =
    document.getElementById(
        "metodoPago"
    ).value;

    let pedidos =
    JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    if(pedidos.length > 0){

    pedidos[pedidos.length - 1].estado =
    "Preparando";

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

}

    alert(
        "✅ Pago realizado con " +
        metodo
    );

    window.location.href =
    "pedidos.html";

}

/*cancelar desde pago*/
function cancelarDesdePago(){

    let confirmar = confirm(
        "¿Deseas cancelar este pedido?"
    );

    if(!confirmar){
        return;
    }

    let pedidos =
    JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    if(pedidos.length > 0){

    fetch(
    "http://localhost:3000/pedido/" +
    pedidos[pedidos.length - 1].idSQLite,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            estado: "Cancelado"
        })
    }
    );

    pedidos[pedidos.length - 1].estado =
    "Cancelado";

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    }

    alert("Pedido cancelado");

    window.location.href =
    "form_pedido.html";

}

// ======================================
// IR A PAGO
// ======================================

async function irAPago(){

    let telefono =
    document.getElementById(
        "telefono"
    ).value.trim();


    // VALIDAR CELULAR

    const regexTelefono =
    /^9\d{8}$/;


    if(!regexTelefono.test(telefono)){

        alert(
            "Ingrese un número celular válido de 9 dígitos"
        );

        return;

    }


    await guardarPedido();

    window.location.href =
        "pago.html";

}

// ===================================
// OFERTA DEL DIA ANIMADA
// ===================================

const oferta = document.getElementById("ofertaDia");

if (oferta) {

    setInterval(() => {

        oferta.style.visibility =
            oferta.style.visibility === "hidden"
            ? "visible"
            : "hidden";

    }, 1400);

}


// =====================================
// MODO OSCURO
// =====================================

function cambiarModo(){

    document.body.classList.toggle(
        "modo-oscuro"
    );


    let modoOscuro =

        document.body.classList.contains(
            "modo-oscuro"
        );


    localStorage.setItem(
        "modoOscuro",
        modoOscuro
    );


    let boton =

        document.getElementById(
            "btnModo"
        );



}



// CARGAR EL MODO GUARDADO

window.addEventListener(

    "load",

    function(){

        let modoGuardado =

            localStorage.getItem(
                "modoOscuro"
            );


        if(modoGuardado === "true"){

            document.body.classList.add(
                "modo-oscuro"
            );


            let boton =

                document.getElementById(
                    "btnModo"
                );


        }

    }

);