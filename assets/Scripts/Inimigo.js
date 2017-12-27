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
        _eventoMorte: cc.Event.EventCustom,
    },

    onLoad: function () {
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

    reuse: function () {
        this.inicializa();
    },

    update: function (deltaTime) {

        if (!this._morto && !this._atacando) {
            let direcaoAlvo = this.alvo.position.sub(this.node.position);

            let distancia = direcaoAlvo.mag();

            if (distancia < this.distanciaAtaque) {
                this.iniciarAtaque(direcaoAlvo);
            } else if (distancia < this.distanciaPerseguir) {
                this.andar(direcaoAlvo);
            } else {
                this.vagar(deltaTime);
            }
        }
    },

    inicializa: function () {
        this._morto = false;
        this._atacando = false;
        this._vidaAtual = this.vida;
        this.node.emit("atualizarVida", { vidaAtual: this._vidaAtual, vidaMaxima: this.vida });
    },

    iniciarAtaque: function (direcaoAlvo) {
        this._controleAnimacao.mudaAnimacao(direcaoAlvo, "Ataque");
        this._atacando = true;
    },

    atacar: function () {
        this._atacando = false;
        this.alvo.emit("SofreDano", { dano: this.dano });
    },

    andar: function (direcao) {
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
    },

    vagar: function (deltaTime) {
        this._tempoRestanteParaVagar -= deltaTime;

        if (this._tempoRestanteParaVagar < 0) {
            this._direcaoVagar = new cc.Vec2(Math.random() - .5, Math.random() - .5);
            this._tempoRestanteParaVagar = this.tempoVagar;
        }

        this.andar(this._direcaoVagar);
    },

    sofrerDano: function (evento) {
        this._vidaAtual -= evento.detail.dano;

        this.node.emit("atualizarVida", { vidaAtual: this._vidaAtual, vidaMaxima: this.vida });
        if (this._vidaAtual < 0) {
            this.morrer();
        }
    },

    morrer: function () {
        this._morto = true;
        let direcao = cc.Vec2.UP.mul(-1);
        this._controleAnimacao.mudaAnimacao(direcao, "Morte");
    },

    destruirZumbi: function () {
        this.node.emit("SoltarItem");
        this.node.dispatchEvent(this._eventoMorte);
    }

});
