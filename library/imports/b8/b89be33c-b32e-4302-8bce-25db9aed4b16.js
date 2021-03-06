"use strict";
cc._RF.push(module, 'b89beM8sy5DAovOJdua7UsW', 'ControleDeAnimacao');
// Scripts/ControleDeAnimacao.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        anguloDiagonal: {
            type: cc.Float,
            default: 0,
            slide: true,
            range: [0, 45]
        },
        _animacao: cc.Animation,
        _senoMinimo: cc.Float,
        _cossenoMinimo: cc.Float
    },

    onLoad: function onLoad() {
        this._animacao = this.getComponent(cc.Animation);
        this._animacao.play("AndarBaixo");

        this._cossenoMinimo = Math.cos(cc.degreesToRadians(90 - this.anguloDiagonal));
        this._senoMinimo = Math.sin(cc.degreesToRadians(this.anguloDiagonal));
    },

    mudaAnimacao: function mudaAnimacao(direcao, estado) {
        var proximaAnimacao = estado;

        var angulo = this.calcularAngulo(direcao);

        var cosseno = Math.cos(angulo);
        cosseno = Math.abs(cosseno);

        var seno = Math.sin(angulo);
        seno = Math.abs(seno);

        if (cosseno >= this._cossenoMinimo) {
            proximaAnimacao += this.verificarEixo(direcao.x, "Direita", "Esquerda");
        }
        if (seno >= this._senoMinimo) {
            proximaAnimacao += this.verificarEixo(direcao.y, "Cima", "Baixo");
        }

        if (!this.animacaoEstaTocando(proximaAnimacao)) {
            this._animacao.play(proximaAnimacao);
        }
    },

    animacaoEstaTocando: function animacaoEstaTocando(animacao) {
        return this._animacao.getAnimationState(animacao).isPlaying;
    },

    verificarEixo: function verificarEixo(valorEixo, sentidoPositivo, sentidoNegativo) {
        if (valorEixo > 0) {
            return sentidoPositivo;
        } else if (valorEixo < 0) {
            return sentidoNegativo;
        }
    },

    calcularAngulo: function calcularAngulo(direcao) {
        var anguloEmRadianos = Math.atan2(direcao.y, direcao.x);
        return anguloEmRadianos;
    }

});

cc._RF.pop();