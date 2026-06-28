const lista = document.getElementById("listaRobos");
const pesquisa = document.getElementById("pesquisa");

const totalRobos = document.getElementById("totalRobos");
const novidades = document.getElementById("novidades");
const categorias = document.getElementById("categorias");

const ultimaAutomacao = document.getElementById("ultimaAutomacao");
const filtros = document.getElementById("filtros");
const toast = document.getElementById("toast");

const loader = document.getElementById("loader");
const app = document.getElementById("app");

let robos = [];
let categoriaAtual = "Todos";

/* ============================
   CARREGAMENTO
============================ */

async function iniciar() {

    try {

        const resposta = await fetch("data/robos.json");

        robos = await resposta.json();

        atualizarDashboard();

        criarFiltros();

        carregarUltima();

        render();

        carregarTema();

        setTimeout(() => {

            loader.style.display = "none";
            app.style.display = "block";

        }, 700);

    } catch (erro) {

        loader.innerHTML = `
            <div style="text-align:center;color:white;">
                <h2>Erro ao carregar o portal</h2>
                <p>Verifique o arquivo robos.json</p>
            </div>
        `;

    }

}

iniciar();

/* ============================
   DASHBOARD
============================ */

function atualizarDashboard() {

    totalRobos.textContent = robos.length;

    novidades.textContent = robos.filter(r => r.novo).length;

    categorias.textContent = [...new Set(robos.map(r => r.categoria))].length;

}

/* ============================
   HIGHLIGHT
============================ */

function highlight(texto, busca) {

    if (!busca) return texto;

    return texto.replace(

        new RegExp(busca, "gi"),

        m => `<mark>${m}</mark>`

    );

}

/* ============================
   RENDER
============================ */

function render() {

    const texto = pesquisa.value.toLowerCase();

    let dados = [...robos];

    if (categoriaAtual !== "Todos") {

        dados = dados.filter(r => r.categoria === categoriaAtual);

    }

    if (texto) {

        dados = dados.filter(r =>

            r.nome.toLowerCase().includes(texto) ||

            r.descricao.toLowerCase().includes(texto) ||

            r.categoria.toLowerCase().includes(texto)

        );

    }

    dados.sort((a, b) => b.novo - a.novo);

    lista.innerHTML = dados.map(r => `

<div class="robot-card ${r.categoria.toLowerCase()}">

<div class="tag"></div>

<div class="robot-header">

<div class="robot-title">

<h3>${highlight(r.nome, texto)}</h3>

<span>${r.categoria}</span>

</div>

</div>

<p class="robot-description">

${highlight(r.descricao, texto)}

</p>

<div class="badges">

<span class="badge version">

v${r.versao}

</span>

<span class="badge xlsm">

XLSM

</span>

${r.novo ? '<span class="badge novo pulse">NOVO</span>' : ''}

</div>

<div class="robot-info">

<div class="info-box">

<small>Tamanho</small>

<strong>${r.tamanho}</strong>

</div>

<div class="info-box">

<small>Atualização</small>

<strong>${r.atualizacao}</strong>

</div>

</div>

<a href="arquivos/${r.arquivo}"

download

onclick="downloadToast()">

<button class="download-btn">

<i class="fa-solid fa-download"></i>

Baixar Automação

</button>

</a>

</div>

`).join("");

    ativarCards();

}
/* ============================
   PESQUISA
============================ */

pesquisa.addEventListener("input", render);

/* ============================
   FILTROS
============================ */

function criarFiltros() {

    filtros.innerHTML = "";

    const listaCategorias = [

        "Todos",

        ...new Set(robos.map(r => r.categoria))

    ];

    listaCategorias.forEach(cat => {

        const botao = document.createElement("button");

        botao.textContent = cat;

        if (cat === categoriaAtual) {

            botao.classList.add("ativo");

        }

        botao.addEventListener("click", () => {

            categoriaAtual = cat;

            document
                .querySelectorAll("#filtros button")
                .forEach(btn => btn.classList.remove("ativo"));

            botao.classList.add("ativo");

            render();

        });

        filtros.appendChild(botao);

    });

}

/* ============================
   ÚLTIMA AUTOMAÇÃO
============================ */

function carregarUltima() {

    if (!robos.length) return;

    const ultima = robos[robos.length - 1];

    ultimaAutomacao.innerHTML = `

        <strong>${ultima.nome}</strong>

        <br>

        <small>

            Versão ${ultima.versao}

            •

            ${ultima.atualizacao}

        </small>

    `;

}

/* ============================
   TOAST
============================ */

let toastTimer;

function downloadToast() {

    clearTimeout(toastTimer);

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

/* ============================
   TEMA
============================ */

function toggleTheme() {

    document.body.classList.toggle("light");

    const tema = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("theme", tema);

    atualizarIconeTema();

}

function carregarTema() {

    const tema = localStorage.getItem("theme");

    if (tema === "light") {

        document.body.classList.add("light");

    }

    atualizarIconeTema();

}

function atualizarIconeTema() {

    const icone = document.querySelector(".theme-toggle i");

    if (!icone) return;

    if (document.body.classList.contains("light")) {

        icone.className = "fa-solid fa-sun";

    } else {

        icone.className = "fa-solid fa-moon";

    }

}

/* ============================
   CARDS
============================ */

function ativarCards() {

    const cards = document.querySelectorAll(".robot-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            document.body.classList.add("card-open");

        });

    });

}

document.addEventListener("click", e => {

    if (!e.target.closest(".robot-card")) {

        document
            .querySelectorAll(".robot-card")
            .forEach(card => card.classList.remove("active"));

        document.body.classList.remove("card-open");

    }

});

/* ============================
   HEADER
============================ */

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("shadow");

    } else {

        header.classList.remove("shadow");

    }

});
