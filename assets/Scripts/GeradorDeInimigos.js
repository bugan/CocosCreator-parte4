cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        raio : cc.Float,
        _distanciaMinima : cc.Float,
        _pool: cc.Component,
    },

    onLoad: function () {
        this.schedule(this.gerar, this.tempoParaGerar);
        let resolucao = cc.director.getVisibleSize();
        let metadeDaLargura = resolucao.width /2;
        this._distanciaMinima = metadeDaLargura;
    },

    start: function(){
        this.node.on("receberInstanciaPool", this.receberInstancia, this);
        let buscarPool = new cc.Event.EventCustom("BuscarInstanciaPoolZumbis", true);
        buscarPool.setUserData({node: this.node});
        this.node.dispatchEvent(buscarPool);
    },

    receberInstancia: function(evento){
        this._pool = evento.detail.instancia;
    },

    gerar : function(){
        if(this.possoGerar()){
            let posicao = this.calcularPosicao();
            let zumbi = this._pool.novoZumbi();
            if(zumbi != null){
                zumbi.parent = this.node.parent;
                zumbi.position = posicao;
            }
        }
    },

    calcularPosicao : function(){
        let alcance = new cc.Vec2(Math.random() -0.5 , Math.random() -0.5);
        alcance = alcance.normalize();
        alcance = alcance.mul(this.raio * Math.random());

        let posicao = this.node.position.add(alcance);
        return posicao;
    },
    
    possoGerar : function(){
        let distanciaAtual = this.node.position.sub(cc.Camera.main.node.position);
        distanciaAtual = distanciaAtual.mag();
        let longeOSuficiente = distanciaAtual > this._distanciaMinima;
        return longeOSuficiente;
    }

});
