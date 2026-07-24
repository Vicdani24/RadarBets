// =================================
// RadarBets
// Estatísticas
// =================================


const areaEstatisticas = document.getElementById("estatisticas");


if(areaEstatisticas){

    carregarEstatisticas();

}




function carregarEstatisticas(){


    let listas = banco.dados.listas || [];



    let totalJogos = 0;

    let greens = 0;

    let reds = 0;

    let pendentes = 0;



    listas.forEach(lista=>{


        if(!lista.entradas) return;



        lista.entradas.forEach(item=>{


            totalJogos++;



            if(item.status=="green"){

                greens++;

            }

            else if(item.status=="red"){

                reds++;

            }

            else{

                pendentes++;

            }



        });



    });





    let finalizados = greens + reds;


    let aproveitamento = 0;



    if(finalizados > 0){

        aproveitamento =

        (greens / finalizados) * 100;

    }







    let html = `



<div class="card">


<h2>📈 Estatísticas RadarBets</h2>

<p>Desempenho geral das análises</p>


</div>





<div class="card">

<h3>📋 Listas criadas</h3>

<h1>${listas.length}</h1>

</div>





<div class="card">

<h3>⚽ Jogos analisados</h3>

<h1>${totalJogos}</h1>

</div>







<div class="card green">

<h3>🟢 Greens</h3>

<h1>${greens}</h1>

</div>







<div class="card red">

<h3>🔴 Reds</h3>

<h1>${reds}</h1>

</div>







<div class="card pendente">

<h3>🟡 Pendentes</h3>

<h1>${pendentes}</h1>

</div>







<div class="card">

<h3>🎯 Taxa de acerto</h3>

<h1>${aproveitamento.toFixed(1)}%</h1>

</div>



`;





areaEstatisticas.innerHTML = html;



}
