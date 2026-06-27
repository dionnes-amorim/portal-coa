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
    dataAtual.innerHTML = new Date().toLocaleDateString("pt-BR");
}

/* ================================
   SAUDAÇÃO DINÂMICA
================================ */
function saudacao() {
    const hora = new Date().getHours();

    if (hora < 12) return "Bom dia 👋";
    if (hora < 18) return "Boa tarde ☀";
    return "Boa noite 🌙";
}

/* ================================
   FETCH ROBÔS
================================ */
fetch("data/robos.json")
.then(res => res.json())
.then(dados => {

    robos = dados;

    total.innerHTML = robos.length;

    atualizarData();

    desenhar(robos);

    setTimeout(() => {
        loader.style.display = "none";
        app.style.display = "block";
    }, 800);

})
.catch(() => {

    loader.innerHTML = "<h2>Erro ao carregar robôs</h2>";

});

/* ================================
   RENDER DOS CARDS
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

                <span class="badge version">v${r.versao}</span>
                <span class="badge xlsm">XLSM</span>
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
   PESQUISA EM TEMPO REAL
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
 const modal = document.getElementById("modal");

function abrirModal(r){

    document.getElementById("modalTitulo").innerText = r.nome;
    document.getElementById("modalDescricao").innerText = r.descricao;
    document.getElementById("modalVersao").innerText = r.versao;
    document.getElementById("modalCategoria").innerText = r.categoria;
    document.getElementById("modalTamanho").innerText = r.tamanho;
    document.getElementById("modalAtualizacao").innerText = r.atualizacao;

    document.getElementById("modalDownload").href = "arquivos/" + r.arquivo;

    modal.style.display = "flex";
}

function fecharModal(){
    modal.style.display = "none";
}
