// =================================
// RadarBets
// Detalhes do Bilhete
// =================================

const area = document.getElementById("conteudoBilhete");

if(area){

    carregarBilhete();

}

function carregarBilhete(){

    const indice = localStorage.getItem("bilheteAtual");

    if(indice === null){

        area.innerHTML = `

        <div class="card">

            <h2>❌ Bilhete não encontrado</h2>

        </div>

        `;

        return;

    }

    const bilhete = banco.dados.carteira.apostas[indice];

    if(!bilhete){

        area.innerHTML = `

        <div class="card">

            <h2>❌ Bilhete não encontrado</h2>

        </div>

        `;

        return;

    }

    let html = `

    <div class="card">

        <h2>🎫 Bilhete #${bilhete.id}</h2>

        <p>📅 ${formatarData(bilhete.data)}</p>

        <p>⚽ ${bilhete.selecoes.length} seleção(ões)</p>

        <p>📈 Odd Final:
        <strong>${bilhete.oddFinal}</strong></p>

        <p>💵 Valor Apostado:
        <strong>${moeda(bilhete.valor)}</strong></p>

        <p>💰 Retorno Previsto:
        <strong>${moeda(bilhete.retorno)}</strong></p>

        <p>🏦 Casa:
        <strong>${bilhete.casa || "-"}</strong></p>

        <p>📊 Status:
        <strong>${bilhete.status}</strong></p>

    </div>

    `;

    if(bilhete.observacao){

        html += `

        <div class="card">

            <h2>📝 Observações</h2>

            <p>${bilhete.observacao}</p>

        </div>

        `;

    }

    html += `

    <div class="card">

        <h2>⚽ Seleções do Bilhete</h2>

    `;

    bilhete.selecoes.forEach((item, i)=>{

        html += `

        <div class="card jogo">

            <h3>${i+1}ª Seleção</h3>

            <p><strong>⚽ Jogo:</strong> ${item.jogo}</p>

            <p><strong>🏆 Campeonato:</strong> ${item.campeonato}</p>

            <p><strong>🎯 Mercado:</strong> ${item.mercado}</p>

            <p><strong>📈 Odd:</strong> ${item.odd}</p>

        </div>

        `;

    });

    html += `

    </div>

    `;

    area.innerHTML = html;

}

function moeda(valor){

    return Number(valor).toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

function formatarData(data){

    if(!data) return "-";

    const partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}
