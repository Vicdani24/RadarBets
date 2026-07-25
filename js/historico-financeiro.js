// =================================
// RadarBets
// Histórico Financeiro
// =================================

const area = document.getElementById("listaApostas");

if(area){

    carregarHistoricoFinanceiro();

}

function carregarHistoricoFinanceiro(){

    area.innerHTML="";

    if(
        !banco.dados.carteira ||
        !banco.dados.carteira.apostas ||
        banco.dados.carteira.apostas.length===0
    ){

        area.innerHTML=`

        <div class="card">

            <h2>📭 Nenhuma aposta cadastrada</h2>

            <p>Cadastre sua primeira aposta.</p>

        </div>

        `;

        return;

    }

    const apostas=[...banco.dados.carteira.apostas].reverse();

    apostas.forEach(aposta=>{

        const indiceOriginal =
            banco.dados.carteira.apostas.findIndex(
                a=>a.id===aposta.id
            );

        let emoji="🟡";
        let classe="";

        if(aposta.status==="green"){
            emoji="🟢";
            classe="green";
        }

        if(aposta.status==="red"){
            emoji="🔴";
            classe="red";
        }

        area.innerHTML+=`

        <div class="card jogo ${classe}">

            <h2>${emoji} ${aposta.jogo}</h2>

            <p>🏆 ${aposta.campeonato}</p>

            <p>🎯 ${aposta.mercado}</p>

            <p>📈 Odd ${aposta.odd}</p>

            <p>💵 Apostado: R$ ${aposta.valor.toFixed(2)}</p>

            <p>Status: <strong>${aposta.status}</strong></p>

            <div class="linha">

                <button
                class="btn-green"
                onclick="alterarResultado(${indiceOriginal},'green')">

                🟢

                </button>

                <button
                class="btn-red"
                onclick="alterarResultado(${indiceOriginal},'red')">

                🔴

                </button>

                <button
                class="btn-pendente"
                onclick="alterarResultado(${indiceOriginal},'pendente')">

                🟡

                </button>

            </div>

        </div>

        `;

    });

}

function alterarResultado(indice,status){

    banco.dados.carteira.apostas[indice].status=status;

    recalcularCarteira();

    banco.salvar();

    carregarHistoricoFinanceiro();

}

function recalcularCarteira(){

    const carteira=banco.dados.carteira;

    let greens=0;
    let reds=0;

    let saldo=carteira.bancaInicial;

    carteira.apostas.forEach(aposta=>{

        if(aposta.status==="green"){

            greens++;

            saldo+=aposta.lucro;

        }

        if(aposta.status==="red"){

            reds++;

            saldo-=aposta.valor;

        }

    });

    carteira.saldo=saldo;

    carteira.lucro=saldo-carteira.bancaInicial;

    if(carteira.bancaInicial>0){

        carteira.roi=
        (carteira.lucro/carteira.bancaInicial)*100;

    }else{

        carteira.roi=0;

    }

    if((greens+reds)>0){

        carteira.winRate=
        (greens/(greens+reds))*100;

    }else{

        carteira.winRate=0;

    }

}
