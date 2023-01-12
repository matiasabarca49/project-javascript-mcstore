
const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));

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
                        <p>¡Te esperamos pronto!</p>`;

const contendedorEnvio = document.getElementById("envio");
contendedorEnvio.innerHTML= `<h4> En minutos estamos en...... ${usuarioActual.direccion}</h4>
                            <img src="../img/icon/enviado.png">`