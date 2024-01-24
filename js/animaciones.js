let pictures;

const obtenerImagines = async () =>{

    const respuesta = await
    fetch("./json/promociones.json")
    const datos =  await respuesta.json()
    pictures = datos;
    let i = 1

    setInterval(()=>{
        
        const img1 = document.getElementById("IMG1")
        const img2 = document.getElementById("IMG2");

        img2.src = pictures[i];
        img2.classList.add("active");
        
        i++;

        setTimeout(()=>{
            img1.src = img2.src
            img2.classList.remove("active")
            img2.classList.add("salida");
            img1.src = pictures[i];
            i++;
            if (i >= pictures.length){
                i = 0
            }
        },5000)
        
        setTimeout(()=>{
            img2.classList.remove("salida")
        },7000)
        
        if (i >= pictures.length){
            i = 0
        }

    },10000)
    
    
}

/* === Obteniendo los productos destacados=== */
obtenerImagines();

const destacados = []

const swiper = new Swiper(".featured", {
    spaceBetween: 15,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    autoplay: {
         delay: 3000,
       },
    breakpoints: {
    // when window width is >= 320px
    320: {
        slidesPerView: 1,
    },
    567: {
        slidesPerView: 2,
    },
    762: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 4,
    },
    1200: {
        slidesPerView: 5,
    },
    1920: {
        slidesPerView: 5,
    }
    
    }
    });


    // function agregarPromocion(srcImg){
    //     const promocion = document.createElement("div");
    //     promocion.className= "mostrarPromo"
    //     promocion.innerHTML= `<img src="${srcImg}">`
    //     document.body.appendChild(promocion);
    // }
    let contador = 0
    window.addEventListener("scroll", ()=>{
        let scroll = document.documentElement.scrollTop;
        if ((scroll >= 1000 && scroll <= 1500) && contador === 0){
            contador = 1;
            document.body.classList.add("stopScroll")
            const promo = document.getElementById("mostrarPromoID")
            promo.classList.add("mostrarPromo--active");
            promo.addEventListener("click", ()=>{
                promo.classList.remove("mostrarPromo--active");
                document.body.classList.remove("stopScroll")

            })
       }
    });

    