
cc.Class({
    extends: cc.Component,

    lerCenaBotao(evento, cena){
        cc.director.loadScene(cena);
    },

    lerCenaAnimacao(cena){
        cc.director.loadScene(cena);
    }
    
});
