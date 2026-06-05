// productos.js - Conexión con Google Sheets y LocalStorage

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1wc7_tf1gOcJ_m_Xb3nuMi_ZFTl6f6Ie-uEvzdmH2sQ8/gviz/tq?tqx=out.json&gid=0';

let productosGlobales = [];
let eventosFiltrosConfigurados = false; 

// 1. OBTENER DATOS DE GOOGLE SHEETS
async function cargarProductos() {
    try {
        const respuesta = await fetch(SHEET_URL);
        const texto = await respuesta.text();
        
        const jsonString = texto.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);
        
        let filas = data.table.rows;
        
        if (filas.length > 0 && filas[0].c[0] && filas[0].c[0].v === 'ID') {
            filas = filas.slice(1); 
        }
        
        productosGlobales = filas.filter(row => row.c[0] != null).map(row => {
            return {
                id: row.c[0] ? row.c[0].v : '',
                nombre: row.c[1] ? row.c[1].v : '',
                descripcion: row.c[2] ? row.c[2].v : '',
                categoria: row.c[3] ? row.c[3].v : '', 
                tipo: row.c[4] ? row.c[4].v : '', 
                dulzor: row.c[5] ? row.c[5].v : '', 
                sabor_recomendado: row.c[6] ? row.c[6].v : '',
                modificable: row.c[7] ? row.c[7].v : '', 
                imagen: row.c[8] ? row.c[8].v : 'https://via.placeholder.com/300'
            };
        });

        // AQUÍ ES DONDE DEBÍA IR LA LÓGICA DE DETECCIÓN DE PÁGINA
        if (document.getElementById('contenedor-productos')) {
            aplicarFiltrosActuales(); 
            if(!eventosFiltrosConfigurados) {
                configurarFiltros();
                eventosFiltrosConfigurados = true;
            }
        } else if (document.getElementById('detalle-producto-info')) {
            renderizarDetalleProducto();
            cargarResenasLocalStorage();
        } else if (document.getElementById('carrusel-sobre-nosotros')) {
            // Ahora sí, cuando los datos llegan, dibuja el carrusel
            renderizarCarrusel();
        }

    } catch (error) {
        console.error("Error cargando productos de Sheets:", error);
    }
}

