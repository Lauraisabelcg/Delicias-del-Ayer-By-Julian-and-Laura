# 🍰 Delicias del Ayer

Bienvenido al repositorio de **Delicias del Ayer**, una aplicación web modular diseñada para una repostería tradicional con un toque de innovación sofisticada. Este proyecto fue desarrollado utilizando tecnologías web estándar para garantizar un rendimiento óptimo y una experiencia de usuario fluida, sirviendo como un excelente ejemplo de integración de bases de datos ligeras e interfaces dinámicas.

## 🚀 Características Principales

* **Catálogo Dinámico de Productos:** Los productos se cargan dinámicamente utilizando un documento de **Google Sheets** como base de datos en formato JSON, lo que facilita la actualización del inventario en tiempo real sin modificar el código.
* **Sistema de Filtros Inteligente:** Los clientes pueden explorar el menú filtrando por categoría (Fríos/Calientes), nivel de dulzor y tipo de postre (Todas, Tortas, Flan, Postres).
* **Estado de Apertura en Tiempo Real:** La barra de navegación y el footer muestran dinámicamente si el punto físico de la tienda está "Abierto" o "Cerrado" dependiendo de la hora local del usuario.
* **Sistema de Reseñas Persistente:** Cada producto cuenta con una página de detalles donde los usuarios pueden dejar valoraciones (1 a 5 estrellas) y comentarios detallados. Esta información se almacena localmente usando `localStorage`, simulando persistencia de datos y cargando los comentarios instantáneamente.
* **Carrusel Automático:** Un visor de productos en la sección "Sobre Nosotros" que se desplaza automáticamente para atraer la atención hacia "Nuestros Clásicos".
* **Diseño 100% Responsivo:** Interfaz adaptable a múltiples resoluciones (Móvil, Tablet, Desktop) garantizando la accesibilidad.
* **Integración con WhatsApp e Instagram:** Botones de "Llamados a la Acción" (Call To Action) que redirigen a los usuarios directamente para concretar compras o visitar las redes sociales.

## 📸 Capturas de Pantalla

A continuación se muestra la interfaz principal del proyecto:

### 1. Página de Inicio y Filtros
![Inicio](InicioDelicias.jpg)

### 2. Detalles del Producto y Sistema de Reseñas
![Producto Específico](Producto especifico.jpg)

### 3. Sobre Nosotros y Carrusel Automático
![Sobre Nosotros](SobreDelicias.jpg)

## 🛠️ Tecnologías y Estructura de Archivos

El proyecto sigue una arquitectura modular en el Front-end:

* **HTML5**
* **CSS3 Vanilla** (`style.css` global)
* **JavaScript ES6+** Vanilla

**Estructura:**
- `index.html`: Página principal con el listado de productos y los filtros.
- `sobreNosotros.html`: Historia de la empresa, ubicación y el carrusel de productos.
- `productos.html`: Vista detallada de un producto específico, junto con el formulario de reseñas y su respectivo historial (cargado vía `localStorage`).
- `style.css`: Hoja de estilos compartida.
- `app.js`: Lógica principal para la navegación, control de horario, filtros y funcionalidades globales.
- `productos.js`: Lógica encargada de consumir el API de Google Sheets para generar las tarjetas de productos dinámicamente y el manejo del carrusel.

## 📝 Prompt Utilizado (Generación Asistida por IA)

Este proyecto fue estructurado e inicializado con la asistencia de Inteligencia Artificial utilizando el siguiente prompt principal, el cual define los requerimientos funcionales, de diseño y arquitectura de datos:

