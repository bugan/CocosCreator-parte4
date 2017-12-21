"use strict";
cc._RF.push(module, '9a15etGJ0lL+LAN32mhIjjZ', 'KitMedico');
// Scripts/KitMedico.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        recuperar: cc.Float
    },

    onload: function onload() {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(outro) {
        outro.node.emit("RecuperarVida", { cura: this.recuperar });
        this.node.destroy();
    }

});

cc._RF.pop();