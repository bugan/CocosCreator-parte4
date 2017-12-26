cc.Class({
    extends: cc.Component,

    properties: {
        limiteDeInimigos: cc.Float,
        prefabInimigo: cc.Prefab,
        _pool: cc.NodePool,
    },

    onLoad() {
        this._pool = new cc.NodePool("Inimigo");
        let inimigo;
        for(let i=0 ; i<this.limiteDeInimigos ; i++){
            inimigo = cc.instantiate(this.prefabInimigo);
            this._pool.put(inimigo);
        }
        cc.director.getScene().on("BuscarInstanciaPoolZumbis", this.retornarInstancia, this);
        cc.director.getScene().on("ZumbiMorreu", this.devolverZumbi, this);
    },

    retornarInstancia: function(evento){
        let outroNode = evento.getUserData().node;
        outroNode.emit("receberInstanciaPool", {instancia: this});
    },

    novoZumbi: function(){
        return this._pool.get();
    },

    devolverZumbi: function(evento){
        let zumbi = evento.getUserData();
        this._pool.put(zumbi);
    }

});
