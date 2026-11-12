// Máscara e trava de 11 dígitos para CPF (000.000.000-00)
document.getElementById('cpf').addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '').slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
});

// Máscara e trava de 8 dígitos para CEP (00000-000)
document.getElementById('cep').addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '').slice(0, 8);
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = valor;
});

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cpfNumeros = document.getElementById('cpf').value.replace(/\D/g, '');
    const cepNumeros = document.getElementById('cep').value.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
        alert('O CPF deve conter exatamente 11 números.');
        return;
    }

    if (cepNumeros.length !== 8) {
        alert('O CEP deve conter exatamente 8 números.');
        return;
    }

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
