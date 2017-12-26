cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        chefePrefab: cc.Prefab,
        alvo: cc.Node,
        _pontosParaGerar: {
            type: cc.Node,
            default: [],
        },
    },

    onLoad() {
        cc.director.getScene().on("adicionarAoGeradorDoChefe", this.adicionarPonto, this);
        this.schedule(this.gerar, this.tempoParaGerar);
    },

    adicionarPonto: function(evento){
        let ponto = evento.getUserData().node;
        this._pontosParaGerar.push(ponto);
    },

    gerar: function () {
        let ponto = this.buscarPontoMaisDistante();
        let zumbi = cc.instantiate(this.chefePrefab);
        zumbi.parent = ponto.parent;
        zumbi.position = ponto.position;
    },

    buscarPontoMaisDistante: function () {
      
        let maiorDistancia = 0;
        let selecionado = 0;
        let pontoAtual;
        let vetorDistancia;
        let distancia;
        for (let i = 0; i < this._pontosParaGerar.length; i++) {
            
            pontoAtual = this._pontosParaGerar[i];
            
            vetorDistancia = pontoAtual.position.sub(this.alvo.position);
            distancia = vetorDistancia.magSqr();
            if (distancia > maiorDistancia) {
                selecionado = i;
                maiorDistancia = distancia;
            }
        }
        return this._pontosParaGerar[selecionado];
    }
});
