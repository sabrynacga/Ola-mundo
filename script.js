const API_URL = "https://vizioon-todoist-java-backend.onrender.com/api/tarefa";

let tarefas = [];

const listEl = document.getElementById("lista-tarefas");
const contadorEl = document.getElementById("contador-tarefas");
const formEl = document.getElementById("formulario-tarefa");
const statusEl = document.getElementById("status");
const botãoAdicionarEl = document.getElementById("adicionar-tarefa");

async function buscarTarefas() {
statusEl.textContent = "Carregando tarefas...";
statusEl.classList = "erro";

try {
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error("Erro ao buscar tarefas");
    }
    const data = await response.json();
    tarefas = data.map(item => ({
        id: item.id,
        nome: item.nome,
        concluida: item.concluida
    }));

    console.log(data);
    renderizarTarefas();

} catch (error) {
    // mostrar erro
    statusEl.textContent = "Erro ao carregar tarefas.";
    statusEl.classList = "erro";
}
}

function renderizarTarefas() {
    listEl.innerHTML = "";
    tarefas.forEach(tarefa => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span class="checkbox ${tarefa.concluida ? "marcado" : ""}" data-id="${tarefa.id}"></span>
            <span class="texto-tarefa">${tarefa.nome}</span>
            <button class="remover" data-id="${tarefa.id}">X</button>
        `;
        listEl.appendChild(item);
    });
    contadorEl.textContent = `${tarefas.length} tarefa(s)`;
}

async function excluirTarefa(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir tarefa");
        }
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        renderizarTarefas();
    } catch (error) {
        statusEl.textContent = "Erro ao excluir tarefa.";
        statusEl.classList = "erro";
    }
}

async function criarTarefa(nome) {
    botãoAdicionarEl.disabled = true;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: text, descrisao:""})
        });
    } catch (error) {

    }

// inicializar
buscarTarefas();