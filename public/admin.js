document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || !usuarioLogado.isAdmin) {
        alert('Acesso restrito apenas a Administradores!');
        window.location.href = 'home.html';
        return;
    }

    carregarUsuarios();

    // Evento de envio do formulário de edição ao clicar no botão "Salvar Alterações"
    document.getElementById('form-editar').addEventListener('submit', salvarEdicao);
});

async function carregarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const usuarios = await response.json();
        renderizarTabela(usuarios);
    } catch (error) {
        alert('Erro ao carregar a lista de utilizadores.');
    }
}

async function buscarPorCPF() {
    const cpf = document.getElementById('search-cpf').value.trim();
    if (!cpf) return carregarUsuarios();

    try {
        const response = await fetch(`http://localhost:3000/usuarios?cpf=${cpf}`);
        const usuarios = await response.json();
        renderizarTabela(usuarios);
    } catch (error) {
        alert('Erro na busca por CPF.');
    }
}

function renderizarTabela(usuarios) {
    const tbody = document.getElementById('tabela-usuarios');
    tbody.innerHTML = '';

    usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.nome} ${u.sobrenome}</td>
            <td>${u.cpf}</td>
            <td>${u.email}</td>
            <td>${u.telefone}</td>
            <td>${u.cidade}/${u.estado}</td>
            <td class="actions-cell">
                <button onclick="prepararEdicao('${u.id}')" class="btn btn-secondary" style="padding: 6px 12px; font-size:12px;">Editar</button>
                <button onclick="deletarUsuario('${u.id}')" class="btn btn-danger" style="padding: 6px 12px; font-size:12px;">Apagar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Preenche os campos do formulário e exibe o bloco de edição
async function prepararEdicao(id) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`);
        const u = await response.json();

        document.getElementById('edit-id').value = u.id;
        document.getElementById('edit-nome').value = u.nome;
        document.getElementById('edit-sobrenome').value = u.sobrenome;
        document.getElementById('edit-cpf').value = u.cpf;
        document.getElementById('edit-telefone').value = u.telefone;
        document.getElementById('edit-email').value = u.email;
        document.getElementById('edit-cidade').value = u.cidade;
        document.getElementById('edit-estado').value = u.estado;

        // Exibe o painel de edição e faz rolagem suave até ele
        const boxEdicao = document.getElementById('box-edicao');
        boxEdicao.style.display = 'block';
        boxEdicao.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        alert('Erro ao buscar dados para edição.');
    }
}

// Executado ao clicar no botão "Salvar Alterações"
async function salvarEdicao(e) {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;

    const dadosAtualizados = {
        nome: document.getElementById('edit-nome').value,
        sobrenome: document.getElementById('edit-sobrenome').value,
        cpf: document.getElementById('edit-cpf').value,
        telefone: document.getElementById('edit-telefone').value,
        email: document.getElementById('edit-email').value,
        cidade: document.getElementById('edit-cidade').value,
        estado: document.getElementById('edit-estado').value
    };

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert('Utilizador atualizado com sucesso!');
            cancelarEdicao();
            carregarUsuarios();
        } else {
            alert('Erro ao guardar alterações.');
        }
    } catch (error) {
        alert('Erro de comunicação com o servidor.');
    }
}

function cancelarEdicao() {
    document.getElementById('box-edicao').style.display = 'none';
    document.getElementById('form-editar').reset();
}

async function deletarUsuario(id) {
    if (confirm('Tem certeza de que deseja eliminar este utilizador?')) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Utilizador removido com sucesso!');
                carregarUsuarios();
            }
        } catch (error) {
            alert('Erro ao eliminar utilizador.');
        }
    }
}