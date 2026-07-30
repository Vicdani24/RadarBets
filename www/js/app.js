// =================================
// RadarBets
// Funções principais
// =================================


console.log("RadarBets iniciado");


// cria ID único

function gerarId(){

    return Date.now();

}



// busca uma lista

function buscarLista(id){

    return banco.dados.listas.find(

        lista=>lista.id==id

    );

}



// salva alterações

function atualizarBanco(){

    banco.salvar();

}
