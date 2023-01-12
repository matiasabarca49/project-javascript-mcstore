class Usuario{
    constructor(nombre, apellido,compra){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = "";
        this.ultimoCarrito = compra;
        this.cantidadCompras = 0;

    }

}

// const usuarios = [];

const usuarios = (JSON.parse(localStorage.getItem("usuarios")) ) || [] ;

const carrito = JSON.parse(localStorage.getItem("carrito"));

let usuarioActual;

carrito.forEach(producto => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const productoDeCarrito = document.createElement("div");
    productoDeCarrito.innerHTML= `<h3>${producto.nombre}</h3>
                                  <p>$${producto.precio} <span> X ${producto.cantidad} </span></p>`
    contenedorCarrito.appendChild(productoDeCarrito);
})


//Agregando el total al DOM
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

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const nombreUsuario = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    guardarUsuarios(nombreUsuario, apellido);
    
    if (nombreUsuario.value !== ""){
        
        agregarBotonPagar();   
    }

    formulario.reset();
    
})

function guardarUsuarios(nombre,apellido){
    const usuarioEncontrado = usuarios.find((usuario) => usuario.nombre === nombre.value && usuario.apellido === apellido.value );

    if (usuarioEncontrado === undefined){
        const direccion = document.getElementById("direccion");
        const usuario = new Usuario(nombre.value, apellido.value, carrito);
        usuario.direccion= direccion.value;
        usuarioActual = usuario;
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        // return false;
    }
    else{
        usuarioEncontrado.ultimoCarrito = carrito ;
        usuarioActual = usuarioEncontrado;
    //     return true;
    }
    sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}





function agregarBotonPagar(){
    const formulario = document.getElementById("formulario");
    formulario.innerHTML = ""
    const cambiarEstilo = document.getElementById("totalStyleID");
    cambiarEstilo.classList.remove("totalStyle");
    cambiarEstilo.classList.add("totalStyle--modified")
    const botonParaPagar = document.getElementById("botonParaPagar");
    botonParaPagar.innerHTML= ` <a class="buttn" href="../index.html">Seguir Comprando</a>
                                <button class="buttn buttnPagar" id="pagoFinal">Pagar</button>`
    const contenedorUsuarioActual = document.getElementById("usuarioLogueado");
    contenedorUsuarioActual.innerHTML= `<p>Ingresaste como <span> ${usuarioActual.nombre} ${usuarioActual.apellido} </span></p>`

    //Evento para hacer el pago final
    const pagoFinal = document.getElementById("pagoFinal");
    pagoFinal.addEventListener("click", () =>{
        window.location.href ="./prealizado.html";
        let carritoActual = JSON.parse(localStorage.getItem("carrito"));
        carritoActual = [];
        localStorage.setItem("carrito", JSON.stringify(carritoActual));

    } )
}
