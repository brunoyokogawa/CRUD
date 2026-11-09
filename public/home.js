document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        window.location.href = 'login.html';
        return;
    }

    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Bem-vindo(a) ao Devify, ${usuarioLogado.nome}!`;

    const navArea = document.getElementById('nav-area');
    let htmlNav = '';

    if (usuarioLogado.isAdmin) {
        htmlNav += `<a href="admin.html" style="color: #fff; margin-right: 15px; text-decoration: none; font-weight: bold;">Painel Admin</a>`;
    }
    htmlNav += `<button onclick="logout()" class="btn btn-secondary" style="width: auto; padding: 8px 15px;">Sair</button>`;
    navArea.innerHTML = htmlNav;
});

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}