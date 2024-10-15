import { loginUser, registerUser, getUserLog, logout } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#pass');
const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('#loginBtn');
const statusBtn = document.querySelector('#statusBtn');
const logoutBtn = document.querySelector('#logoutBtn');

const clearInputs = () => {
    emailInput.value = "";
    passInput.value = "";
};

// Verificar el estado de autenticación al cargar
onAuthStateChanged(getUserLog(), user => {
    if (user) {
        console.log("logueado:", user.email);
    }
});

loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    // Verificar si hay un usuario ya logueado antes de intentar iniciar sesión
    const currentUser = getUserLog().currentUser;
    if (currentUser) {
        console.log("Ya estás logueado", currentUser.email);
        alert("Ya estás logueado como " + currentUser.email);
        return; 
    }

    try {
        const user = await loginUser(email, password);
        console.log('Usuario autenticado:', user.email);
        clearInputs();
    } catch (error) {
        console.log("Error", error);
    }
});

registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    try {
        const user = await registerUser(email, password);
        console.log('Registro exitoso:', user);
        clearInputs();
    } catch (error) {
        console.error('Error en el registro:', error);
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
        alert('Sesión cerrada correctamente');
    } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
    }
});

statusBtn.addEventListener('click', () => {
    const currentUser = getUserLog().currentUser;
    console.log(currentUser ? "Usuario actual:" + currentUser.email : "No hay usuario logueado");
});
