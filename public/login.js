document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`);
        const usuarios = await response.json();

        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert('Login efetuado com sucesso no Devify!');
            window.location.href = 'home.html';
        } else {
            alert('E-mail ou palavra-passe incorretos!');
        }
    } catch (error) {
        alert('Erro ao ligar com a API (JSON-Server).');
    }
});