// 2. RENDERIZAR EN INDEX.HTML
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';

    productos.forEach(prod => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        tarjeta.onclick = () => window.location.href = `Productos.html?id=${prod.id}`;
        
        tarjeta.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3 style="margin: 10px 0;">${prod.nombre}</h3>
            <p style="font-size: 0.9rem; margin-bottom: 10px;">${prod.descripcion.substring(0, 60)}...</p>
            <p><strong>Nivel Sabor:</strong> ${prod.sabor_recomendado}</p>
            <p class="nivel-azucar">Azúcar Modificable: ${prod.modificable}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function aplicarFiltrosActuales() {
    const selectCat = document.getElementById('filtro-categoria');
    const selectDulz = document.getElementById('filtro-dulzor');
    const selectTipo = document.getElementById('filtro-tipo');

    // Si no estamos en la página de productos (index), no hacemos nada
    if (!selectCat) {
        renderizarProductos(productosGlobales);
        return;
    }

    const cat = selectCat.value;
    const dulz = selectDulz.value;
    const tipo = selectTipo.value;

    const filtrados = productosGlobales.filter(p => {
        // Limpiamos y estandarizamos los datos que vienen del Sheet
        const catProducto = String(p.categoria).trim().toLowerCase();
        const dulzProducto = String(p.dulzor).trim().toLowerCase();
        const tipoProducto = String(p.tipo).trim().toLowerCase();

        // Comparamos validando si es 'Todos' o si coincide con la opción limpia
        const pasaCat = cat === 'Todos' || catProducto === cat.trim().toLowerCase();
        const pasaDulz = dulz === 'Todos' || dulzProducto === dulz.trim().toLowerCase();
        const pasaTipo = tipo === 'Todos' || tipoProducto === tipo.trim().toLowerCase();
        
        return pasaCat && pasaDulz && pasaTipo;
    });

    renderizarProductos(filtrados);
}

function configurarFiltros() {
    const btnFiltrar = document.getElementById('btn-filtrar');
    if(!btnFiltrar) return;

    btnFiltrar.addEventListener('click', () => {
        aplicarFiltrosActuales();
    });
}

// 3. RENDERIZAR EN PRODUCTOS.HTML (Detalle)
function renderizarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const idProd = params.get('id');
    const producto = productosGlobales.find(p => p.id == idProd);

    if(!producto) {
        document.getElementById('detalle-producto-info').innerHTML = "<h2>Producto no encontrado o cargando...</h2>";
        return;
    }

    window.productoActualNombre = producto.nombre; 

    const urlWsp = `https://wa.me/573000000000?text=Hola, quiero pedir la deliciosa ${producto.nombre}`;

    document.getElementById('detalle-producto-info').innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 400px; border-radius: 10px; margin-bottom: 1rem;">
        <h1 style="color: var(--color-acento);">${producto.nombre}</h1>
        <p style="margin: 1rem auto; max-width: 600px; font-size: 1.1rem;">${producto.descripcion}</p>
        <p><strong>Sabor Recomendado:</strong> ${producto.sabor_recomendado}</p>
        <p class="nivel-azucar" style="margin-bottom: 2rem;">¿Se puede modificar el azúcar?: ${producto.modificable}</p>
        
        <a href="${urlWsp}" target="_blank" class="btn-wsp">¡Antójate! Cómpralo por WhatsApp ➔</a>
    `;
}

// 4. RENDERIZAR CARRUSEL EN SOBRE NOSOTROS
let intervaloCarrusel; // Variable para controlar el movimiento y evitar que se multiplique

// 4. RENDERIZAR CARRUSEL EN SOBRE NOSOTROS
function renderizarCarrusel() {
    const contenedorCarrusel = document.getElementById('carrusel-sobre-nosotros');
    if (!contenedorCarrusel) return;

    contenedorCarrusel.innerHTML = ''; 

    productosGlobales.forEach(prod => {
        const enlace = document.createElement('a');
        enlace.href = `Productos.html?id=${prod.id}`; 
        
        enlace.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" 
                 style="border-radius: 10px; width: 150px; height: 150px; object-fit: cover; flex-shrink: 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        `;
        
        contenedorCarrusel.appendChild(enlace);
    });

    // --- LÓGICA DE DESPLAZAMIENTO AUTOMÁTICO ---
    
    // Ocultamos visualmente la barra de desplazamiento para un look más profesional
    contenedorCarrusel.style.scrollbarWidth = 'none'; // Para Firefox
    contenedorCarrusel.style.msOverflowStyle = 'none'; // Para Edge
    // Nota: Para Chrome/Safari idealmente se oculta en tu style.css con:
    // #carrusel-sobre-nosotros::-webkit-scrollbar { display: none; }

    // Limpiamos el "motor" anterior por si los datos se recargan (ej. la actualización cada minuto)
    if (intervaloCarrusel) {
        clearInterval(intervaloCarrusel);
    }
    
    // Creamos el movimiento automático
    intervaloCarrusel = setInterval(() => {
        // Mueve el carrusel 1 pixel hacia la derecha
        contenedorCarrusel.scrollLeft += 1;
        
        // Detecta si llegó al final del recorrido
        // (scrollLeft + el ancho visible) >= el ancho total del contenido
        if (contenedorCarrusel.scrollLeft + contenedorCarrusel.clientWidth >= contenedorCarrusel.scrollWidth - 1) {
            // Vuelve al inicio instantáneamente
            contenedorCarrusel.scrollLeft = 0;
        }
    }, 20); // Velocidad: 20 milisegundos. (Si quieres que vaya más lento, sube este número a 30 o 40)
}

// 5. LÓGICA DE RESEÑAS CON LOCALSTORAGE
const formResena = document.getElementById('form-resena');

