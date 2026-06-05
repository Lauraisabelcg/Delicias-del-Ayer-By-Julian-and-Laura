// app.js - Lógica global para todas las páginas

function verificarHorario() {
    const elementoEstado = document.getElementById('estado-tienda');
    if (!elementoEstado) return;

    // Obtener hora actual en Colombia (Bucaramanga)
    const fecha = new Date();
    const opciones = { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short' };
    const formateador = new Intl.DateTimeFormat('es-CO', opciones);
    const partes = formateador.formatToParts(fecha);
    
    let hora = 0;
    let dia = '';
    
    partes.forEach(parte => {
        if(parte.type === 'hour') hora = parseInt(parte.value);
        if(parte.type === 'weekday') dia = parte.value.toLowerCase();
    });

    // Horario: Lunes a Sábado, 8am a 8pm (20:00)
    const esDiaLaboral = dia !== 'dom';
    const estaEnHorario = hora >= 8 && hora < 20;

    if (esDiaLaboral && estaEnHorario) {
        elementoEstado.textContent = 'Abierto Ahora (8am - 8pm)';
        elementoEstado.className = 'estado-tienda abierto';
    } else {
        elementoEstado.textContent = 'Cerrado (Abrimos a las 8am)';
        elementoEstado.className = 'estado-tienda cerrado';
    }
}

// Ejecutar al cargar y actualizar cada minuto
document.addEventListener('DOMContentLoaded', () => {
    verificarHorario();
    setInterval(verificarHorario, 60000);
});