(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/GeradorDeChefes.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '90a5774hL1DObQLc5OydMkw', 'GeradorDeChefes', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GeradorDeChefes.js.map
        