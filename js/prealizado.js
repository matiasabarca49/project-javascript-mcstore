//Obtenemos el usuario actual
const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));

//Sacamos el total de la compra. El objeto usuario tiene un atributo que guarda el carrito completo
let totalCompra = usuarioActual.ultimoCarrito.reduce( (acumulador, producto ) => (producto.precio * producto.cantidad) + acumulador,0);

//Si no se superan los $3000 se suma el envio 
if (totalCompra < 3000){
    totalCompra += 700;
}

//Se genera el maquetado con la informacion de la compra
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