"use strict";
cc._RF.push(module, 'b89beM8sy5DAovOJdua7UsW', 'ControleDeAnimacao');
// Scripts/ControleDeAnimacao.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _animacao: cc.Animation
    },

    onLoad: function onLoad() {
        this._animacao = this.getComponent(cc.Animation);
        this._animacao.play("AndarBaixo");
    },

    mudaAnimacao: function mudaAnimacao(direcao, estado) {
        var proximaAnimacao = estado;

        if (direcao.x > 0) {
            proximaAnimacao += "Direita";
        } else if (direcao.x < 0) {
            proximaAnimacao += "Esquerda";
        }

        if (direcao.y > 0) {
            proximaAnimacao += "Cima";
        } else if (direcao.y < 0) {
            proximaAnimacao += "Baixo";
        }

        if (!this._animacao.getAnimationState(proximaAnimacao).isPlaying) {
            this._animacao.play(proximaAnimacao);
        }
    }

});

cc._RF.pop();