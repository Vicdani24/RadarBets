// =================================
// RadarBets
// Nova Análise
// =================================


const botaoSalvar = document.getElementById("btnSalvar");


if(botaoSalvar){


botaoSalvar.addEventListener("click", salvarLista);


}



function salvarLista(){


    const titulo = document.getElementById("titulo").value.trim();

    const campeonato = document.getElementById("campeonato").value.trim();

    const data = document.getElementById("data").value;

    const texto = document.getElementById("lista").value.trim();



    if(texto===""){


        alert("Cole sua lista antes de salvar.");

        return;


    }



    const lista = {


        id: gerarId(),

        titulo: titulo || "Sem título",

        campeonato: campeonato || "Não informado",

        data: data,

        entradas: []

    };



    texto.split("\n").forEach(linha=>{


        linha = linha.trim();


        if(linha!==""){


            lista.entradas.push({


                jogo: linha,

                status:"pendente"


            });


        }


    });



    banco.dados.listas.push(lista);



    atualizarBanco();



    alert("Análise salva com sucesso!");



    window.location.href="historico.html";



}

