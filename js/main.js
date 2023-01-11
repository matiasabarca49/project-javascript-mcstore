/* === Funcion para agregar los productos al carrito === */
function agregarACarrito(idProducto){

    let notificacion = true;
    
    //Verificamos si el producto ya se encuentra en el carrito
    const prodEncontradoEnCarrito = carrito.find((producto) => producto.id === idProducto);

    // Si el condicional se cumple, aumentamos el atributo cantidad del producto.
    //Si el producto fue encontrado y tambien evaluamos que no se supere el stock.
    if (prodEncontradoEnCarrito && prodEncontradoEnCarrito.cantidad < prodEncontradoEnCarrito.stock){
        prodEncontradoEnCarrito.cantidad++;
        const actualizarCantidad = document.getElementById(`cant${prodEncontradoEnCarrito.id}`);
        //Actualizamos el apartado cantidad en el DOM reescribiendo el contenido del elemento "span"
        actualizarCantidad.innerHTML=`x ${prodEncontradoEnCarrito.cantidad}`;
    }
    else if (prodEncontradoEnCarrito === undefined){
        //Si no se cumple el condicional, se busca en la base de datos y se agrega al carrito
        const prodEncontradoEnBaseDatos = productos.find((producto) => producto.id === idProducto);
        carrito.push(prodEncontradoEnBaseDatos);
        //Pinta el DOM con el producto elegido
        mostrarProducto(prodEncontradoEnBaseDatos);
        //Al agregar el primer producto, se agrega el boton "Vaciar Carrito"
        agregarBotonVaciarEnElCarrito();
         
    }
    else{
        notificacion = false;
        swal.fire({
            position: 'top',
            text: "Alcanzado el stock máximo",
            customClass:{
                confirmButton: "buttn buttnAlertAffirmative",
            },
            buttonsStyling: false,
            timer: 1000,
            icon: "error",
            showConfirmButton: false
        })
    }
    
    // Notificacion "Producto agregado al carrito" 
    if (notificacion === true){
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(100,130,200,1) 0%, rgba(75,90,150,1) 0%, rgba(64,81,99,1) 59%)",
            },
        }).showToast();
    }
    

    // Modificar el DOM agregando la cantidad de productos en el boton carrito 
    //simplemente varificando la cantidad de objeto en el array carrito  
    productosEnElCarrito();


    // Calcular la suma total del carrito
    sumaCarrito();
}


/* === Funcion que nos permite ver el el boton carrito del DOM cuantos productos tenemos en el carrito, 
ademas guardar el carrito en el localstorage*/
function productosEnElCarrito(){
    const cantProdEnCarrito = document.getElementById("cantProdEnCarrito");
    //Se calcula cuantos objetos hay en el array  carrito
    cantProdEnCarrito.innerText = carrito.length;
    //Como es una funcion que se invoca constantemente, en esta funcion se guarda el carrito en localstorage
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}


/*=== Funcion para maquetar los producto en DOM en seccion carrito ===*/
const mostrarProducto = (objeto) =>{
    
    const contenedorCarrito = document.getElementById("carritoProductoID");
    const div = document.createElement("div");
    div.innerHTML= `<h4>${objeto.nombre}</h4>
                    <p>$${objeto.precio} <span id="cant${objeto.id}">x ${objeto.cantidad}</span></p>    
                    <div>
                        <p class="buttn buttnCarrito" id="mas${objeto.id}">+</p>
                        <p class="buttn buttnCarrito" id="menos${objeto.id}">-</p>
                        <p class="buttn buttnCarrito" id="eliminar${objeto.id}">X</p>
                    </div>`
    contenedorCarrito.appendChild(div);

    //=============================== Eventos en el Carrito =========================================

    // Eliminar elemento en el carrito
    const productoAEliminar = document.getElementById(`eliminar${objeto.id}`);
    productoAEliminar.onclick= () =>{
        eliminarProducto(objeto.id);
    }

    // Aumentar cantidad de productos
    const productoAIncrementar = document.getElementById(`mas${objeto.id}`);
        productoAIncrementar.onclick = () => {
            incrementarProducto(objeto.id)};


    // Reducir cantidad de productos
    const productoAReducir = document.getElementById(`menos${objeto.id}`);
    productoAReducir.onclick = () =>{
        reducirProducto(objeto.id);
    }
}


