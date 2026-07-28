// =================================
// RadarBets
// Gráficos
// =================================

function desenharGraficoResultados(greens, reds, pendentes){

    const grafico =
    document.getElementById("graficoResultados");

    if(!grafico) return;

    const total = greens + reds + pendentes;

    if(total===0){

        grafico.innerHTML="<p>Nenhum dado.</p>";

        return;

    }

    const pGreen =
    (greens/total)*100;

    const pRed =
    (reds/total)*100;

    const pPendente =
    (pendentes/total)*100;

    grafico.innerHTML=`

        <div class="barraGrafico">

            <div
            class="parteGreen"
            style="width:${pGreen}%">

            </div>

            <div
            class="parteRed"
            style="width:${pRed}%">

            </div>

            <div
            class="partePendente"
            style="width:${pPendente}%">

            </div>

        </div>

        <p>

        🟢 ${greens}
        &nbsp;&nbsp;
        🔴 ${reds}
        &nbsp;&nbsp;
        🟡 ${pendentes}

        </p>

    `;

}



function desenharGraficoBanca(){

    const grafico =
    document.getElementById("graficoBanca");

    if(!grafico) return;

    const carteira =
    banco.dados.carteira;

    let saldo =
    carteira.bancaInicial;

    let html="";

    carteira.apostas.forEach(aposta=>{

        if(aposta.status==="green"){

            saldo+=aposta.lucro;

        }

        if(aposta.status==="red"){

            saldo-=aposta.valor;

        }

        html+=`

        <div class="linhaGrafico">

            <span>${aposta.jogo}</span>

            <strong>

            ${saldo.toLocaleString("pt-BR",{

                style:"currency",

                currency:"BRL"

            })}

            </strong>

        </div>

        `;

    });

    if(html===""){

        html="<p>Nenhum bilhete cadastrado.</p>";

    }

    grafico.innerHTML=html;

}
