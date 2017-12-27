(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Inimigo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db00e+DKKdPjp7paiDvHbQ3', 'Inimigo', __filename);
// Scripts/Inimigo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        dano: cc.Float,
        vida: cc.Float,
        distanciaAtaque: cc.Float,
        distanciaPerseguir: cc.Float,
        tempoVagar: cc.Float,

        _atacando: false,
        _direcaoVagar: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _tempoRestanteParaVagar: cc.Float,
        _morto: false,
        _vidaAtual: false,
        _eventoMorte: cc.Event.EventCustom
    },

    onLoad: function onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this.audioMorte = this.getComponent(cc.AudioSource);

        this._eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this._eventoMorte.setUserData(this.node);

        this.alvo = cc.find("Personagens/Personagem");
        this.node.on("SofrerDano", this.sofrerDano, this);

        this._direcaoVagar = cc.Vec2.UP;
        this._tempoRestanteParaVagar = this.tempoVagar;

        this.inicializa();
    },

    reuse: function reuse() {
        this.inicializa();
    },

    update: function update(deltaTime) {

        if (!this._morto && !this._atacando) {
            var direcaoAlvo = this.alvo.position.sub(this.node.position);

            var distancia = direcaoAlvo.mag();

            if (distancia < this.distanciaAtaque) {
                this.iniciarAtaque(direcaoAlvo);
            } else if (distancia < this.distanciaPerseguir) {
                this.andar(direcaoAlvo);
            } else {
                this.vagar(deltaTime);
            }
        }
    },

    inicializa: function inicializa() {
        this._morto = false;
        this._atacando = false;
        this._vidaAtual = this.vida;
        this.node.emit("atualizarVida", { vidaAtual: this._vidaAtual, vidaMaxima: this.vida });
    },

    iniciarAtaque: function iniciarAtaque(direcaoAlvo) {
        this._controleAnimacao.mudaAnimacao(direcaoAlvo, "Ataque");
        this._atacando = true;
    },

    atacar: function atacar() {
        this._atacando = false;
        this.alvo.emit("SofreDano", { dano: this.dano });
    },

    andar: function andar(direcao) {
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
    },

    vagar: function vagar(deltaTime) {
        this._tempoRestanteParaVagar -= deltaTime;

        if (this._tempoRestanteParaVagar < 0) {
            this._direcaoVagar = new cc.Vec2(Math.random() - .5, Math.random() - .5);
            this._tempoRestanteParaVagar = this.tempoVagar;
        }

        this.andar(this._direcaoVagar);
    },

    sofrerDano: function sofrerDano(evento) {
        this._vidaAtual -= evento.detail.dano;

        this.node.emit("atualizarVida", { vidaAtual: this._vidaAtual, vidaMaxima: this.vida });
        if (this._vidaAtual < 0) {
            this.morrer();
        }
    },

    morrer: function morrer() {
        this._morto = true;
        var direcao = cc.Vec2.UP.mul(-1);
        this._controleAnimacao.mudaAnimacao(direcao, "Morte");
    },

    destruirZumbi: function destruirZumbi() {
        this.node.emit("SoltarItem");
        this.node.dispatchEvent(this._eventoMorte);
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
        //# sourceMappingURL=Inimigo.js.map
        