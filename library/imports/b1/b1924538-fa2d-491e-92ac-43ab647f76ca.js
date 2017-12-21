"use strict";
cc._RF.push(module, 'b1924U4+i1JHpKsQ6tkf3bK', 'CarregarCena');
// Scripts/CarregarCena.js

"use strict";

cc.Class({
    extends: cc.Component,

    lerCenaBotao: function lerCenaBotao(evento, cena) {
        cc.director.loadScene(cena);
    },
    lerCenaAnimacao: function lerCenaAnimacao(cena) {
        cc.director.loadScene(cena);
    }
});

cc._RF.pop();