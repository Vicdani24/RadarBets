// =================================
// RadarBets
// Controle Green / Red
// Lista de Análise
// =================================

const area = document.getElementById("conteudoLista");

if (area) {
    carregarLista();
}

function carregarLista() {

    const id = localStorage.getItem("listaAtual");

    const lista = banco.dados.listas.find(
        l => l.id == id
    );

    if (!lista) {

        area.innerHTML = `
        <div class="card">
            <h2>❌ Lista não encontrada</h2>
        </div>
        `;

        return;

    }

    let greens = 0;
    let reds = 0;
    let pendentes = 0;

    lista.entradas.forEach(item => {

        if (item.status === "green") {
            greens++;
        } else if (item.status === "red") {
            reds++;
        } else {
            pendentes++;
        }

    });

    // ===========================
    // Aproveitamento
    // ===========================

    let aproveitamento = "--";

    if ((greens + reds) > 0) {

        aproveitamento = Math.round(
            (greens / (greens + reds)) * 100
        );

    }

    // ===========================
    // Barra de progresso
    // ===========================

    let larguraBarra = 0;

    if (aproveitamento !== "--") {
        larguraBarra = aproveitamento;
    }

    let html = `

<div class="card">

    <h2>📋 ${lista.titulo}</h2>

    <p>🏆 ${lista.campeonato}</p>

    <p>📅 ${lista.data || "-"}</p>

</div>


<div class="card">

    <h2>📊 Aproveitamento da Análise</h2>

    <div class="barra">

        <div
            class="progresso"
            style="width:${larguraBarra}%">
        </div>

    </div>

    <h1 style="margin-top:15px;text-align:center;">

        ${aproveitamento === "--" ? "--" : aproveitamento + "%"}

    </h1>

    ${
        aproveitamento === "--"
        ? "<p style='text-align:center'>⏳ Aguardando resultados</p>"
        : ""
    }

    <div class="resumo-status">

        <span class="status-green">
            🟢 ${greens}
        </span>

        <span class="status-red">
            🔴 ${reds}
        </span>

        <span class="status-pendente">
            🟡 ${pendentes}
        </span>

    </div>

</div>


<div class="card">

<h2>⚽ Jogos</h2>

`;

    lista.entradas.forEach((item, index) => {

        let textoStatus = "⏳ Pendente";

        if (item.status === "green") {
            textoStatus = "🟢 Green";
        }

        if (item.status === "red") {
            textoStatus = "🔴 Red";
        }

        html += `

<div class="card jogo ${item.status}">

    <h3>${item.jogo}</h3>

    <p>

        Status:

        <strong>

            ${textoStatus}

        </strong>

    </p>

    <div class="linha">

        <button
        class="btn-green"
        onclick="alterarStatus(${index},'green')">

        🟢

        </button>

        <button
        class="btn-red"
        onclick="alterarStatus(${index},'red')">

        🔴

        </button>

        <button
        class="btn-pendente"
        onclick="alterarStatus(${index},'pendente')">

        🟡

        </button>

    </div>

</div>

`;

    });

    html += `
</div>
`;

    area.innerHTML = html;

}

function alterarStatus(index, status) {

    const id = localStorage.getItem("listaAtual");

    const lista = banco.dados.listas.find(
        l => l.id == id
    );

    if (!lista) return;

    lista.entradas[index].status = status;

    banco.salvar();

    carregarLista();

}
