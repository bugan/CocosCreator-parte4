cc.Class({
    extends: cc.Component,

    start () {
        let eventoAdicao = new cc.Event.EventCustom("adicionarAoGeradorDoChefe", true);
        eventoAdicao.setUserData({node: this.node});
        this.node.dispatchEvent(eventoAdicao);
    },
});
