// =================================
// RadarBets
// Banco de Dados Local
// =================================

const banco = {

    chave: "RadarBets",

    dados: {

        listas: [],

        carteira: {

            bancaInicial: 0,
            saldo: 0,
            lucro: 0,
            roi: 0,
            winRate: 0,
            apostas: [],
            metas: {}

        }

    },

    carregar: function () {

        const salvo = localStorage.getItem(this.chave);

        if (salvo) {

            this.dados = JSON.parse(salvo);

        }

        // Garantir listas
        if (!this.dados.listas) {

            this.dados.listas = [];

        }

        // Garantir carteira
        if (!this.dados.carteira) {

            this.dados.carteira = {

                bancaInicial: 0,
                saldo: 0,
                lucro: 0,
                roi: 0,
                winRate: 0,
                apostas: [],
                metas: {}

            };

        }

        // Garantir apostas
        if (!this.dados.carteira.apostas) {

            this.dados.carteira.apostas = [];

        }

        // Garantir metas
        if (!this.dados.carteira.metas) {

            this.dados.carteira.metas = {};

        }

    },

    salvar: function () {

        localStorage.setItem(

            this.chave,

            JSON.stringify(this.dados)

        );

    }

};

// Inicia o banco
banco.carregar();
