GetDatos();

var storedUsername = "";
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor almacenado en sessionStorage
    storedUsername = sessionStorage.getItem('username');

    console.log('El nombre de usuario es:', storedUsername);
});

function GetDatos() {

    url = "https://changeable-tooth-production.up.railway.app/api/piloto";
    fetch(url)
        .then(response => response.json())
        .then(DatosEmpresa => {
            console.log(DatosEmpresa)
            var tbody = document.getElementById('tablebody');
            tbody.innerHTML = '';


            if (DatosEmpresa.length > 0) {

                
                const data = DatosEmpresa.filter(function(elemento) {
                    // Ajusta la condición según tu criterio de filtro
                    return elemento.id_Empresa === storedUsername;
                });


                for (let index = 0; index < data.length; index++) {

                    const tr = document.createElement('tr');

                    const th = document.createElement('th');
                    th.scope = 'row';
                    th.innerText = data[index].id;

                    const td1 = document.createElement('td');
                    td1.innerText = data[index].nombres;

                    const td2 = document.createElement('td');
                    td2.innerText = data[index].apellidos;

                    const td3 = document.createElement('td');
                    td3.innerText = data[index].dpi_Piloto;

                    const td4 = document.createElement('td');
                    td4.innerText = data[index].licencia_Conducir;

                    const td5 = document.createElement('td');
                    td5.innerText = data[index].id_Empresa;

                    const td6 = document.createElement('td');
                    td6.innerText = data[index].direccion;  

                    const td8 = document.createElement('td');

                    const buttonActualiza = document.createElement("button");
                    buttonActualiza.type = "button";
                    buttonActualiza.className = "btn btn-success";
                    buttonActualiza.textContent = "Actualizar";
                    buttonActualiza.setAttribute('data-bs-toggle', 'modal');
                    buttonActualiza.setAttribute('data-bs-target', '#MdlForm2');
                    buttonActualiza.addEventListener('click', Form, false);
                    buttonActualiza.id = data[index].id;

                    const buttonEliminar = document.createElement("button");
                    buttonEliminar.type = "button";
                    buttonEliminar.className = "btn btn-danger";
                    buttonEliminar.textContent = "Eliminar";
                    buttonEliminar.id = data[index].id;
                    buttonEliminar.addEventListener('click', DeleteDatos, false);

                    tr.appendChild(th);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    td8.appendChild(buttonActualiza);
                    td8.appendChild(buttonEliminar);
                    tr.appendChild(td8);

                    tbody.appendChild(tr);
                }
            }
        });
}

function DeleteDatos(e) {
    const idempleado = e.target.id;

    const Create = {
        id: idempleado
    };

    idempleado.disabled = true;

    url = "https://changeable-tooth-production.up.railway.app/api/piloto";

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idempleado
        })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {

            alert("Mensaje: " + data.mensaje);
            GetDatos();
        })
        .catch(e => {
            console.log(e);
        });
        GetDatos();
    idempleado.disabled = false;
}

function PUTDatos() {
    var id = document.getElementById("txtIDU");
    var id_empresa = storedUsername;
    var marca = document.getElementById("txtmarcaU");
    var no_chasis = document.getElementById("txtno_chasisU");
    var placa_camion = document.getElementById("txtplaca_camionU");

    const Create = {
        id: id.value,
        id_Empresa: id_empresa,
        marca: marca.value,
        no_Chasis: no_chasis.value,
        placa_camion: placa_camion.value
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Create),
    };
    url = 'https://changeable-tooth-production.up.railway.app/api/piloto';
    fetch(url, options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(data => {
            alert("Mensaje: " + data.mensaje);
            GetDatos();

        }).catch(e => {
        });
    document.querySelector('#PUT').reset();

}


function PostDatos() {
    var nombre = document.getElementById("txtnombres");
    var DPI = document.getElementById("txtDPI");
    var apellido = document.getElementById("txtapellidos");
    var licencia = document.getElementById("txtlicencia");
    var id_empresa = storedUsername;
    var direccion = document.getElementById("txtdireccion");

    const Create = {
         nombres: nombre.value,
            dpi_Piloto: DPI.value,
            apellidos: apellido.value,
            licencia_Conducir: licencia.value,
            id_Empresa: id_empresa,
            direccion: direccion.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Create),
    };

    fetch('https://changeable-tooth-production.up.railway.app/api/piloto', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(Create => {
            alert(Create.mensaje);
            GetDatos();
        }).catch(e => {
            console.log(e);
        });
    document.querySelector('#POST').reset();
}


function Form(e) {
    const idempleado = e.target.id;
    var id = document.getElementById("txtIDU");
    id.value = idempleado;
    id.disabled = true;
}


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