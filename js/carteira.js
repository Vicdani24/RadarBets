// =================================
// RadarBets
// Gestão da Banca
// Dashboard
// =================================

if (!banco.dados.carteira) {

    banco.dados.carteira = {

        bancaInicial: 0,
        saldo: 0,
        lucro: 0,
        roi: 0,
        winRate: 0,
        apostas: [],
        metas: {}

    };

    banco.salvar();

}

carregarCarteira();

function carregarCarteira() {

    const carteira = banco.dados.carteira;

    let greens = 0;
    let reds = 0;
    let pendentes = 0;

    carteira.apostas.forEach(aposta => {

        if (aposta.status === "green") {

            greens++;

        } else if (aposta.status === "red") {

            reds++;

        } else {

            pendentes++;

        }

    });

    document.getElementById("saldoAtual").textContent =
        moeda(carteira.saldo);

    document.getElementById("lucroTotal").textContent =
        moeda(carteira.lucro);

    document.getElementById("roiTotal").textContent =
        carteira.roi.toFixed(1) + "%";

    document.getElementById("winRate").textContent =
        carteira.winRate.toFixed(1) + "%";

    if(document.getElementById("totalApostas")){

        document.getElementById("totalApostas").textContent =
            carteira.apostas.length;

        document.getElementById("greens").textContent =
            greens;

        document.getElementById("reds").textContent =
            reds;

        document.getElementById("pendentes").textContent =
            pendentes;

    }

}

function moeda(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}
