(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ControleDeAnimacao.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b89beM8sy5DAovOJdua7UsW', 'ControleDeAnimacao', __filename);
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

        this._cossenoMinimo = Math.cos(this.grausParaRadianos(90 - this.anguloDiagonal));
        this._senoMinimo = Math.sin(this.grausParaRadianos(this.anguloDiagonal));
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
    },

    grausParaRadianos: function grausParaRadianos(anguloEmRadianos) {
        var anguloEmGraus = anguloEmRadianos * (Math.PI / 180);
        return anguloEmGraus;
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
        //# sourceMappingURL=ControleDeAnimacao.js.map
        