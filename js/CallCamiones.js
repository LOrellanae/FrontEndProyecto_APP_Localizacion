GetDatos();

var storedUsername = "";
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el valor almacenado en sessionStorage
    storedUsername = sessionStorage.getItem('username');

    console.log('El nombre de usuario es:', storedUsername);
});

function GetDatos() {

    url = "https://changeable-tooth-production.up.railway.app/api/camion";
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

                console.log(data);

                
                for (let index = 0; index < data.length; index++) {

                    const tr = document.createElement('tr');

                    const th = document.createElement('th');
                    th.scope = 'row';
                    th.innerText = data[index].id;

                    const td1 = document.createElement('td');
                    td1.innerText = data[index].id_Empresa;

                    const td2 = document.createElement('td');
                    td2.innerText = data[index].marca;

                    const td3 = document.createElement('td');
                    td3.innerText = data[index].no_Chasis;

                    const td4 = document.createElement('td');
                    td4.innerText = data[index].placa_camion;

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

    url = "https://changeable-tooth-production.up.railway.app/api/camion";

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
    url = 'https://changeable-tooth-production.up.railway.app/api/camion';
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
    var id_empresa = storedUsername;
    var marca = document.getElementById("txtmarca");
    var no_chasis = document.getElementById("txtno_chasis");
    var placa_camion = document.getElementById("txtplaca_camion");



    const Create = {
        id_Empresa: id_empresa,
        marca: marca.value,
        no_Chasis: no_chasis.value,
        placa_camion: placa_camion.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Create),
    };

    fetch('https://changeable-tooth-production.up.railway.app/api/camion', options)
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


(() => {
    'use strict';
  
    const getStoredTheme = () => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    const setTheme = theme => document.documentElement.setAttribute('data-bs-theme', theme);
  
    const showActiveTheme = theme => {
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
      if (btnToActive) {
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
          element.classList.remove('active');
          element.setAttribute('aria-pressed', 'false');
        });
  
        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
      }
    };
  
    const themeToggleBtn = document.getElementById('theme-toggle');
  
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const newButtonText = newTheme === 'dark' ? 'White Mode' : 'Dark Mode';
  
        setStoredTheme(newTheme);
        setTheme(newTheme);
        showActiveTheme(newTheme);
  
        // Cambia el texto del botón
        themeToggleBtn.textContent = newButtonText;
        // Agrega o quita la clase 'btn-dark' dependiendo del nuevo tema
        themeToggleBtn.classList.toggle('btn-dark', newTheme === 'dark');
      });
    }
  
    const updateTheme = () => {
      const currentTheme = getStoredTheme();
      setTheme(currentTheme);
      showActiveTheme(currentTheme);
  
      // Cambia el texto del botón
      themeToggleBtn.textContent = currentTheme === 'dark' ? 'White Mode' : 'Dark Mode';
      // Agrega o quita la clase 'btn-dark' dependiendo del tema actual
      themeToggleBtn.classList.toggle('btn-dark', currentTheme === 'dark');
    };
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
    window.addEventListener('DOMContentLoaded', updateTheme);
  })();