/* === Funcion para eliminar producto del carrito del DOM Y Array === */
function eliminarProducto(objetoID){
    const productoEncontradoCarrito = carrito.find((producto) => producto.id === objetoID)
    //Buscamos el indice del producto encontrado
    const indice = carrito.indexOf(productoEncontradoCarrito);
    //Como el producto se elimina, tenemos que reiniciar la cantidad a 1
    productoEncontradoCarrito.cantidad= 1;
    //Borramos el objeto del array
    carrito.splice(indice,1);
    //Actualizamos la cantidad en el boton carrito y actualizamos el localstorage con la siguiente funcion
    productosEnElCarrito();
    //Volvemos a pintar el carrito completo en el DOM
    mostrarCarritoCompleto(carrito);


}

/* ===  Funcion para incrementar producto en carrito === */
function incrementarProducto(objetoID){
    const cantidadActual = document.getElementById(`cant${objetoID}`)
    const prodEncontradoEnCarrito = carrito.find((producto)=> producto.id === objetoID);
    //Solo se actualiza la cantidad si no se supera el stock
    if (prodEncontradoEnCarrito.cantidad < prodEncontradoEnCarrito.stock){
        prodEncontradoEnCarrito.cantidad++;
    }
    else{
        swal.fire({
            position: 'top',
            text: "Alcanzado el stock máximo",
            customClass:{
                confirmButton: "buttn buttnAlertAffirmative",
            },
            buttonsStyling: false,
            timer: 1000,
            icon: "error",
            showConfirmButton: false
        })
    }
    //Actualizamos la cantidad en el DOM carrito
    cantidadActual.innerText =`x ${prodEncontradoEnCarrito.cantidad}`;
    //Volvemos a actualizan DOM de carrito
    productosEnElCarrito();
    sumaCarrito();
}

/* ===Funcion para reducir productos en carrito === */
function reducirProducto(objetoID){
    const cantidadActual = document.getElementById(`cant${objetoID}`)
    const prodEncontradoEnCarrito = carrito.find((producto)=> producto.id === objetoID);
    //La siguiente condicion nos evita que la cantidad de productos sea menor a 1
    if (prodEncontradoEnCarrito.cantidad > 1){
        prodEncontradoEnCarrito.cantidad--;
    }
    cantidadActual.innerText =`x ${prodEncontradoEnCarrito.cantidad}`;
    //Se agrega al localstorage con la siguiente funcion
    productosEnElCarrito();
    //Recalcular el total
    sumaCarrito();
}


/* === Funcion que nos permite pintar el DOM con el carrito completo. Esta funcion es utilizada al eliminar un producto, o
al vaciar el carrito === */
function mostrarCarritoCompleto(carrito){
    const contedorProductosCarrito = document.getElementById("carritoProductoID");
    //Borramos del DOM los producto actuales
    contedorProductosCarrito.innerHTML= ""
    carrito.forEach((producto)=> {
        //Se reutiliza la funcion que pinta el DOM de a un producto.
        mostrarProducto(producto)});
    productosEnElCarrito();
    sumaCarrito();
    
    //Si el carrito está vacio, agregamos la frase "Carrito Vacio" sino agregamos el boton.
    if (carrito.length === 0){
        const contenedorBotonVaciar = document.getElementById("vaciarCarrito");
        contenedorBotonVaciar.innerHTML= `<p class="carritoVacio">Carrito Vacio</p>`;
    }
    else{
        agregarBotonVaciarEnElCarrito();
    }

}

/* === Funcion agregar boton para vaciar carrito  === */
function agregarBotonVaciarEnElCarrito(){
    if (carrito.length !== 0) {
      const contenedorBotonVaciar = document.getElementById("vaciarCarrito");
      contenedorBotonVaciar.innerHTML= "";
      const botonVaciarCarrito = document.createElement("button");
      botonVaciarCarrito.classList= "buttn buttnCarrito"
      botonVaciarCarrito.innerText= "Vaciar Carrito"
      contenedorBotonVaciar.appendChild(botonVaciarCarrito);
  }

  // Evento para Vaciar carrito 

  const botonVaciarCarrito = document.querySelector("#vaciarCarrito button");
  botonVaciarCarrito.onclick = () => {
      swal.fire({
          text: "¿Vaciar el carrito?",
          icon: "warning",
          confirmButtonText:"Si",
          showCancelButton: true,
          cancelButtonText:"No",
          customClass:{
              confirmButton: "buttn buttnAlertAffirmative",
              cancelButton: "buttn buttnCarrito"
          },
          buttonsStyling: false
      }).then((result) => {
              if (result.isConfirmed === true){
               vaciarCarrito();
              } 
          });
  }; 
 
}

