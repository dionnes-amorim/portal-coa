/* ==========================================
   PORTAL DE AUTOMAÇÕES COA
   TEREOS BRASIL
========================================== */

const lista = document.getElementById("listaRobos");
const pesquisa = document.getElementById("pesquisa");

const totalRobos = document.getElementById("totalRobos");
const totalArquivos = document.getElementById("totalArquivos");
const dataAtual = document.getElementById("dataAtual");

const loader = document.getElementById("loader");
const app = document.getElementById("app");

let robos = [];

/* ==========================================
DATA
========================================== */

function atualizarData(){

    const hoje = new Date();

    dataAtual.textContent = hoje.toLocaleDateString("pt-BR");

}

/* ==========================================
ÍCONE POR CATEGORIA
========================================== */

function iconeCategoria(categoria){

    switch(categoria.toLowerCase()){

        case "pcm":
            return "fa-screwdriver-wrench";

        case "industrial":
            return "fa-industry";

        case "indicadores":
            return "fa-chart-column";

        case "logística":
        case "logistica":
            return "fa-truck";

        case "relatórios":
        case "relatorios":
            return "fa-file-lines";

        default:
            return "fa-robot";

    }

}

/* ==========================================
RENDERIZAÇÃO
========================================== */

function renderizar(listaAtual){

    lista.innerHTML = "";

    listaAtual.forEach(r=>{

        lista.innerHTML += `

<div class="robot-card">

    <div class="robot-header">

        <div class="robot-icon">

            <i class="fa-solid ${iconeCategoria(r.categoria)}"></i>

        </div>

        <div class="robot-title">

            <h2>${r.nome}</h2>

            <span>${r.categoria}</span>

        </div>

    </div>

    <p class="robot-description">

        ${r.descricao}

    </p>

    <div class="badges">

        <span class="badge version">

            v${r.versao}

        </span>

        <span class="badge xlsm">

            XLSM

        </span>

        ${r.novo ? '<span class="badge novo">NOVO</span>' : ''}

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

    <a href="arquivos/${r.arquivo}" download>

        <button class="download-btn">

            <i class="fa-solid fa-download"></i>

            Baixar Automação

        </button>

    </a>

</div>

`;

    });

}

/* ==========================================
CARREGA JSON
========================================== */

fetch("data/robos.json")

.then(res=>res.json())

.then(dados=>{

    robos = dados;

    atualizarData();

    totalRobos.textContent = robos.length;

    totalArquivos.textContent = robos.length;

    renderizar(robos);

    setTimeout(()=>{

        loader.style.display="none";

        app.style.display="block";

    },700);

})

.catch(()=>{

    loader.innerHTML=`

        <div style="text-align:center">

            <h2>Erro ao carregar as automações.</h2>

            <p>Verifique o arquivo robos.json</p>

        </div>

    `;

});

/* ==========================================
PESQUISA
========================================== */

pesquisa.addEventListener("keyup",()=>{

    const texto = pesquisa.value.toLowerCase();

    const filtrados = robos.filter(r=>

        r.nome.toLowerCase().includes(texto) ||

        r.descricao.toLowerCase().includes(texto) ||

        r.categoria.toLowerCase().includes(texto)

    );

    renderizar(filtrados);

});

/* ==========================================
SCROLL HEADER
========================================== */

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY>40){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

    }

    else{

        header.style.boxShadow="none";

    }

});
