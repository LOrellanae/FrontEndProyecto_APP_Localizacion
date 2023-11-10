const $btnSignIn = document.querySelector('.sign-in-btn');
const $btnSignUp = document.querySelector('.sign-up-btn');
const $signUp = document.querySelector('.sign-up');
const $signIn = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }
});



// Registro de Usuario
async function guardaregistros() {
    const url = 'https://changeable-tooth-production.up.railway.app/api/empresa'; // Cambia la URL según sea necesario

    var id_Empresa = document.getElementById('Id_Empresa').value; // Corrige el nombre del ID
    var password = document.getElementById('password').value;
    var nombre_Empresa = document.getElementById('nombre_empresa').value; // Corrige el nombre del ID

    var data = {
        "Id_Empresa": id_Empresa,
        "password": password,
        "nombre_Empresa": nombre_Empresa
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('INFORMACIÓN GUARDADA CORRECTAMENTE');
            console.log(jsonResponse);
            Swal.fire(
                '¡Éxito!',
                '¡Guardado correctamente!',
                'success'
            );
            // Puedes hacer más acciones aquí, como redirigir al usuario
        } else {
            const errorData = await response.json();
            console.log('Error al guardar:', errorData.error);
            Swal.fire(
                'Error',
                'No se pudo guardar la información',
                'error'
            );
        }
    } catch (error) {
        console.error('Error en el envío de datos:', error);
        Swal.fire(
            'Error',
            'Ocurrió un error en la solicitud',
            'error'
        );
    }
}

window.username = '';

// Inicio de Sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    window.username = document.getElementById('username').value;
    sessionStorage.setItem('username', window.username);
    let password = document.getElementById('passwordlg').value;

    fetch('https://changeable-tooth-production.up.railway.app/api/empresa/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Id_Empresa: username, Password: password})
    })
    .then(response => response.text())
    .then(data => {
        if (data === "¡Login exitoso!") {
            var storedUsername = sessionStorage.getItem('username');
            console.log('El nombre de usuario es:', storedUsername);
            window.location.href = 'view/mapa.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => console.error('Error:', error));
});

/*function iniciarSesion() {
    // Muestra la pantalla de carga
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    // Simula una espera de 2 segundos antes de redirigir (puedes ajustarlo)
    setTimeout(function() {
        const idEmpresa = document.getElementById('id_Empresa_login').value;
        const password = document.getElementById('password_login').value;

        const idEmpresaCookie = obtenerCookie('idEmpresa');
        const passwordCookie = obtenerCookie('password');

        if (idEmpresa === idEmpresaCookie && password === passwordCookie) {
            Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success');
            // Redirige al usuario a la página principal o realiza las acciones necesarias.
            window.location.href = 'view/mapa.html'; // Cambia 'principal.html' por la URL de la página a la que deseas redirigir.
        } else {
            Swal.fire('Error', 'Inicio de sesión fallido. Verifica tus credenciales.', 'error');
        }

        // Oculta la pantalla de carga
        loadingScreen.style.display = 'none';
    }, 1500); // Simula una espera de 2 segundos (puedes ajustar el tiempo de espera)
}

function obtenerCookie(nombre) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === nombre) {
            return value;
        }
    }
    return null;
}

// Tu código JavaScript existente aquí

// Verificar si el usuario ya ha aceptado las cookies
if (!getCookie('accept-cookies')) {
    // El usuario aún no ha aceptado las cookies, mostramos el banner
    const cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'block';

    // Cuando el usuario hace clic en "Aceptar", guardamos una cookie y ocultamos el banner
    const acceptCookiesButton = document.getElementById('accept-cookies');
    acceptCookiesButton.addEventListener('click', () => {
        setCookie('accept-cookies', 'true', 365); // Cookie válida por 365 días
        cookieBanner.style.display = 'none';
    });
}

// Función para establecer una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Función para obtener el valor de una cookie
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const parts = cookie.split('=');
        if (parts[0].trim() === name) {
            return parts[1];
        }
    }
    return "";
}
// Oculta la animación cuando la página esté completamente cargada
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}); */

// Modifica el mensaje de las cookies
Swal.fire({
    title: 'Política de Cookies',
    html: 'Este sitio web utiliza cookies para mejorar tu experiencia. <a href="aviso-cookies.html">Más información</a>',
    icon: 'info',
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,
    allowEscapeKey: false,
});
