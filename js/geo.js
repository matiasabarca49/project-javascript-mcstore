function exito(pos){
    console.log(pos)
    const coords = pos.coords;
    // let map = L.map('map').setView([51.505, -0.09], 13);
    let map = L.map('map').setView([coords.latitude, coords.longitude], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

const options = {
    enableHighAccuracy: false,
    timeout: 60000,
    maximumAge: 0
};

function error(){
    console.log("Se produjo un error || No aceptaron los permisos")
}

const geo = navigator.geolocation;
geo.getCurrentPosition(exito, error, options)