> **Prompt Inicial:**
> Deseo una aplicación para una empresa llamada: "Delicias del Ayer", soy programadora de software en formación, necesito que me brindes el codigo en lenguaje de programacion java script vainilla para llevar a cabo este proyecto. Primero, el inicio de la pagina debe verse como esta en la imagen y tener en cuenta todo lo que he agregado, para darle funcionalidad, usaras javascript, en la parte de abajo despues del slogann debemos poder filtrar los alimentos, tanto por una division a la cual llamaremos categoria de productos: frios o calientes (dando click la persona podra filtrar el tipo de producto que desea), al igual que el nivel de dulzor que se podra seleccionar a traves de un tipo select, hay una subcategoria en esa misma seccion que trata de el tipo de postre, con un select vamos a desplegar las siguientes opciones: todos los productos,tortas, flan y postres Segun la categoria se muestra algo que vaya a acorde a lo que el cliente selecciono.
>
> Segundo: la barra de navegacion debe tener: horario de la empresa e informar segun el tiempo real si esta abierto o cerrado el punto fisico. Los apartados que tendremos en este nav serán: un inicio, un apartado de sobre nosotros, el cual debera estar presente en toda la pagina y a un lado, el horario que se maneja en la empresa y si esta abierto o cerrado (según la hora actual del dispositivo cambia dinamicamente)
> 
> Tercero: Apartado visual para los productos: debe contener Imagen, nombre del producto y breve descripcion que enaltezca su sabor caracteristico. Tambien se debe de especificar nivel de sabor de recomendado, y si a ese producto se le puede modificar el nivel de azucar o no.
> Cuarto: en la parte de quienes somos debe de contener, el slogan, la historia de la empresa,la ubicacion de la empresa: Una ubicacion intentada en una zona de Bucaramanga y que busca brindar esta, tambien un carrusel abajo con los productos que se venden para que las personas se antojen, si le doy click a alguna foto del carrusel me redirige a donde muestro los productos que se han realizado antes , luego un apartado donde tendremos los logotipos de instagram y whatsapp para que las personas al darle click sean redirigidos a el instagram de la empresa o a el whatsapp de la empresa.
> Cosas a tener en cuenta, cuando una persona da click en un producto en especifico redirigiremos a una pagina donde se detalla mas el producto en particular que la persona seleccionó, Alli nuevamente, tendremos foto, nombre de producto, descripcion, un boton que refirige a whatsapp ese boton tiene un texto llamativo que incite a la persona a darle click para comprar y por ultimo ahi abajo despues del producto y su descripcion habran reseñas, se pueden ver las reseñas o se puede agregar una reseña, al agregar una reseña se verifica si la persona ha comprado, si ha comprado le permitimos reseñar, se califican los siguientes aspectos : que tanto te gustó el producto (calificable del 1 al 5), el sabor te transporto a algun lugar? en el placeholder poner Nos encanta saber si nuestros sabores te transportaron a algún momento especial, Qué fue lo que más te gustó (Puedes elegir varias)
> [ ] El sabor tradicional
> [ ] La textura (artesanal/casera)
> [ ] La calidad de los ingredientes
> [ ] La presentación/empaque 
> dejar una casilla para que quien quiera escribir un mensaje adicional pueda hacerlo.
> Se le ha de preguntar al usuario su nombre y  el nombre de su reseña va a ser segun el nombre del producto en donde abrio el formulario debe tener localstorage para persistencia de datos (me gustaria que el formulario este al lado derecho, y las reseñas al lado izquierdo, dentro de un div donde si hay muchas reseñas, si no estoy mal z-index, lo que quiero es precisamente que si hay muchos comentarios, no se expanda la pagina o se desborde el contenedor).
>
> el footer: debe contener copyrigth, debe tener el horario que la empresa maneja en su punto fisico, la direccion del punto fisico, nuevamente los botones que redirigen a el instagram y whatsapp de la pagina y nombre de la pagina.
> la colorimetria de este diseño debe ser : :root {
>   --color-fondo: #FDFBF7; /* Un crema muy suave, cero blanco puro */
>   --color-primario: #D48C5B; /* Naranja terracota/canela */
>   --color-secundario: #E8D5C4; /* Beige avena para secciones secundarias */
>   --color-texto: #4A3C31; /* Marrón chocolate oscuro en lugar de negro */
>   --color-acento: #8B4513; /* Marrón caramelo para botones o llamadas a la acción */ } y los colores de otras cosas no especificadas aqui deben ir de acorde con esta paleta de colores.
>
> debe ser responsive.
> dentro del inicio aparecen las reseñas que ya se han hecho, el formulario para reseñas unicamente en el apartado de cada producto.
> el diseño de la pagina debe ir acorde a la marca, tradicional pero a la vez con un toque de innovación sofisticada.
>
> te envio imagenes de como me gustaria que se vea la pagina. Esta para celular pero debe ser para computador, debe tener su resposives con el @media.
>
> vamos a ir por modulos, el codigo debe ser modular. Los archivos html que tendremos serán : index.html donde estara el inicio y todo lo que compenda esta parte del inicio. sobreNosotros.html que tendra lo del sobre nosotros. y Productos.html donde tendremos los productos.
> css será uno solo y se llamara style.css, y para los archivos javascript vanilla vamos a tener app.js para el inicio, el sobre nosotros y productos.js que sera el encargado de crear la coneccion con el google sheets para generar las tarjetas de los productos (simulando una base de datos), en enlace es el siguiente: https://docs.google.com/spreadsheets/d/1wc7_tf1gOcJ_m_Xb3nuMi_ZFTl6f6Ie-uEvzdmH2sQ8/gviz/tq?tqx=out.json&gid=0
> ahí se agregará lo del google sheets para los productos que habrán se agregaran a traves del formulario que tendremos, en el javascript en este aspecto tambien debeo de tener cartas para que cuando alguien agregue su reseña a traves de la web la pueda visualizar a los 2 segundos de darle enviar reseña. Y por favor al final del productos.js dejame un comentario, diciendome las instrucciones que debo seguir para llenar el google sheets asi podre podre poner la url de la imagen del producto, el nombre y la descripcion en las casillas correspondientes, tambien indicamente como hago para guardar esos productos en su categoria en especifico (torta, flan, postre) al igual que su nivel de dulzor 

**Instrucciones adicionales proporcionadas posteriormente:**
* Se migró el almacenamiento de los comentarios y reseñas exclusivamente a `localStorage` (evitando guardarlos en Google Sheets). Google Sheets quedó reservado únicamente como base de datos de lectura para renderizar los productos.
* Se implementó un carrusel de imágenes automatizado (sin necesidad de desplazamiento manual por parte del usuario) en la sección "Sobre Nosotros".