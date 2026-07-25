// =================================
// RadarBets
// Nova Aposta
// =================================

const btnSalvar = document.getElementById("btnSalvarAposta");

if (btnSalvar) {

    btnSalvar.addEventListener("click", salvarAposta);

    // Define a data de hoje automaticamente
    document.getElementById("data").value =
        new Date().toISOString().split("T")[0];

}

function salvarAposta() {

    const data = document.getElementById("data").value;

    const jogo = document.getElementById("jogo").value.trim();

    const campeonato = document.getElementById("campeonato").value.trim();

    const mercado = document.getElementById("mercado").value;

    const odd = parseFloat(document.getElementById("odd").value);

    const valor = parseFloat(document.getElementById("valor").value);

    const casa = document.getElementById("casa").value.trim();

    const observacao = document.getElementById("observacao").value.trim();

    if (
        jogo === "" ||
        campeonato === "" ||
        mercado === "" ||
        isNaN(odd) ||
        isNaN(valor)
    ) {

        alert("Preencha todos os campos obrigatórios.");

        return;

    }

    if (!banco.dados.carteira) {

        banco.dados.carteira = {

            saldo: 0,
            bancaInicial: 0,
            lucro: 0,
            roi: 0,
            winRate: 0,
            apostas: [],
            metas: {}

        };

    }

    const aposta = {

        id: Date.now(),

        data,

        jogo,

        campeonato,

        mercado,

        odd,

        valor,

        retorno: Number((valor * odd).toFixed(2)),

        lucro: Number(((valor * odd) - valor).toFixed(2)),

        casa,

        observacao,

        status: "pendente"

    };

    banco.dados.carteira.apostas.push(aposta);

    banco.salvar();

    alert("✅ Aposta cadastrada com sucesso!");

    window.location.href = "carteira.html";

}
