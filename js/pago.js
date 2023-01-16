/* Clase que guarda el usuario actual, se crea una base de datos de los usuarios que compraron. Todo esto se guarda en el localstotage */
class Usuario{
    constructor(nombre, apellido,compra){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = "";
        this.ultimoCarrito = compra;
        this.cantidadCompras = 0;

    }

}

//Se llama el array de usuarios guardado en el localstorage, en caso de que no exista, se crea uno nuevo.
const usuarios = (JSON.parse(localStorage.getItem("usuarios")) ) || [] ;

//Llamamos el carrito guardado en localstorage del usuario actual.
const carrito = JSON.parse(localStorage.getItem("carrito"));

//Variable que permite que una vez hecho el pago. Se guarde el objeto que almacena la informacion del usuarioActual
let usuarioActual;

// Renderizamos los productos del carrito en el DOM
carrito.forEach(producto => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const productoDeCarrito = document.createElement("div");
    productoDeCarrito.innerHTML= `<h3>${producto.nombre}</h3>
                                  <p>$${producto.precio} <span> X ${producto.cantidad} </span></p>`
    contenedorCarrito.appendChild(productoDeCarrito);
})


//Agregando el total al DOM con el envio
const totalCompra = carrito.reduce((acumulador, producto) => (producto.precio * producto.cantidad) + acumulador,0)
const contenedorTotal = document.getElementById("total");
if (totalCompra > 3000){
    contenedorTotal.innerHTML= `<h4> Productos: $${totalCompra} + <span> Envio Gratis</span> </h4>
                                <h2>Total: $${totalCompra}</h2>`;

}
else{
    contenedorTotal.innerHTML= `<h4> Productos: $${totalCompra} + <span> $700 de Envio</span> </h4>
                                <h2>Total: $${totalCompra + 700}</h2>`;
}


// Creamos el evento en el boton "submit" del formulario. Al dar a enviar, se ejecutan las instrucciones necesarias
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e)=>{
    //Evitamos el comportamiento por defecto de recargar la pagina al enviar el formulario
    e.preventDefault();

    //Obtenemos los datos ingresados por el usuario
    const nombreUsuario = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");

    //Evitar que se guarden usuarios sin nombres
    if (nombreUsuario.value !== ""){
        
        //Funcion que guarda los datos del usuario ingresado en el formulario
        guardarUsuarios(nombreUsuario, apellido);
        //Si el usuario completó los datos de manera adecuada, se agrega el boton pagar
        agregarBotonPagar();   
    }

    //Reinicia el formulario una vez completado
    formulario.reset();
    
})

function guardarUsuarios(nombre,apellido){
    //Se verifica si el usuario ya se encuentra en el array de usuarios
    const usuarioEncontrado = usuarios.find((usuario) => usuario.nombre === nombre.value && usuario.apellido === apellido.value );

    //Si no se encuentra lo creamos
    if (usuarioEncontrado === undefined){
        const direccion = document.getElementById("direccion");
        //Instanciamos el nuevo objeto
        const usuario = new Usuario(nombre.value, apellido.value, carrito);
        usuario.direccion = direccion.value;
        usuarioActual = usuario; // Se asigna el objeto al usuario actual.
        usuarios.push(usuario);//Se guarda en el array
        localStorage.setItem("usuarios", JSON.stringify(usuarios));// El array usuario se guarda en localstorage, creando una base de usuarios
        
    }
    else{
        //Si el usuario se encuentra en el array, se actualiza el carrito.
        usuarioEncontrado.ultimoCarrito = carrito ;
        usuarioActual = usuarioEncontrado;
    
    }
    //Guardamos el objeto usuario en un sessionStorage para utilizarlo en los proximos pasos una vez hecho el pago
    sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}





function agregarBotonPagar(){
    //El apartado formulario se elimina del DOM. Remplazado por un string vacio -> ""
    const formulario = document.getElementById("formulario");
    formulario.innerHTML = ""
    //Se obtiene el contenedor de total y se realizan cambios de estilos cambiando de clase
    const cambiarEstilo = document.getElementById("totalStyleID");
    cambiarEstilo.classList.remove("totalStyle");
    cambiarEstilo.classList.add("totalStyle--modified")
    //Ahora si obtenemos el contenedor que contiene el boton "Pagar" y agremos elemetos HTML
    const botonParaPagar = document.getElementById("botonParaPagar");
    botonParaPagar.innerHTML= ` <a class="buttn" href="../index.html">Seguir Comprando</a>
                                <button class="buttn buttnPagar" id="pagoFinal">Pagar</button>`
    //En la esquina superior derecha se indica el usuario actual
    const contenedorUsuarioActual = document.getElementById("usuarioLogueado");
    contenedorUsuarioActual.innerHTML= `<p>Ingresaste como <span> ${usuarioActual.nombre} ${usuarioActual.apellido} </span></p>`

    //Evento para hacer el pago final
    const pagoFinal = document.getElementById("pagoFinal");
    pagoFinal.addEventListener("click", () =>{
        window.location.href ="./prealizado.html";
        //Al realizar el pago, el carrito se reinicia y lo guardamos en el localstorage
        let carritoActual = JSON.parse(localStorage.getItem("carrito"));
        carritoActual = [];
        localStorage.setItem("carrito", JSON.stringify(carritoActual));

    } )
}
