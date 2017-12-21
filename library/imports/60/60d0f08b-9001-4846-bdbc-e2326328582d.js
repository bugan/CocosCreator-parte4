"use strict";
cc._RF.push(module, '60d0fCLkAFIRr284jJjKFgt', 'GeradorDeInimigos');
// Scripts/GeradorDeInimigos.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab: cc.Prefab,
        raio: cc.Float,
        _distanciaMinima: cc.Float
    },

    onLoad: function onLoad() {
        this.schedule(this.gerar, this.tempoParaGerar);
        var resolucao = cc.director.getVisibleSize();
        var metadeDaLargura = resolucao.width / 2;
        this._distanciaMinima = metadeDaLargura;
    },
    gerar: function gerar() {
        if (this.possoGerar()) {
            var posicao = this.calcularPosicao();
            var zumbi = cc.instantiate(this.inimigoPrefab);
            zumbi.parent = this.node.parent;
            zumbi.position = posicao;
        }
    },

    calcularPosicao: function calcularPosicao() {
        var alcance = new cc.Vec2(Math.random() - 0.5, Math.random() - 0.5);
        alcance = alcance.normalize();
        alcance = alcance.mul(this.raio * Math.random());

        var posicao = this.node.position.add(alcance);
        return posicao;
    },
    possoGerar: function possoGerar() {
        var distanciaAtual = this.node.position.sub(cc.Camera.main.node.position);
        distanciaAtual = distanciaAtual.mag();
        var longeOSuficiente = distanciaAtual > this._distanciaMinima;
        return longeOSuficiente;
    }

});

cc._RF.pop();