cc.Class({
    extends: cc.Component,

    properties: {
        anguloDiagonal: {
            type: cc.Float,
            default: 0,
            slide: true,
            range: [0, 45],
        },
        _animacao: cc.Animation,
        _senoMinimo: cc.Float,
        _cossenoMinimo: cc.Float,
    },

    onLoad: function () {
        this._animacao = this.getComponent(cc.Animation);
        this._animacao.play("AndarBaixo");

        this._cossenoMinimo = Math.cos( this.grausParaRadianos(90 - this.anguloDiagonal) );
        this._senoMinimo = Math.sin( this.grausParaRadianos(this.anguloDiagonal) );

    },

    mudaAnimacao: function (direcao, estado) {
        let proximaAnimacao = estado;
        
        let angulo = this.calcularAngulo(direcao);

        let cosseno = Math.cos(angulo);
        cosseno = Math.abs(cosseno);

        let seno = Math.sin(angulo);
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

    animacaoEstaTocando: function (animacao) {
        return this._animacao.getAnimationState(animacao).isPlaying
    },

    verificarEixo: function (valorEixo, sentidoPositivo, sentidoNegativo) {
        if (valorEixo > 0) {
            return sentidoPositivo;
        } else if (valorEixo < 0) {
            return sentidoNegativo;
        }
    },

    calcularAngulo: function (direcao) {
        let anguloEmRadianos = Math.atan2(direcao.y, direcao.x);
        return anguloEmRadianos;
    },

    grausParaRadianos : function(anguloEmRadianos){
        let anguloEmGraus = anguloEmRadianos * (Math.PI / 180);
        return anguloEmGraus;
    }

});
