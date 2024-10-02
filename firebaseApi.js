import { loginUser, registerUser, getUserLog, logout } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#pass');
const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('#loginBtn');
const statusBtn = document.querySelector('#statusBtn');
const logoutBtn = document.querySelector('#logoutBtn');


loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    // Verificar si hay un usuario ya logueado
     onAuthStateChanged(getUserLog(), async (user) => {
        if (user) {
            console.log(user);
            alert("Ya estás logueado. Cierra sesión antes de iniciar sesión nuevamente.");
            return; 
        }
        else{
        try {
            const user = await loginUser(email, password);
            console.log('Usuario autenticado:', user);
        } catch (error) {
            console.log("Error", error);
        }
    }
    });


});
registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    console.log(email, password)

    try {
        const user = await registerUser(email, password);
        console.log('Registro exitoso:', user);
    } catch (error) {
        console.error('Error en el registro:', error);
    }
});

logoutBtn.addEventListener('click',  () => {
    let msg;
    if (logout()){
        msg = 'Sesión cerrada correctamente'
    }
    else{
        msg = 'Error'
    }

    alert(msg)
});

statusBtn.addEventListener('click',  () => {
    console.log(getUserLog().currentUser.email)
});
