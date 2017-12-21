"use strict";
cc._RF.push(module, 'db00e+DKKdPjp7paiDvHbQ3', 'Inimigo');
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
        _cronometroVagar: cc.Float,
        _morto: false,
        _vidaAtual: false
    },

    onLoad: function onLoad() {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this.audioMorte = this.getComponent(cc.AudioSource);

        this.alvo = cc.find("Personagens/Personagem");
        this.node.on("SofrerDano", this.sofrerDano, this);

        this._direcaoVagar = cc.Vec2.UP;
        this._cronometroVagar = this.tempoVagar;

        this._vidaAtual = this.vida;
    },

    update: function update(deltaTime) {

        if (!this._morto && !this._atacando) {
            var direcaoAlvo = this.alvo.position.sub(this.node.position);
            console.log(direcaoAlvo);
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
        this._cronometroVagar -= deltaTime;

        if (this._cronometroVagar < 0) {
            this._direcaoVagar = new cc.Vec2(Math.random() - .5, Math.random() - .5);
            this._cronometroVagar = this.tempoVagar;
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
        var eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        this.node.emit("SoltarItem");
        this.node.destroy();
    }

});

cc._RF.pop();