/* ==== Funcion para vaciar carrito === */

function vaciarCarrito(){
    carrito = [];
    //Para reiniciar la cantidad en cada producto
    productos.forEach((producto => producto.cantidad = 1))
    mostrarCarritoCompleto(carrito);
}


/* === Costo total del carrito === */

function sumaCarrito(){
    const total = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad) ,0);
    const totalProd = document.getElementById("totalCompra");
    //Modificamos el DOM en el carrito con el total + envio
    totalProd.innerHTML = `<p>Productos: $ ${total} + <span id="contenedorEnvio">700</span></p>`;
    // ID que nos permite modificar el apartado envio
    const contenedorEnvio = document.getElementById("contenedorEnvio");
    const contenedorTotalFinal = document.getElementById("totalFinal");
    // Si el total supera los 3000 no se suma el "Envio" y se modifica el DOM agregando envio gratis
    if (total > 3000){
        contenedorEnvio.innerText="Envio Gratis"
        contenedorTotalFinal.innerHTML = `<p class="totalAPagar__final"> Final: $ ${(total)}</p>
                                          <button class=" buttn buttnPagar" id="pago"> Ir a pagar </button>`;
        // Funcion que crea el evento en el boton. 
        pagar();

    }
    else if (total === 0){ //Si no hay productos, eliminamos el apartado envios
        totalProd.innerText=""
        contenedorTotalFinal.innerHTML = `<p>Final: $ ${total}</p>` ;
        
    }
    else{ // Al total le sumamos el envio en caso de que no supere los 3000 y creamos el boton pagar
        contenedorEnvio.innerText="$700 de envio"
        contenedorTotalFinal.innerHTML = `<p class="totalAPagar__final"> Final: $ ${(total + 700)}</p>
                                          <button class="buttn buttnPagar" id="pago">Ir a pagar </button>`;
        pagar();
    }
    
}

//Funcion que crea el evento pagar
function pagar(){
    const irAPagar = document.getElementById("pago");
    irAPagar.addEventListener("click", ()=>{
    window.location.href = "./html/pago.html"
    })
}

/* ============================================== DOM  ======================================= */

/*=== Mostrar productos en el DOM de acuerdo la categoria  ===*/
function mostrarProductosEnElDOM(baseDeDatos){

    baseDeDatos.forEach((producto) => {

            let contProdDeCategoria;
            //Llamamos al contenedor depende la categoria del producto
            if (producto.categoria === "panaderia"){
                contProdDeCategoria = document.getElementById("panaderia");

            }
            else if (producto.categoria === "pasteleria"){
                contProdDeCategoria  = document.getElementById("pasteleria");

            }
            else if (producto.categoria === "confiteria"){
                contProdDeCategoria  = document.getElementById("confiteria");

            }
            else{
                contProdDeCategoria  = document.getElementById("encargos");
            }

            //Llamamos a la funcion donde se aplica el descuento al producto
            aplicarDescuento(producto);


            //Pintamos el DOM con los productos del array productos.
            const div = renderizarDom(producto);//funcion que crea el contenedor maquetado del producto
            contProdDeCategoria.appendChild(div);// Agreamos los productos al DOM

            //Si el producto en cuestion no contiene descuento se evita que en el DOM se muestre como precio anterior "$0"
            if(producto.descuento === 0){
                const eliminarDescuentoEnDom = document.getElementById(`precioDescuento${producto.id}`);
                eliminarDescuentoEnDom.innerHTML=`<p id=precioDescuento${producto.id}>$${producto.precio}<span></span></p>`
            }

            /*=== Evento para agregar productos al carrito ===*/

            const btn = document.getElementById(`btn${producto.id}`);
            btn.addEventListener("click", () => agregarACarrito(producto.id));
            

    } )
}

