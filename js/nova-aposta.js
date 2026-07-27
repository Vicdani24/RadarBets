// =================================
// RadarBets
// Construtor de Bilhetes
// =================================

let selecoes = [];

const btnAdicionar = document.getElementById("btnAdicionar");
const btnSalvar = document.getElementById("btnSalvarBilhete");

document.getElementById("data").value =
new Date().toISOString().split("T")[0];

btnAdicionar.addEventListener("click", adicionarSelecao);

btnSalvar.addEventListener("click", salvarBilhete);

document.getElementById("oddFinal")
.addEventListener("input", atualizarRetorno);

document.getElementById("valor")
.addEventListener("input", atualizarRetorno);

// =================================
// Adicionar seleção
// =================================

function adicionarSelecao(){

    const jogo =
    document.getElementById("jogo").value.trim();

    const campeonato =
    document.getElementById("campeonato").value.trim();

    const mercado =
    document.getElementById("mercado").value;

    const odd =
    parseFloat(document.getElementById("odd").value);

    if(
        jogo=="" ||
        campeonato=="" ||
        mercado=="" ||
        isNaN(odd)
    ){

        alert("Preencha todos os dados da seleção.");

        return;

    }

    selecoes.push({

        jogo,

        campeonato,

        mercado,

        odd

    });

    limparCampos();

    atualizarBilhete();

}

// =================================
// Atualiza bilhete
// =================================

function atualizarBilhete(){

    const area =
    document.getElementById("listaBilhete");

    const qtd =
    document.getElementById("qtdSelecoes");

    qtd.textContent = selecoes.length;

    if(selecoes.length==0){

        area.innerHTML=
        "<p style='text-align:center;'>Nenhuma seleção adicionada.</p>";

        return;

    }

    let html="";

    selecoes.forEach((item,index)=>{

        html+=`

        <div class="card">

        <h3>⚽ ${item.jogo}</h3>

        <p>🏆 ${item.campeonato}</p>

        <p>🎯 ${item.mercado}</p>

        <p>📈 Odd ${item.odd}</p>

        <button
        onclick="removerSelecao(${index})">

        🗑️ Remover

        </button>

        </div>

        `;

    });

    area.innerHTML=html;

}

// =================================
// Remove seleção
// =================================

function removerSelecao(indice){

    selecoes.splice(indice,1);

    atualizarBilhete();

}

// =================================
// Calcula retorno
// =================================

function atualizarRetorno(){

    const odd =
    parseFloat(document.getElementById("oddFinal").value);

    const valor =
    parseFloat(document.getElementById("valor").value);

    let retorno=0;

    if(!isNaN(odd) && !isNaN(valor)){

        retorno=odd*valor;

    }

    document.getElementById("retornoPrevisto")
    .textContent=

    retorno.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

// =================================
// Salvar Bilhete
// =================================

function salvarBilhete(){

    if(selecoes.length==0){

        alert("Adicione pelo menos uma seleção.");

        return;

    }

    const oddFinal =
    parseFloat(document.getElementById("oddFinal").value);

    const valor =
    parseFloat(document.getElementById("valor").value);

    if(
        isNaN(oddFinal) ||
        isNaN(valor)
    ){

        alert("Informe a odd final e o valor da aposta.");

        return;

    }

    const bilhete={

        id:Date.now(),

        data:document.getElementById("data").value,

        selecoes,

        oddFinal,

        valor,

        retorno:Number((valor*oddFinal).toFixed(2)),

        lucro:Number(((valor*oddFinal)-valor).toFixed(2)),

        casa:document.getElementById("casa").value.trim(),

        observacao:document.getElementById("observacao").value.trim(),

        status:"pendente"

    };

    banco.dados.carteira.apostas.push(bilhete);

    banco.salvar();

    alert("✅ Bilhete salvo com sucesso!");

    window.location.href="historico-financeiro.html";

}

// =================================
// Limpa seleção
// =================================

function limparCampos(){

    document.getElementById("jogo").value="";

    document.getElementById("campeonato").value="";

    document.getElementById("mercado").value="";

    document.getElementById("odd").value="";

}
