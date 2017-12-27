let Teclado = require("Teclado");
cc.Class({
    extends: cc.Component,

    properties: {
        tiro: cc.Prefab,
        vidaMaxima: cc.Float,
        _posicaoTiro: cc.Node,
        _vidaAtual: cc.Float,
        _direcao: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,
        _audioTiro: cc.AudioSource,
        _eventoAlteraVida: cc.Event.EventCustom,
        _eventoMorreu: cc.Event.EventCustom,
        _direcaoMouse: cc.Vec2,
    },

    onLoad: function () {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._audioTiro = this.getComponent(cc.AudioSource);
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.calcularDirecaoMouse, this);
        this.node.on("SofreDano", this.sofrerDano, this);
        this.node.on("RecuperarVida", this.recuperarVida, this);
        this._vidaAtual = this.vidaMaxima;
        this._eventoAlteraVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        this._eventoMorreu = new cc.Event.EventCustom("JogoAcabou", true);
        this._posicaoTiro = this.node.children[0];
        this._direcaoMouse = cc.Vec2.UP.mul(-1);
    },

    update: function (deltaTime) {
        this.verificarTeclado();
        this.andar();
        this.atualizarAnimacao();

    },

    andar: function () {
        if (this._direcao.mag() != 0) {
            this._movimentacao.setDirecao(this._direcao);
            this._movimentacao.andarPraFrente();  
        }
    },

    atualizarAnimacao: function(){
        this._controleAnimacao.mudaAnimacao(this._direcaoMouse, this.estadoAtual());
    },
    
    verificarTeclado: function () {
        this._direcao = cc.Vec2.ZERO;

        if (Teclado.estaPressionada(cc.KEY.a)) {
            this._direcao.x -= 1;
        }
        if (Teclado.estaPressionada(cc.KEY.d)) {
            this._direcao.x += 1;
        }

        if (Teclado.estaPressionada(cc.KEY.s)) {
            this._direcao.y -= 1;
        }
        if (Teclado.estaPressionada(cc.KEY.w)) {
            this._direcao.y += 1;
        }
    },

    sofrerDano: function (evento) {
        this._vidaAtual -= evento.detail.dano;

        this.dispararEventos(this._eventoAlteraVida, { vidaAtual: this._vidaAtual, vidaMaxima: this.vidaMaxima });
        if (this._vidaAtual < 0) {
            this.dispararEventos(this._eventoMorreu);
        }
    },

    recuperarVida: function (evento) {
        this._vidaAtual += parseFloat(evento.detail.cura);
        this._vidaAtual = Math.min(this._vidaAtual, this.vidaMaxima);
        this.dispararEventos(this._eventoAlteraVida, { vidaAtual: this._vidaAtual, vidaMaxima: this.vidaMaxima });
    },

    dispararEventos: function (evento, dados) {
        evento.setUserData(dados);
        this.node.dispatchEvent(evento);
    },

    estadoAtual: function(){
        let estado;
        if (this._direcao.mag() == 0) {
            estado = "Parado";
        } else {
            estado = "Andar";
        }
        return estado;
    },

    calcularDirecaoMouse: function (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        posicaoMouse = this._canvas.convertToNodeSpaceAR(posicaoMouse);
        let posicaoJogadora = cc.Camera.main.node.convertToNodeSpaceAR(this.node.position);

        this._direcaoMouse = posicaoMouse.sub(posicaoJogadora);
    },

    atirar: function (event) {
        let disparo = cc.instantiate(this.tiro);
        disparo.getComponent("Tiro").iniciliza(this.node.parent, this.node.position.add(this._posicaoTiro.position), this._direcaoMouse);
        this._audioTiro.play();
    },

});
