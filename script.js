const lista = document.getElementById("listaRobos");
const pesquisa = document.getElementById("pesquisa");

const totalRobos = document.getElementById("totalRobos");
const novidades = document.getElementById("novidades");
const categorias = document.getElementById("categorias");

const ultimaAutomacao = document.getElementById("ultimaAutomacao");
const filtros = document.getElementById("filtros");
const toast = document.getElementById("toast");

let robos = [];

/* ================================
CARREGAMENTO
================================ */

fetch("data/robos.json")
.then(res => res.json())
.then(data => {

    robos = data;

    render();

    atualizarDashboard();

    criarFiltros();

    carregarUltima();

    setTimeout(()=>{
        document.getElementById("loader").style.display = "none";
        document.getElementById("app").style.display = "block";
    },800);

});

/* ================================
DASHBOARD
================================ */

function atualizarDashboard(){

    totalRobos.innerText = robos.length;

    const novos = robos.filter(r => r.novo).length;

    novidades.innerText = novos;

    const cats = [...new Set(robos.map(r => r.categoria))].length;

    categorias.innerText = cats;

}

/* ================================
RENDER CARDS
================================ */

function render(lista = robos){

    let html = "";

    lista.forEach(r => {

        html += `

        <div class="robot-card">

            <div class="tag ${r.categoria.toLowerCase()}"></div>

            <h3>${r.nome}</h3>

            <p>${r.descricao}</p>

            <div class="info">

                <span>v${r.versao}</span>

                <span>${r.tamanho}</span>

                <span>${r.categoria}</span>

                <span>${r.atualizacao}</span>

            </div>

            <a href="arquivos/${r.arquivo}" download onclick="downloadToast()">

                <button class="download-btn">

                    ⬇ Baixar

                </button>

            </a>

        </div>

        `;

    });

    listaRobos.innerHTML = html;

}

/* ================================
PESQUISA
================================ */

pesquisa.addEventListener("input", e => {

    const valor = e.target.value.toLowerCase();

    const filtrado = robos.filter(r =>
        r.nome.toLowerCase().includes(valor) ||
        r.descricao.toLowerCase().includes(valor) ||
        r.categoria.toLowerCase().includes(valor)
    );

    render(filtrado);

});

/* ================================
FILTROS
================================ */

function criarFiltros(){

    const cats = ["Todos", ...new Set(robos.map(r => r.categoria))];

    cats.forEach(c => {

        const btn = document.createElement("button");

        btn.innerText = c;

        btn.onclick = () => {

            if(c === "Todos") render();

            else render(robos.filter(r => r.categoria === c));

        };

        filtros.appendChild(btn);

    });

}

/* ================================
ULTIMA AUTOMACAO
================================ */

function carregarUltima(){

    const ultima = robos[robos.length - 1];

    ultimaAutomacao.innerHTML = `
        <strong>${ultima.nome}</strong><br>
        <small>${ultima.versao}</small>
    `;
}

/* ================================
TOAST DOWNLOAD
================================ */

function downloadToast(){

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}
