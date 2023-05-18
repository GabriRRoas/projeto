// Seleciona todos os elementos com a classe "item" e "column"
const items = document.querySelectorAll(".item");
const columns = document.querySelectorAll(".column");

// Variável para armazenar o item sendo arrastado
let draggedItem = null;

// Adiciona os eventos de arrastar e soltar aos itens
items.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});

// Adiciona os eventos de arrastar e soltar às colunas
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
});

// Função chamada quando o arrastar do item é iniciado
function dragStart(event) {
    // Armazena o item atual na variável draggedItem
    draggedItem = this;
    // Define um timeout para modificar o estilo do item (ocultar) após 0 segundos
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}

// Função chamada quando o arrastar do item é encerrado
function dragEnd() {
    // Reseta a variável draggedItem
    draggedItem = null;
    // Define um timeout para restaurar o estilo do item (exibir) após 0 segundos
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
}

// Função chamada quando o item é arrastado sobre a coluna
function dragOver(event) {
    // Previne o comportamento padrão de arrastar e soltar
    event.preventDefault();
}

// Função chamada quando o item entra na coluna
function dragEnter() {
    // Adiciona a classe "dragover" à coluna para estilização
    this.classList.add("dragover");
}

// Função chamada quando o item sai da coluna
function dragLeave() {
    // Remove a classe "dragover" da coluna para reverter a estilização
    this.classList.remove("dragover");
}

// Função chamada quando o item é solto na coluna
function drop() {
    // Verifica se a coluna de destino já contém um item
    const hasItem = this.querySelector(".item");

    // Se a coluna já contiver um item, ocorre a troca de itens
    if (hasItem) {
        const parentItem = draggedItem.parentNode;
        const placeholder = document.createElement("div");
        parentItem.insertBefore(placeholder, draggedItem);
        this.insertBefore(draggedItem, hasItem);
        parentItem.insertBefore(hasItem, placeholder);
        parentItem.removeChild(placeholder);
    } else {
        // Se a coluna não contiver um item, apenas move o item para a nova coluna
        this.appendChild(draggedItem);
    }

    // Remove a classe "dragover" da coluna para reverter a estilização
    this.classList.remove("dragover");
}