if(formResena) {
    formResena.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre-cliente').value;
        const calificacion = document.getElementById('calificacion').value;
        const mensajeViaje = document.getElementById('mensaje-viaje').value;
        
        const gustosCbx = document.querySelectorAll('.gustos:checked');
        const gustos = Array.from(gustosCbx).map(cb => cb.value).join(', ');

        const nuevaResena = {
            producto: window.productoActualNombre,
            nombre,
            calificacion,
            gustos,
            mensajeViaje,
            fecha: new Date().toLocaleDateString()
        };

        let resenasGuardadas = JSON.parse(localStorage.getItem('resenas_delicias')) || [];
        resenasGuardadas.push(nuevaResena);
        localStorage.setItem('resenas_delicias', JSON.stringify(resenasGuardadas));

        const msjExito = document.getElementById('mensaje-exito');
        msjExito.style.display = 'block';
        
        setTimeout(() => {
            msjExito.style.display = 'none';
            formResena.reset();
            cargarResenasLocalStorage(); 
        }, 2000);
    });
}

function cargarResenasLocalStorage() {
    const contenedor = document.getElementById('contenedor-resenas-producto');
    if(!contenedor) return;

    let resenasGuardadas = JSON.parse(localStorage.getItem('resenas_delicias')) || [];
    const resenasProducto = resenasGuardadas.filter(r => r.producto === window.productoActualNombre);

    if(resenasProducto.length === 0) {
        contenedor.innerHTML = "<p>Sé el primero en dejar una reseña.</p>";
        return;
    }

    contenedor.innerHTML = '';
    resenasProducto.reverse().forEach(resena => {
        let estrellas = '★'.repeat(resena.calificacion) + '☆'.repeat(5 - resena.calificacion);
        
        contenedor.innerHTML += `
            <div style="background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 5px; border-left: 4px solid var(--color-primario);">
                <p style="color: var(--color-acento);"><strong>${resena.nombre}</strong> <span style="color:#FFD700;">${estrellas}</span></p>
                ${resena.mensajeViaje ? `<p style="font-style: italic; font-size: 0.9rem;">"${resena.mensajeViaje}"</p>` : ''}
                ${resena.gustos ? `<p style="font-size: 0.8rem; margin-top: 5px;"><strong>Destaca:</strong> ${resena.gustos}</p>` : ''}
            </div>
        `;
    });
}
// 6. RENDERIZAR RESEÑAS EN EL INICIO (INDEX.HTML)
function cargarResenasGlobales() {
    const contenedor = document.getElementById('contenedor-resenas-globales');
    if (!contenedor) return;

    // Obtenemos las reseñas almacenadas
    let resenasGuardadas = JSON.parse(localStorage.getItem('resenas_delicias')) || [];

    if (resenasGuardadas.length === 0) {
        contenedor.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>Aún no hay reseñas. ¡Sé el primero en probar nuestras delicias!</p>";
        return;
    }

    contenedor.innerHTML = '';
    
    // Invertimos el arreglo para mostrar las más recientes primero
    resenasGuardadas.reverse().forEach(resena => {
        let estrellas = '★'.repeat(resena.calificacion) + '☆'.repeat(5 - resena.calificacion);
        
        // Usamos la clase 'tarjeta-producto' para mantener la coherencia de tu diseño
        contenedor.innerHTML += `
            <div class="tarjeta-producto" style="padding: 1.5rem; text-align: left; cursor: default;" onclick="event.stopPropagation();">
                <p style="color: var(--color-primario); font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">${resena.producto}</p>
                <p><strong>${resena.nombre}</strong> <span style="color:#FFD700; font-size: 1.2rem;">${estrellas}</span></p>
                ${resena.mensajeViaje ? `<p style="font-style: italic; font-size: 0.95rem; margin-top: 10px; color: #555;">"${resena.mensajeViaje}"</p>` : ''}
                ${resena.gustos ? `<p style="font-size: 0.85rem; margin-top: 10px;"><strong>Destaca:</strong> ${resena.gustos}</p>` : ''}
            </div>
        `;
    });
}
// Iniciar y programar la actualización automática cada minuto (60000 ms)
// Iniciar y programar la actualización automática cada minuto (60000 ms)
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarResenasGlobales(); // <-- Añadimos esta línea
    setInterval(cargarProductos, 60000); 
});