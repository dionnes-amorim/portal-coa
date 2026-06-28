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


function highlight(text, query){

    if(!query) return text;

    return text.replace(new RegExp(query, "gi"), match =>
        `<mark style="background:#f58220;color:#000;padding:2px 4px;border-radius:4px">${match}</mark>`
    );

}

function render(lista = robos, query = ""){

    const ordenado = [...lista].sort((a, b) => (b.novo === true) - (a.novo === true));

    let html = "";

    ordenado.forEach((r, index) => {

        html += `

        <div class="robot-card ${r.categoria.toLowerCase()} fade-in">

            <div class="tag"></div>

            <div class="robot-header">

                <div class="robot-title">

                    <h3>${highlight(r.nome, query)}</h3>

                    <span>${r.categoria}</span>

                </div>

            </div>

            <p class="robot-description">

                ${highlight(r.descricao, query)}

            </p>

            <div class="badges">

                <span class="badge version">v${r.versao}</span>

                <span class="badge xlsm">XLSM</span>

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

            <a href="arquivos/${r.arquivo}" download onclick="downloadToast()">

                <button class="download-btn">

                    ⬇ Baixar Automação

                </button>

            </a>

        </div>

        `;

    });

    listaRobos.innerHTML = html;

}








function ativarHoverCards(){

    const cards = document.querySelectorAll(".robot-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("hovered");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("hovered");

        });

        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("selected"));

            card.classList.add("selected");

        });

    });

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

    render(filtrado, valor);

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
function toggleTheme(){

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

}

/* carregar tema salvo */

(function(){

    const theme = localStorage.getItem("theme");

    if(theme === "light"){

        document.body.classList.add("light");

    }

})();
function toggleTheme(){

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

}

/* carregar tema salvo */
(function(){

    const theme = localStorage.getItem("theme");

    if(theme === "light"){

        document.body.classList.add("light");

    }

})();
function ativarFocusCards(){

    const cards = document.querySelectorAll(".robot-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            // remove de todos
            cards.forEach(c => c.classList.remove("active"));

            // ativa no clicado
            card.classList.add("active");

            // ativa blur no fundo
            document.body.classList.add("card-open");

        });

    });

}

/* fechar ao clicar fora */
document.addEventListener("click", (e) => {

    if(!e.target.closest(".robot-card")){

        document.querySelectorAll(".robot-card")
        .forEach(c => c.classList.remove("active"));

        document.body.classList.remove("card-open");

    }

});
