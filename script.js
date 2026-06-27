const lista = document.getElementById("listaRobos");
const pesquisa = document.getElementById("pesquisa");
const total = document.getElementById("totalRobos");
const dataAtual = document.getElementById("dataAtual");

const loader = document.getElementById("loader");
const app = document.getElementById("app");

let robos = [];

/* ================================
   DATA ATUAL
================================ */

function atualizarData() {
    dataAtual.textContent = new Date().toLocaleDateString("pt-BR");
}

/* ================================
   CARREGA ROBÔS
================================ */

fetch("data/robos.json")
    .then(response => response.json())
    .then(dados => {

        robos = dados;

        total.textContent = robos.length;

        atualizarData();

        desenhar(robos);

        setTimeout(() => {

            loader.style.display = "none";
            app.style.display = "block";

        }, 600);

    })
    .catch(error => {

        console.error(error);

        loader.style.display = "none";

        app.style.display = "block";

        lista.innerHTML = `
            <h2 style="text-align:center;">
                Erro ao carregar os robôs.
            </h2>
        `;

    });

/* ================================
   DESENHA OS CARDS
================================ */

function desenhar(listaRobos) {

    lista.innerHTML = "";

    listaRobos.forEach(r => {

        lista.innerHTML += `

        <div class="robot-card">

            <div class="robot-header">

                <div class="robot-icon">
                    <i class="fa-solid fa-robot"></i>
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

/* ================================
   PESQUISA
================================ */

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    const filtrado = robos.filter(r =>

        r.nome.toLowerCase().includes(texto) ||

        r.descricao.toLowerCase().includes(texto) ||

        r.categoria.toLowerCase().includes(texto)

    );

    desenhar(filtrado);

});
