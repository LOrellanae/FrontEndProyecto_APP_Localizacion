let myMap = L.map('myMap').setView([14.628434, -90.522713], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let iconMarker = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bus-logo.svg/1200px-Bus-logo.svg.png',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
});

let markers = []; // Almacenar marcadores

function eliminarTodosLosMarcadores() {
    // Eliminar marcadores existentes
    markers.forEach(function (marker) {
        myMap.removeLayer(marker);
    });
}

// Agregar función para mostrar detalles en la tabla
function mostrarDetallesEnTabla(ubicacion) {
    // Obtener la referencia a la tabla en tu HTML
    var tabla = document.getElementById("tablaResumen");
    tabla.innerHTML = '';

    // Crear una fila para la tabla

    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.innerText = ubicacion.id_historial;

    const td1 = document.createElement('td');
    td1.innerText = ubicacion.hora_emision;

    const td2 = document.createElement('td');
    td2.innerText = ubicacion.fecha_emision;

    const td3 = document.createElement('td');
    td3.innerText = ubicacion.latitud;

    const td4 = document.createElement('td');
    td4.innerText = ubicacion.longitud;

    const td5 = document.createElement('td');
    td5.innerText = ubicacion.id_viaje;

    const td6 = document.createElement('td');
    td6.innerText = ubicacion.id_empresa;

    const td7 = document.createElement('td');
    td7.innerText = ubicacion.punto_llegada;

    const td8 = document.createElement('td');
    td8.innerText = ubicacion.punto_partida;

    const td9 = document.createElement('td');
    td9.innerText = ubicacion.descripcion_viaje;

    const td10 = document.createElement('td');
    td10.innerText = ubicacion.nombres;

    const td11 = document.createElement('td');
    td11.innerText = ubicacion.apellidos;

    const td12 = document.createElement('td');
    td12.innerText = ubicacion.dpi_piloto;

    const td13 = document.createElement('td');
    td13.innerText = ubicacion.placa_camion;

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);
    tr.appendChild(td11);
    tr.appendChild(td12);
    tr.appendChild(td13);

    tabla.appendChild(tr);

}

function UbicacionMap() {
    var url = "https://changeable-tooth-production.up.railway.app/api/resumen";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            eliminarTodosLosMarcadores();

            if (data.length > 0) {


                const DatosEmpresa = data.filter(function(elemento) {
                    // Ajusta la condición según tu criterio de filtro
                    return elemento.id_empresa === storedUsername;
                });


                const datosPorPlaca = DatosEmpresa.reduce((acumulador, dato) => {
                    const { placa_camion, fecha_Emision, hora_emision } = dato;
                    const datetime = new Date(`${fecha_Emision}T${hora_emision}`);

                    if (!acumulador[placa_camion] || datetime > acumulador[placa_camion].datetime) {
                        acumulador[placa_camion] = {
                            ubicacion: dato,
                            datetime
                        };
                    }

                    return acumulador;
                }, {});

                console.log(datosPorPlaca);
                
                const ubicacionesMasRecientes = Object.values(datosPorPlaca).map(item => item.ubicacion);

                console.log(ubicacionesMasRecientes);

                for (let index = 0; index < ubicacionesMasRecientes.length; index++) {

                    let ubicacion = ubicacionesMasRecientes[index];

                    let marker = L.marker([ubicacionesMasRecientes[index].latitud, ubicacionesMasRecientes[index].longitud], { icon: iconMarker }).addTo(myMap);

                    marker.on('click', function () {
                        mostrarDetallesEnTabla(ubicacion);
                        $('#miModal').modal('show');
                        
                    });

                    markers.push(marker);
                }
            }

        });
}

// Llamar a la función para inicializar el mapa

// mapa.js
var storedUsername = "";
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor almacenado en sessionStorage
    storedUsername = sessionStorage.getItem('username');

    console.log('El nombre de usuario es:', storedUsername);
});

UbicacionMap();
setInterval(UbicacionMap, 120000);


function toggleDarkMode() {
    const body = document.body;

    // Alternar entre las clases de Bootstrap para el modo oscuro y claro
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'light');
    } else {
      body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
  }

  // Asociar la función al botón
  document.getElementById('toggleBtn').addEventListener('click', toggleDarkMode);