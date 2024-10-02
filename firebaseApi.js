import { registerUser } from './auth.js';

const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#pass');
const registerBtn = document.querySelector('#registerBtn');

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
