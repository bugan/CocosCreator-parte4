"use strict";
cc._RF.push(module, '05bfbkc5RFD04sPpSPRV4+A', 'PontoGeracaoChefe');
// Scripts/PontoGeracaoChefe.js

"use strict";

cc.Class({
    extends: cc.Component,

    start: function start() {
        var eventoAdicao = new cc.Event.EventCustom("adicionarAoGeradorDoChefe", true);
        eventoAdicao.setUserData({ node: this.node });
        this.node.dispatchEvent(eventoAdicao);
    }
});

cc._RF.pop();