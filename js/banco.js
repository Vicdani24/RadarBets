// =================================
// RadarBets
// Banco de Dados Local
// =================================

const banco = {

    chave:"RadarBets",

    dados:{

        listas:[]

    },


    carregar:function(){

        const salvo = localStorage.getItem(this.chave);


        if(salvo){

            this.dados = JSON.parse(salvo);

        }


        if(!this.dados.listas){

            this.dados.listas=[];

        }

    },


    salvar:function(){

        localStorage.setItem(

            this.chave,

            JSON.stringify(this.dados)

        );

    }

};


// inicia banco

banco.carregar();

