(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/CarregarCena.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b1924U4+i1JHpKsQ6tkf3bK', 'CarregarCena', __filename);
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
        //# sourceMappingURL=CarregarCena.js.map
        