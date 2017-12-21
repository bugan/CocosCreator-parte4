
cc.Class({
    extends: cc.Component,

    properties: {
        recuperar: cc.Float,
    },

    onload: function () {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function (outro) {
        outro.node.emit("RecuperarVida", {cura: this.recuperar});
        this.node.destroy();
    }
    
});
