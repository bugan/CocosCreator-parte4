(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/KitMedico.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a15etGJ0lL+LAN32mhIjjZ', 'KitMedico', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=KitMedico.js.map
        