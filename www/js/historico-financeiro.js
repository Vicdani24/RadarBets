// =================================
// RadarBets
// Histórico Financeiro
// Bilhetes
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

            <h2>📭 Nenhum bilhete cadastrado</h2>

            <p>Cadastre seu primeiro bilhete.</p>

        </div>

        `;

        return;

    }

    const bilhetes=[...banco.dados.carteira.apostas].reverse();

    bilhetes.forEach(bilhete=>{

        const indiceOriginal=
        banco.dados.carteira.apostas.findIndex(
            b=>b.id===bilhete.id
        );

        let emoji="🟡";
        let classe="";

        if(bilhete.status==="green"){

            emoji="🟢";
            classe="green";

        }

        if(bilhete.status==="red"){

            emoji="🔴";
            classe="red";

        }

        area.innerHTML+=`

        <div class="card jogo ${classe}">

            <h2>${emoji} Bilhete #${bilhete.id}</h2>

            <p>📅 ${formatarData(bilhete.data)}</p>

            <p>⚽ ${bilhete.selecoes.length} seleção(ões)</p>

            <p>📈 Odd Final:
            <strong>${bilhete.oddFinal}</strong></p>

            <p>💵 Valor:
            <strong>${moeda(bilhete.valor)}</strong></p>

            <p>💰 Retorno:
            <strong>${moeda(bilhete.retorno)}</strong></p>

            <p>Status:
            <strong>${bilhete.status}</strong></p>

            <button
            onclick="abrirBilhete(${indiceOriginal})">

            👁️ Ver Bilhete

            </button>

            <br><br>

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

                <button
                class="btn-excluir"
                onclick="excluirAposta(${indiceOriginal})">

                🗑️

                </button>

            </div>

        </div>

        `;

    });

}

function abrirBilhete(indice){

    localStorage.setItem(
        "bilheteAtual",
        indice
    );

    window.location.href="bilhete.html";

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

    carteira.apostas.forEach(bilhete=>{

        if(bilhete.status==="green"){

            greens++;

            saldo+=bilhete.lucro;

        }

        if(bilhete.status==="red"){

            reds++;

            saldo-=bilhete.valor;

        }

    });

    carteira.saldo=saldo;

    carteira.lucro=
    saldo-carteira.bancaInicial;

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

function excluirAposta(indice){

    if(!confirm(
        "Deseja excluir este bilhete?"
    )) return;

    banco.dados.carteira.apostas.splice(indice,1);

    recalcularCarteira();

    banco.salvar();

    carregarHistoricoFinanceiro();

}

function moeda(valor){

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}

function formatarData(data){

    if(!data) return "-";

    const partes=data.split("-");

    return partes[2]+"/"+partes[1]+"/"+partes[0];

}
