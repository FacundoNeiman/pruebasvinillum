import { loginUser, registerUser, getUserLog } from './firebaseConfig.js';
// import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';


const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#pass');
const registerBtn = document.querySelector('#registerBtn');
const loginBtn = document.querySelector('#loginBtn');
const statusBtn = document.querySelector('#statusBtn');

loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passInput.value;

    console.log(email, password)

    // onAuthStateChanged(getUserLog(), (user) => {
    //     if (user) {
    //         console.log('Usuario ya logueado:', user);
    //         return;
    //     }
    // });
    try{
        const user = await loginUser(email,password);
        console.log(user);
    } catch(error){
        console.log( "Error", error);
    }
})

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



statusBtn.addEventListener('click',  () => {
    console.log(getUserLog())
});
