document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoUsuario = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        rua: document.getElementById('rua').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value,
        isAdmin: false
    };

    try {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            alert('Cadastro efetuado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao efetuar cadastro.');
        }
    } catch (error) {
        alert('Erro de comunicação com o servidor.');
    }
});