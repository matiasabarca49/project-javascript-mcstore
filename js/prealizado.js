
const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
console.log(usuarioActual.ultimoCarrito);

let totalCompra = usuarioActual.ultimoCarrito.reduce( (acumulador, producto ) => (producto.precio * producto.cantidad) + acumulador,0);

if (totalCompra < 3000){
    totalCompra += 700;
}


const contendedor = document.getElementById("graciasPorComprar");
contendedor.innerHTML= `<div class="separator separator--widthCien">
                            <div class="separator__line"></div>
                        </div>
                        <div>
                            <h1>Gracias por comprar en <span class="header__logo"> MCKing </span> ${usuarioActual.nombre} ${usuarioActual.apellido}</  h1>
                            <h2>Pagaste $${ totalCompra}</h2>
                        </div>
                        <div class="separator separator--widthCien">
                            <div class="separator__line"></div>
                        </div>
                        <p>Vuelve prontro!!!!!</p>`;

const contendedorEnvio = document.getElementById("envio");
contendedorEnvio.innerText= `En minutos estamos con vos en ${usuarioActual.direccion}`