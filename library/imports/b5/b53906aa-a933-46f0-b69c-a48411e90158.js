"use strict";
cc._RF.push(module, 'b5390aqqTNG8LacpIQR6QFY', 'BarraDeVidaInimigo');
// Scripts/BarraDeVidaInimigo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _barraDeVida: cc.ProgressBar
    },

    onLoad: function onLoad() {
        this._barraDeVida = this.getComponent(cc.ProgressBar);
        this._barraDeVida.progress = 1;
        this.node.parent.on("atualizarVida", this.atualizarInterface, this);
    },


    atualizarInterface: function atualizarInterface(event) {
        var dados = event.detail;
        this._barraDeVida.progress = dados.vidaAtual / dados.vidaMaxima;
    }

});

cc._RF.pop();