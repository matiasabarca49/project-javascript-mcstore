class Producto{
    constructor(id,categoria,nombre,precio,stock,descuento,url){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
        this.stock = stock;
        this.descuento = descuento
        this.url = url;
    }
}

function aplicarDescuento(objeto){
    descuento = objeto.descuento
    if (objeto.descuento != 0){
        objeto.descuento = objeto.precio;
        objeto.precio *= (100 - descuento)/100
    }
}


function agregarACarrito(idProducto){
    //Verificamos si el producto ya se encuentra en el carrito
    const prodEncontradoEnCarrito = carrito.find((producto) => producto.id === idProducto);
    // Si el condicional se cumple, aumentamos el atributo cantidad del producto.
    
    if (prodEncontradoEnCarrito && prodEncontradoEnCarrito.cantidad < prodEncontradoEnCarrito.stock){
        prodEncontradoEnCarrito.cantidad++;
        const actualizarCantidad = document.getElementById(`cant${prodEncontradoEnCarrito.id}`);
        //Actualizamos el apartado cantidad en el DOM reescribiendo el contenido del elemento "span"
        actualizarCantidad.innerHTML=`x ${prodEncontradoEnCarrito.cantidad}`;
    }
    else if(prodEncontradoEnCarrito  == undefined){
        //Si no se cumple el condicional, se busca en la base de datos y se agrega al carrito
        const prodEncontradoEnBaseDatos = productos.find((producto) => producto.id === idProducto);
        carrito.push(prodEncontradoEnBaseDatos);
        //Pinta el DOM con el producto elegido
        mostrarProducto(prodEncontradoEnBaseDatos);
         
    }
    else{
        alert("No hay mas productos disponibles")
    }
    

    /*= Modificar el DOM agregando la cantidad de productos en el boton carrito 
    simplemente varificando la cantidad de objeto en el array carrito =*/ 
    productosEnElCarrito();


    // Calcular la suma total del carrito
    sumaCarrito();
}

function productosEnElCarrito(){
    const cantProdEnCarrito = document.getElementById("cantProdEnCarrito");
    cantProdEnCarrito.innerText = carrito.length;
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON)
}


// Funcion para maquetar los producto en DOM en seccion carrito
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


/* === Eliminar producto del carrito del DOM Y Array === */
function eliminarProducto(objetoID){
    const productoEncontradoCarrito = carrito.find((producto) => producto.id === objetoID)
    const indice = carrito.indexOf(productoEncontradoCarrito);
    productoEncontradoCarrito.cantidad= 1;
    carrito.splice(indice,1);
    const contedorProductosCarrito = document.getElementById("carritoProductoID");
    contedorProductosCarrito.innerHTML= ""
    productosEnElCarrito();
    mostrarCarritoCompleto(carrito);
    sumaCarrito();

}

/* === Incrementar producto en carrito === */
function incrementarProducto(objetoID){
    const cantidadActual = document.getElementById(`cant${objetoID}`)
    const prodEncontradoEnCarrito = carrito.find((producto)=> producto.id === objetoID);
    if (prodEncontradoEnCarrito.cantidad < prodEncontradoEnCarrito.stock){
        prodEncontradoEnCarrito.cantidad++;
    }
    else{
        alert("No hay mas productos disponibles");
    }
    
    cantidadActual.innerText =`x ${prodEncontradoEnCarrito.cantidad}`;
    productosEnElCarrito();
    sumaCarrito();
}

/* ===Reducir productos en carrito === */
function reducirProducto(objetoID){
    const cantidadActual = document.getElementById(`cant${objetoID}`)
    const prodEncontradoEnCarrito = carrito.find((producto)=> producto.id === objetoID);
    if (prodEncontradoEnCarrito.cantidad > 1){
        prodEncontradoEnCarrito.cantidad--;
    }
    cantidadActual.innerText =`x ${prodEncontradoEnCarrito.cantidad}`;
    productosEnElCarrito();
    sumaCarrito();
}



