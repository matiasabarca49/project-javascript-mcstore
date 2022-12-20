class Producto{
    constructor(categoria,nombre,precio,descuento,url){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.descuento = descuento
        this.url = url;
    }
}

function aplicarDescuento(objeto){
    precio = objeto.precio
    if (objeto.descuento != 0){
        objeto.descuento = precio * (100 - objeto.descuento)/100
    }
}

function agregarACarrito(nombreProducto){
    const prodEncontrado = productos.find((producto) => producto.nombre === nombreProducto);
    console.log(prodEncontrado);
    carrito.push(prodEncontrado);
    const cantProdEnCarrito = document.getElementById("cantProdEnCarrito");
    cantProdEnCarrito.innerText = carrito.length;

    const contenedorCarrito = document.getElementById("carritoProductoID");
    const div = document.createElement("div")
    div.innerHTML= `<h4>${prodEncontrado.nombre}</h4>
                    <p>$${prodEncontrado.precio} <span>x1</span></p>`
    contenedorCarrito.appendChild(div);
    console.log(carrito)
    sumaCarrito();
}

/* === Costo total del carrito === */

function sumaCarrito(){
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio ,0);
    console.log("total: " + total)
    const totalProd = document.getElementById("totalCompra");
    totalProd.innerText = "Total: "+ total;
}


function renderizarDom(producto){
    const div = document.createElement("div");
    div.className = "products__category__product genericProduct"
    if (producto.descuento !== 0){
        div.innerHTML = ` <img src="${producto.url}" alt="">
                      <div>
                            <h3>${producto.nombre}</h3>
                            <p>$${producto.descuento}<span> $${producto.precio}</span></p>
                            <button class="buttn" id="btn${producto.nombre}"> Agregar al Carrito</button>
                      </div>`;
    }
    else{
        div.innerHTML = ` <img src="${producto.url}" alt="">
                      <div>
                            <h3>${producto.nombre}</h3>
                            <p>$${producto.precio}<span> </span></p>
                            <button class="buttn" id="btn${producto.nombre}"> Agregar al Carrito</button>
                      </div>`;
    }

    // renderizarDomDestacados(producto);
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
                            <p>$${producto.descuento}<span> $${producto.precio}</span></p>
                            <button class="buttn buttn--modified" id="btn${producto.nombre}"> Agregar al Carrito</button>
                        </div>`;
        contFeatured.appendChild(div);

    }
    
}

/* ======  ALGORITMO PRINCIPAL ===== */



const frances = new Producto("panaderia", "Frances/ud", 80, 10 ,"./img/productos/pfrances.jpg");
const baguette = new Producto("panaderia", "Baguette/ud", 110, 5, "./img/productos/baguette.jpg");
const integral = new Producto("panaderia", "Integral/ud", 490, 0, "./img/productos/pintegral.jpg");
const torChocolate = new Producto("pasteleria", "Torta chocolate", 3500, 0, "./img/productos/torChocolate.jpg");
const torDurazno = new Producto("pasteleria", "Torta Durazno ", 2800, 50,"./img/productos/torDurazno.jpg");
const torLemon = new Producto("pasteleria", "Torta Vainilla", 2300, 0,"./img/productos/torVainilla.jpg");
const caramelos = new Producto("confiteria", "Caramelos/ud", 50, 0,"./img/productos/candies.jpg");
const chocolates = new Producto("confiteria", "Moffins/ud", 150, 0,"./img/productos/muffins.jpg");
const pernil = new Producto("encargos", "Fiambres", 12000, 5,"./img/productos/fiambres.jpg");
const parrilla = new Producto("encargos", "Parrilla", 18000, 25,"./img/productos/parrilla.jpg");

const productos = [frances,baguette,integral, torChocolate, torDurazno, torLemon, caramelos, chocolates, pernil, parrilla];

const carrito = [];


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


    aplicarDescuento(producto);

    div = renderizarDom(producto);
    
    contProdDeCategoria.appendChild(div);

/*=== Evento para agregar productos al carrito ===*/

     const btn = document.getElementById(`btn${producto.nombre}`);
     btn.addEventListener("click", () => agregarACarrito(producto.nombre));
     

} )


/* === Evento para abrir Carrito === */

const contCarritoBoton = document.getElementById("openCart");
contCarritoBoton.onclick = () =>{
    console.log("Hiciste clic en carrito")
    const  contCarrito = document.getElementById("carritoID");
    contCarrito.classList.toggle("carrito--mover")
}


/* ====== Para activar el modo NOCHE O LIGHT  ===== */


const modeGUI = document.querySelector(".modeGUI img");

modeGUI.onclick = ()=>{
    const modeAct = modeGUI.getAttribute("src")
    if (modeAct == "./img/icon/luna.png"){
        modeGUI.setAttribute("src", "./img/icon/dom.png");
        document.body.classList.remove("dark")
        localStorage.setItem("modo", "light");
    }
    else{
        modeGUI.setAttribute("src", "./img/icon/luna.png");
        document.body.classList.add("dark")
        localStorage.setItem("modo", "dark");
    }
    
}

const modo = localStorage.getItem("modo");
if (modo === "dark"){
    modeGUI.setAttribute("src", "./img/icon/luna.png");
    document.body.classList.add("dark")
}
else{
    document.body.classList.remove("dark")
}

/* ============================================================== */