function renderizarDom(producto){
    const div = document.createElement("div");
    div.className = "products__category__product genericProduct"
    div.innerHTML = ` <img src="${producto.url}" alt="">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <p id=precioDescuento${producto.id}>$${producto.precio}<span> $${producto.descuento}</span></p>
                        <p class="cantDisponible">Disponibles: ${producto.stock} </p>
                        <button class="buttn" id="btn${producto.id}"> Agregar al Carrito</button>
                    </div>`;

    renderizarDomDestacados(producto);
    return div;
}

/* === Funcion encargada de renderizar en el DOM los productos destacados === */
function renderizarDomDestacados(producto){
    //Solamente trabaja con los productos que tienen un descuento aplicado
    if (producto.descuento != 0){
        const contFeatured = document.getElementById("featuredDom");
        const div = document.createElement("div");
        div.className = "featured__product";
        div.innerHTML= ` <img src="${producto.url}" alt="">
                        <div>
                            <h3>${producto.nombre}</h3>
                            <p>$${producto.precio}<span> $${producto.descuento}</span></p>
                            <button class="buttn buttn--modified" id="destacados${producto.id}"> Agregar al Carrito</button>
                        </div>`;
        contFeatured.appendChild(div);

    //Evento para agregar al carrito los destacados
    const btnAgregarProductoDestacado = document.getElementById(`destacados${producto.id}`)
    btnAgregarProductoDestacado.onclick = ()=>{
        agregarACarrito(producto.id);
    }
    }
    
}

/* ==== Funcion que aplica descuento segun la propiedad "descuento" === */
function aplicarDescuento(objeto){
    descuento = objeto.descuento;
    if (objeto.descuento != 0){
        objeto.descuento = objeto.precio;
        objeto.precio *= (100 - descuento)/100;
    }
}

/* =================================================  ALGORITMO PRINCIPAL =============================================== */

let productos;

fetch("./json/productos.json")
    .then(response => response.json())
    .then(data =>{
        productos = data;
        mostrarProductosEnElDOM(productos);
    })


/*  Carrito en el localstorage*/ 
// carrito se inicia con "let" debido a que se debe reasignar el carrito guardado en localstorage
//se utiliza el operado "or" para que en caso de que la key "carrito" en el localstorage no exista se inicie como carrito = [] 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Debido a que se consulta el localstorage, se muestra renderiza el carrito sin importar el estado.
mostrarCarritoCompleto(carrito);

/* === Evento para abrir Carrito === */

const contCarritoBoton = document.getElementById("openCart");
contCarritoBoton.onclick = () =>{   
const  contCarrito = document.getElementById("carritoID");
contCarrito.classList.toggle("carrito--mover");
}


/* ====== Para activar el modo NOCHE O LIGHT  ===== */

//Traemos el contenedor que contiene el boton para cabiar de modo
const modeGUI = document.querySelector(".modeGUI img");

modeGUI.onclick = ()=>{
    const modeAct = modeGUI.getAttribute("src") //Conseguimos el valor del atributo "src" para saber que imagen está aplicada
    //Esto es con el fin de evitar que apareciera el sol con el modo oscuro al recargar la pagina o viceversa 
    if (modeAct == "./img/icon/luna.png"){ 
        //Si está la luna cambia a sol cambiando los atributos del elemento HTML
        modeGUI.setAttribute("src", "./img/icon/dom.png");
        document.body.classList.remove("dark");//removemos la clase que transforma a modo oscuro
        localStorage.setItem("modo", "light");//guardamos en localstorage el modo elegido
    }
    else{
        modeGUI.setAttribute("src", "./img/icon/luna.png");
        document.body.classList.add("dark");
        localStorage.setItem("modo", "dark");
    }
    
}

const modo = localStorage.getItem("modo"); //Conseguimos el modo guardado en localstorage
if (modo === "dark"){
    //Si el modo oscuro estaba activado en la sesion anterior. Modificamos el atributo "src" y agregamos la clase que modifica a oscuro los colores
    modeGUI.setAttribute("src", "./img/icon/luna.png");
    document.body.classList.add("dark");
}
else{
    document.body.classList.remove("dark");
}

/* ============================================================== */


