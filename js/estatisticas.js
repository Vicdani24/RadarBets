// =================================
// RadarBets
// Estatísticas
// =================================

const areaEstatisticas = document.getElementById("estatisticas");

if (areaEstatisticas) {

    carregarEstatisticas();

}

function carregarEstatisticas() {

    const listas = banco.dados.listas || [];

    const carteira = banco.dados.carteira || {

        bancaInicial: 0,
        saldo: 0,
        lucro: 0,
        roi: 0,
        winRate: 0,
        apostas: []

    };

    let totalJogos = 0;

    let greens = 0;

    let reds = 0;

    let pendentes = 0;

    listas.forEach(lista => {

        if (!lista.entradas) return;

        lista.entradas.forEach(item => {

            totalJogos++;

            if (item.status === "green") {

                greens++;

            } else if (item.status === "red") {

                reds++;

            } else {

                pendentes++;

            }

        });

    });

    let aproveitamento = 0;

    if ((greens + reds) > 0) {

        aproveitamento =
            (greens / (greens + reds)) * 100;

desenharGraficoResultados(
    greens,
    reds,
    pendentes
);

desenharGraficoBanca();

    }

    // =============================
    // Estatísticas Financeiras
    // =============================

    let maiorOdd = 0;

    let maiorLucro = 0;

    let sequenciaGreen = 0;

    let maiorSequenciaGreen = 0;

    let sequenciaRed = 0;

    let maiorSequenciaRed = 0;

    carteira.apostas.forEach(aposta => {

        if (Number(aposta.odd) > maiorOdd) {

            maiorOdd = Number(aposta.odd);

        }

        if (Number(aposta.lucro) > maiorLucro) {

            maiorLucro = Number(aposta.lucro);

        }

        if (aposta.status === "green") {

            sequenciaGreen++;

            sequenciaRed = 0;

            if (sequenciaGreen > maiorSequenciaGreen) {

                maiorSequenciaGreen = sequenciaGreen;

            }

        }

        else if (aposta.status === "red") {

            sequenciaRed++;

            sequenciaGreen = 0;

            if (sequenciaRed > maiorSequenciaRed) {

                maiorSequenciaRed = sequenciaRed;

            }

        }

        else {

            sequenciaGreen = 0;

            sequenciaRed = 0;

        }

    });

    document.getElementById("maiorOdd").textContent =
        maiorOdd ? maiorOdd.toFixed(2) : "--";

    document.getElementById("maiorLucro").textContent =
        "R$ " + maiorLucro.toFixed(2);

    document.getElementById("seqGreen").textContent =
        maiorSequenciaGreen;

    document.getElementById("seqRed").textContent =
        maiorSequenciaRed;

    areaEstatisticas.innerHTML = `

<div class="card">

<h2>📊 Resumo Geral</h2>

</div>

<div class="card">

<p>📋 Listas Criadas</p>

<h1>${listas.length}</h1>

</div>

<div class="card">

<p>⚽ Jogos Analisados</p>

<h1>${totalJogos}</h1>

</div>

<div class="card green">

<p>🟢 Greens</p>

<h1>${greens}</h1>

</div>

<div class="card red">

<p>🔴 Reds</p>

<h1>${reds}</h1>

</div>

<div class="card pendente">

<p>🟡 Pendentes</p>

<h1>${pendentes}</h1>

</div>

<div class="card">

<p>🎯 Aproveitamento</p>

<h1>${aproveitamento.toFixed(1)}%</h1>

</div>

<div class="card">

<h2>💰 Carteira</h2>

<p>💵 Saldo Atual:
<strong>${moeda(carteira.saldo)}</strong></p>

<p>📈 Lucro:
<strong>${moeda(carteira.lucro)}</strong></p>

<p>📊 ROI:
<strong>${carteira.roi.toFixed(1)}%</strong></p>

<p>🏆 Win Rate:
<strong>${carteira.winRate.toFixed(1)}%</strong></p>

<p>🎯 Bilhetes:
<strong>${carteira.apostas.length}</strong></p>

</div>

`;

}

function moeda(valor) {

    return Number(valor).toLocaleString(

        "pt-BR",

        {

            style: "currency",

            currency: "BRL"

        }

    );

}
