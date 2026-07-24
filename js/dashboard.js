// ===============================
// Dashboard RadarBets
// ===============================

const resumo=document.getElementById("resumo");

if(resumo){

    carregarDashboard();

}

function carregarDashboard(){

    let listas=banco.dados.listas;

    let totalListas=listas.length;

    let totalJogos=0;

    let greens=0;

    let reds=0;

    let pendentes=0;

    listas.forEach(lista=>{

        lista.entradas.forEach(jogo=>{

            totalJogos++;

            if(jogo.status=="green") greens++;

            else if(jogo.status=="red") reds++;

            else pendentes++;

        });

    });

    let decididos=greens+reds;

    let aproveitamento=0;

    if(decididos>0){

        aproveitamento=((greens/decididos)*100).toFixed(1);

    }

    resumo.innerHTML=`

<div class="card">

<h2>📊 Dashboard</h2>

<p>📚 Análises: <strong>${totalListas}</strong></p>

<p>⚽ Jogos: <strong>${totalJogos}</strong></p>

<p class="status-green">🟢 Greens: ${greens}</p>

<p class="status-red">🔴 Reds: ${reds}</p>

<p class="status-pendente">🟡 Pendentes: ${pendentes}</p>

<p><strong>🎯 Aproveitamento: ${aproveitamento}%</strong></p>

</div>

`;

}
