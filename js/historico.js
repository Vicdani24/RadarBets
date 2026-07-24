// =================================
// RadarBets
// Histórico de Análises
// =================================


const areaLista = document.getElementById("listas");


if(areaLista){

    carregarHistorico();

}



function carregarHistorico(){


    areaLista.innerHTML="";



    const listas = banco.dados.listas;



    if(listas.length===0){


        areaLista.innerHTML=`

        <div class="card">

        <h2>📭 Nenhuma análise</h2>

        <p>Crie sua primeira análise.</p>

        </div>

        `;


        return;


    }



    listas.reverse().forEach(lista=>{


        areaLista.innerHTML += `


        <div class="card">


        <h2>📋 ${lista.titulo}</h2>


        <p>🏆 ${lista.campeonato}</p>


        <p>📅 ${lista.data || "Sem data"}</p>


        <p>⚽ Jogos: ${lista.entradas.length}</p>



        <button onclick="abrirLista(${lista.id})">

        📂 Abrir Análise

        </button>



        </div>


        `;



    });



}




function abrirLista(id){



    localStorage.setItem(

        "listaAtual",

        id

    );



    window.location.href="lista.html";



}
