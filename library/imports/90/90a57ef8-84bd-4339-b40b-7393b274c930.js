"use strict";
cc._RF.push(module, '90a5774hL1DObQLc5OydMkw', 'GeradorDeChefes');
// Scripts/GeradorDeChefes.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        chefePrefab: cc.Prefab,
        alvo: cc.Node,
        _pontosParaGerar: {
            type: cc.Node,
            default: []
        }
    },

    onLoad: function onLoad() {
        cc.director.getScene().on("adicionarAoGeradorDoChefe", this.adicionarAoGeradorDoChefe, this);
        this.schedule(this.gerar, this.tempoParaGerar);
    },


    adicionarAoGeradorDoChefe: function adicionarAoGeradorDoChefe(evento) {
        var ponto = evento.getUserData().node;
        this._pontosParaGerar.push(ponto);
    },

    gerar: function gerar() {
        var ponto = this.buscarPontoMaisDistante();
        var zumbi = cc.instantiate(this.chefePrefab);
        zumbi.parent = ponto.parent;
        zumbi.position = ponto.position;
    },

    buscarPontoMaisDistante: function buscarPontoMaisDistante() {

        var maiorDistancia = 0;
        var selecionado = 0;

        for (var i = 0; i < this._pontosParaGerar.length; i++) {
            var pontoAtual = this._pontosParaGerar[i];
            var vetorDistancia = pontoAtual.position.sub(this.alvo.position);
            var distancia = vetorDistancia.magSqr();
            if (distancia > maiorDistancia) {
                selecionado = i;
                maiorDistancia = distancia;
            }
        }
        return this._pontosParaGerar[selecionado];
    }
});

cc._RF.pop();