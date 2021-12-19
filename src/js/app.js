let paso= 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita={
    id: '',
    nombre:'',
    fecha:'',
    hora: '',
    servicios: []
}
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});
function iniciarApp(){
    mostrarSeccion(); //mustra y oculta las secciones
    tabs(); //cambia la seccion cuando se presiona
    botonesPaginador(); //agrega o quita los botones del paginador
    paginaAnterior();
    paginaSiguiente();
    consultarAPI(); //consulta la pi en el backend de php
    idCliente();
    nombreCliente(); // añade el nombre del cliente en el objeto
    seleccionarFecha(); //añade la fecha en el objeto
    seleccionarHora(); //añade la hora en el objeto
    mostrarResumen(); //resumen de la cita
}
function mostrarSeccion(){
    // ocultar la seccion de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    // selccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');
    // quitar la clase actual del tab
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
    // resaltar el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}
function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach( boton => {
        boton.addEventListener('click', function(e){
           paso = parseInt( e.target.dataset.paso);
           mostrarSeccion();
           botonesPaginador();
        });
    })
}
function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if(paso ===1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso ===3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen(); 
        }else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
}
function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
        mostrarSeccion();
    })
}
function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
        mostrarSeccion();
    })
}
async function consultarAPI(){
    try {
        const url= 'http://localhost:5000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        
    }
}
function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const{ id,nombre, precio} = servicio;
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}
function seleccionarServicio(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    // identificar al elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    // comprobar si un servicio fue seleccionado
    if(servicios.some(agregado =>agregado.id === id)){
        // eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    }else{
        // agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
}
function idCliente(){
    cita.id = document.querySelector('#id').value;
}
function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
}
function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
        const dia = new Date(e.target.value).getUTCDay();
        if( [6, 0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('No laboramos los fines de semana', 'error', '.formulario');
        }else{
            cita.fecha=e.target.value;
        }
    });
}
function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        const horaCita= e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora< 10 || hora > 17){
            e.target.value= '';
            mostrarAlerta('Nuestro horario es de 10:00 a 17:00', 'error', '.formulario');
        }else {
            cita.hora = e.target.value;
        }
    })
}
function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    // previene que se generen muchas alertas
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    }
    // crear alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);
    const referencia = document.querySelector(elemento);
     referencia.appendChild(alerta);
    // eliminar la alerta
   if(desaparece){
    setTimeout(() =>{
        alerta.remove();
    }, 3000);
   }
}
function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    // limpiar el contenido de resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Faltan Datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);
        return;
    }
    // formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

    // heading para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent= 'Resumen de Servicios';
    resumen.appendChild(headingServicios);
    // iterando y mostrando  los servicios
    servicios.forEach(servicio => {
        const{id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        const textServicio = document.createElement('P');
        textServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML= `<span>Precio:</span> $${precio}`;
        contenedorServicio.appendChild(textServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    // heading para cita en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent= 'Resumen de Cita';
    resumen.appendChild(headingCita);
    
    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML= `<span>Nombre:</span> ${nombre}`;
    // formatear la fecha al español
    const fechaObj =new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() +2;
    const year = fechaObj.getFullYear();
    const fechaUTC = new Date(Date.UTC(year, mes, dia));
    const opciones = {weekday:'long', year: 'numeric', month: 'long', day:'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones);
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML= `<span>Fecha:</span> ${fechaFormateada}`;
   
    const horaCita = document.createElement('P');
    horaCita.innerHTML= `<span>Hora:</span> ${hora} Horas`;
    // boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent= 'Reservar cita';
    botonReservar.onclick = reservarCita;
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}
async function reservarCita(){
    const { nombre, fecha, hora, servicios, id}= cita;
    const idServicios = servicios.map(servicio => servicio.id);
    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);
    try {
        // peticion a la api
        const url = "http://localhost:5000/api/citas";
        
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();
        console.log(resultado.resultado);
        if(resultado.resultado){
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'La cita fue creada exitosamente',
                button: 'OK'
            }).then(()=>{
                setTimeout(()=>{
                    window.location.reload();
                }, 3000);
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo ha salido mal',
            button: 'OK'
          })
    }
    // console.log([...datos]);
}