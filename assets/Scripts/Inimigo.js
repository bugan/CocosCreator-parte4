cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        dano : cc.Float,
        tempoAtaque : cc.Float,
        _cronometroAtaque : cc.Float,
        _movimentacao : cc.Component,
        _controleAnimacao : cc.Component,
        _gameOver : cc.Node,
        distanciaAtaque : cc.Float,

    },

    onLoad: function () {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this.audioMorte = this.getComponent(cc.AudioSource);

        this.alvo = cc.find("Personagens/Personagem");
        this.node.on("SofrerDano", this.morrer, this);
        this._cronometroAtaque = this.tempoAtaque;
    },

    update: function (deltaTime) {
        let direcao = this.alvo.position.sub(this.node.position);
        let distancia = direcao.mag();
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();
        
        this._cronometroAtaque -= deltaTime;
        
        if(distancia < this.distanciaAtaque && this._cronometroAtaque < 0){
            this.alvo.emit("SofreDano", {dano : this.dano});
            this._cronometroAtaque = this.tempoAtaque;
        }
    },

    morrer : function(){
        let eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        this.node.destroy();

    }






});