/* === Funcion que nos permite pintar el DOM con el carrito completo. Esta funcion es utilizada al elimina un producto === */
function mostrarCarritoCompleto(carrito){
    const contedorProductosCarrito = document.getElementById("carritoProductoID");
    carrito.forEach((producto)=> {
        //Se reutiliza la funcion que pinta el DOM de a un producto.
        mostrarProducto(producto)})
    productosEnElCarrito()

}


/* === Costo total del carrito === */

function sumaCarrito(){
    const total = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad) ,0);
    const totalProd = document.getElementById("totalCompra");
    totalProd.innerText = "Total: $"+ total;
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

function renderizarDomDestacados(producto){
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

/* ======  ALGORITMO PRINCIPAL ===== */


//                          (ID, Categoria, Nombre del producto, Precio, Stock, Porcentaje de decuento, Imagen)
const frances = new Producto(1,"panaderia", "Frances/ud", 80, 15,10 ,"./img/productos/pfrances.jpg");
const baguette = new Producto(2,"panaderia", "Baguette/ud", 110, 10,5, "./img/productos/baguette.jpg");
const integral = new Producto(3,"panaderia", "Integral/ud", 490, 10,0, "./img/productos/pintegral.jpg");
const torChocolate = new Producto(4,"pasteleria", "Torta chocolate", 3500, 10,0, "./img/productos/torChocolate.jpg");
const torDurazno = new Producto(5,"pasteleria", "Torta Durazno ", 2800, 10,50,"./img/productos/torDurazno.jpg");
const torLemon = new Producto(6,"pasteleria", "Torta Vainilla", 2300, 10,0,"./img/productos/torVainilla.jpg");
const caramelos = new Producto(7,"confiteria", "Caramelos/ud", 50, 10,0,"./img/productos/candies.jpg");
const chocolates = new Producto(8,"confiteria", "Moffins/ud", 150, 10,0,"./img/productos/muffins.jpg");
const pernil = new Producto(9,"encargos", "Fiambres", 12000, 10,5,"./img/productos/fiambres.jpg");
const parrilla = new Producto(10,"encargos", "Parrilla", 18000, 10,25,"./img/productos/parrilla.jpg");

const productos = [frances,baguette,integral, torChocolate, torDurazno, torLemon, caramelos, chocolates, pernil, parrilla];

let carrito = [];


/*=== Mostrar productos en el DOM de acuerdo la categoria  ===*/

productos.forEach((producto) => {

    let contProdDeCategoria;

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
        const eliminarDescuentoEnDom = document.getElementById(`precioDescuento${producto.id}`)
        eliminarDescuentoEnDom.innerHTML=`<p id=precioDescuento${producto.id}>$${producto.precio}<span></span></p>`
    }

/*=== Evento para agregar productos al carrito ===*/

     const btn = document.getElementById(`btn${producto.id}`);
     btn.addEventListener("click", () => agregarACarrito(producto.id));
     

} )


/* === Evento para abrir Carrito === */

const contCarritoBoton = document.getElementById("openCart");
contCarritoBoton.onclick = () =>{   
const  contCarrito = document.getElementById("carritoID");
contCarrito.classList.toggle("carrito--mover")
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
        document.body.classList.remove("dark")//removemos la clase que transforma a modo oscuro
        localStorage.setItem("modo", "light");//guardamos en localstorage el modo elegido
    }
    else{
        modeGUI.setAttribute("src", "./img/icon/luna.png");
        document.body.classList.add("dark")
        localStorage.setItem("modo", "dark");
    }
    
}

const modo = localStorage.getItem("modo"); //Conseguimos el modo guardado en localstorage
if (modo === "dark"){
    //Si el modo oscuro estaba activado en la sesion anterior. Modificamos el atributo "src" y agregamos la clase que modifica a oscuro los colores
    modeGUI.setAttribute("src", "./img/icon/luna.png");
    document.body.classList.add("dark")
}
else{
    document.body.classList.remove("dark")
}

/* ============================================================== */


//Carrito en el localstorage

const carritoJSONRecuperado = localStorage.getItem("carrito");
if (carritoJSONRecuperado !== null){
    const carritoRecuperado = JSON.parse(carritoJSONRecuperado);
    carrito = carritoRecuperado;
    mostrarCarritoCompleto(carrito);
    sumaCarrito();
}


