// =================================
// RadarBets
// Histórico de Análises
// =================================

const areaLista = document.getElementById("listas");

if (areaLista) {
    carregarHistorico();
}

function carregarHistorico() {

    areaLista.innerHTML = "";

const listas = banco.dados?.listas || [];

    if (listas.length === 0) {

        areaLista.innerHTML = `
        <div class="card">
            <h2>📭 Nenhuma análise</h2>
            <p>Crie sua primeira análise.</p>
        </div>
        `;

        return;
    }

    // Ordena da mais recente para a mais antiga
    listas.sort((a, b) => (b.data || "").localeCompare(a.data || ""));

    const hoje = new Date().toISOString().split("T")[0];

    const listasHoje = listas.filter(l => l.data === hoje);

    const listasAntigas = listas.filter(l => l.data !== hoje);


// ==========================
// LISTAS DE HOJE
// ==========================

areaLista.innerHTML += `
    <h2 class="tituloData">📅 Hoje</h2>
`;

if (listasHoje.length === 0) {

    areaLista.innerHTML += `
        <div class="card">
            <p>Nenhuma análise criada hoje.</p>
        </div>
    `;

} else {

    listasHoje.forEach(lista => {

        areaLista.innerHTML += `

            <div class="link-analise"
                 onclick="abrirLista(${lista.id})">

                <span>📋 ${lista.titulo}</span>

                <span>➜</span>

            </div>

        `;

    });

}
    // ==========================
    // DATAS ANTERIORES
    // ==========================

    const datas = [...new Set(listasAntigas.map(l => l.data))];

    if (datas.length > 0) {

        areaLista.innerHTML += `
            <h2 class="tituloData">📚 Análises Anteriores</h2>
        `;

datas.forEach(data => {

    const quantidade = listas.filter(
        lista => lista.data === data
    ).length;

    areaLista.innerHTML += `

        <div class="card data-card"
             onclick="abrirData('${data}')">

            <div>

                <h3>📅 ${formatarData(data)}</h3>

                <small>${quantidade} análise${quantidade > 1 ? "s" : ""}</small>

            </div>

            <div class="seta">➜</div>

        </div>

    `;

});

    }

}

function abrirLista(id) {

    localStorage.setItem("listaAtual", id);

    window.location.href = "lista.html";

}

function abrirData(data){

    localStorage.setItem("dataSelecionada", data);

    window.location.href = "data.html";

}

function formatarData(data){

    if(!data) return "Sem data";

    const partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}

function calcularEstatisticas(lista){

    let acertos = 0;
    let erros = 0;
    let pendentes = 0;

    lista.entradas.forEach(item=>{

if(item.status==="green"){

            acertos++;

        }else if(item.status==="red"){

            erros++;

        }else{

            pendentes++;

        }

    });

    let porcentagem = "--";

    if((acertos + erros) > 0){

        porcentagem = Math.round(
            (acertos/(acertos+erros))*100
        );

    }

    return{

        acertos,
        erros,
        pendentes,
        porcentagem

    };

}
