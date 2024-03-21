import { User } from "../models/user.model.js";

import { LoginService } from "../services/login.services.js";

const getLoginInputs = () => {
    return {
        username: document.getElementById('username'),
        password: document.getElementById('password')
    }
}


const handleShowHide = () => {
    const newCommentTag = document.getElementById('form-comentario');
    const loginTag = document.getElementById('login-form');
    if (newCommentTag.classList.contains('disabled')) {
        newCommentTag.classList.remove('disabled');
        loginTag.classList.add('disabled');
    } else {
        newCommentTag.classList.add('disabled');
        loginTag.classList.remove('disabled');
    }
}

const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = getLoginInputs();
    const user = new User(null, username.value, password.value)

    LoginService.apiAuthUser(user).then(result => {
        console.log(result)
        user.setId(result.id);
        user.setPassword(null);
        user.setFirstname(result.firstname);
        user.setLastname(result.lastname);
        handleShowHide();
    }).catch(error => {
        alert(`Login inválido. Erro:${error.message}`)
    })
       const inputAthor = document.getElementById('inputAthor');
       inputAthor.value = result.firstname + ' '+result.lastname;
       inputAthor.disabled = true;
       inputAthor.style.backgroundColor = "#444"
       inputAthor.style.color = '#fff'   
       console.log(user)
}


const LoginComponent = {
    run: () => {
        const formLogin = document.getElementById('formLogin');
        formLogin.addEventListener('submit', handleLogin);
    }
}

export { LoginComponent }