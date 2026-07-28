/// =================================
// RadarBets
// Gestão da Banca
// Carteira
// =================================


// Criar carteira se não existir

if(!banco.dados.carteira){

    banco.dados.carteira = {

        bancaInicial:0,
        saldo:0,
        lucro:0,
        roi:0,
        winRate:0,
        apostas:[],
        metas:{}

    };

    banco.salvar();

}


// Carregar dados

carregarCarteira();




// =================================
// Dashboard Carteira
// =================================

function carregarCarteira(){

    const carteira = banco.dados.carteira;


    let greens = 0;
    let reds = 0;
    let pendentes = 0;


    carteira.apostas.forEach(item=>{


        if(item.status==="green"){

            greens++;

        }
        else if(item.status==="red"){

            reds++;

        }
        else{

            pendentes++;

        }


    });



    const saldo =
    document.getElementById("saldoAtual");


    if(saldo){

        saldo.textContent =
        moeda(carteira.saldo);

    }



    const lucro =
    document.getElementById("lucroTotal");


    if(lucro){

        lucro.textContent =
        moeda(carteira.lucro);

    }



    const roi =
    document.getElementById("roiTotal");


    if(roi){

        roi.textContent =
        carteira.roi.toFixed(1)+"%";

    }



    const win =
    document.getElementById("winRate");


    if(win){

        win.textContent =
        carteira.winRate.toFixed(1)+"%";

    }



    const total =
    document.getElementById("totalApostas");


    if(total){

        total.textContent =
        carteira.apostas.length;

    }



    const campoGreen =
    document.getElementById("greens");


    if(campoGreen){

        campoGreen.textContent =
        greens;

    }



    const campoRed =
    document.getElementById("reds");


    if(campoRed){

        campoRed.textContent =
        reds;

    }



    const campoPendente =
    document.getElementById("pendentes");


    if(campoPendente){

        campoPendente.textContent =
        pendentes;

    }



}




// =================================
// Mostrar / esconder banca inicial
// =================================

function verificarBanca(){

    const card = document.getElementById("cardBancaInicial");

    if(!card) return;

    if(banco.dados.carteira.bancaInicial > 0){

        card.innerHTML = `

            <h2>🏦 Banca Inicial</h2>

            <h1>${moeda(banco.dados.carteira.bancaInicial)}</h1>

            <button id="btnReiniciarBanca">

                🗑️ Reiniciar Banca

            </button>

        `;

        document
            .getElementById("btnReiniciarBanca")
            .onclick = reiniciarBanca;

    }

}


// =================================
// Salvar banca inicial
// =================================


const btnSalvarBanca =
document.getElementById("btnSalvarBanca");


if(btnSalvarBanca){


    btnSalvarBanca.onclick =
    salvarBancaInicial;


}




function salvarBancaInicial(){


    const campo =
    document.getElementById("valorBanca");


    const valor =
    Number(campo.value);



    if(!valor || valor<=0){

        alert(
        "Informe um valor válido."
        );

        return;

    }



    banco.dados.carteira.bancaInicial =
    valor;


    banco.dados.carteira.saldo =
    valor;


    banco.dados.carteira.lucro =
    0;


    banco.dados.carteira.roi =
    0;


    banco.dados.carteira.winRate =
    0;



banco.salvar();

carregarCarteira();

verificarBanca();

alert("✅ Banca cadastrada com sucesso!");

}




// =================================
// Reiniciar banca
// =================================


const btnReiniciar =
document.getElementById("btnReiniciarBanca");


if(btnReiniciar){


    btnReiniciar.onclick =
    reiniciarBanca;


}




function reiniciarBanca(){


    const confirmar =
    confirm(
    "Deseja realmente iniciar uma nova banca? Todos os bilhetes serão apagados."
    );



    if(!confirmar){

        return;

    }



    banco.dados.carteira = {


        bancaInicial:0,

        saldo:0,

        lucro:0,

        roi:0,

        winRate:0,

        apostas:[],

        metas:{}


    };



    banco.salvar();



    carregarCarteira();


    verificarBanca();



    alert(
    "✅ Nova banca iniciada!"
    );


}




// =================================
// Moeda
// =================================

function moeda(valor){


    return Number(valor).toLocaleString(
        "pt-BR",
        {

            style:"currency",

            currency:"BRL"

        }

    );


}


// Executar após carregar

verificarBanca();
