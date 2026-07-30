// =================================
// RadarBets
// Análises por Data
// =================================


const areaLista = document.getElementById("listas");


if(areaLista){

    carregarData();

}



function carregarData(){


    areaLista.innerHTML = "";



    const dataSelecionada = 
    localStorage.getItem("dataSelecionada");



    if(!dataSelecionada){


        areaLista.innerHTML = `

        <div class="card">

            <h2>❌ Data não encontrada</h2>

            <p>Nenhuma data foi selecionada.</p>

        </div>

        `;


        return;


    }




    if(
        !banco ||
        !banco.dados ||
        !banco.dados.listas
    ){


        areaLista.innerHTML = `

        <div class="card">

            <h2>❌ Erro no banco</h2>

            <p>Banco de dados não carregado.</p>

        </div>

        `;


        return;


    }




    const listas = banco.dados.listas.filter(

        lista => lista.data === dataSelecionada

    );





    areaLista.innerHTML += `


    <h2 class="tituloData">

        📅 ${formatarData(dataSelecionada)}

    </h2>


    `;




    if(listas.length === 0){


        areaLista.innerHTML += `


        <div class="card">


            <h2>📭 Nenhuma análise encontrada</h2>


            <p>

            Não existem listas nesta data.

            </p>


        </div>


        `;


        return;


    }




    listas.forEach(lista=>{


        let greens = 0;

        let reds = 0;

        let pendentes = 0;



        lista.entradas.forEach(item=>{


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





        let aproveitamento = "--";



        if((greens + reds) > 0){


            aproveitamento = Math.round(

                (greens / (greens + reds)) * 100

            ) + "%";


        }





        areaLista.innerHTML += `


        <div class="card">


            <h2>

            📋 ${lista.titulo}

            </h2>



            <p>

            🏆 ${lista.campeonato}

            </p>



            <p>

            ⚽ Jogos:

            ${lista.entradas.length}

            </p>



            <p>

            📊 Aproveitamento:

            <strong>

            ${aproveitamento}

            </strong>

            </p>




            <p>


            🟢 ${greens}

            &nbsp;&nbsp;


            🔴 ${reds}

            &nbsp;&nbsp;


            🟡 ${pendentes}



            </p>




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





function formatarData(data){


    if(!data){

        return "-";

    }



    const partes = data.split("-");



    return (

        partes[2] +

        "/" +

        partes[1] +

        "/" +

        partes[0]

    );


}
