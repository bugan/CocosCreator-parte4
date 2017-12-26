(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PontoGeracaoChefe.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '05bfbkc5RFD04sPpSPRV4+A', 'PontoGeracaoChefe', __filename);
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
        //# sourceMappingURL=PontoGeracaoChefe.js.map
        