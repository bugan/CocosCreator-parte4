(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/BarraDeVidaInimigo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b5390aqqTNG8LacpIQR6QFY', 'BarraDeVidaInimigo', __filename);
// Scripts/BarraDeVidaInimigo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _barraDeVida: cc.ProgressBar
    },

    onLoad: function onLoad() {
        this._barraDeVida = this.getComponent(cc.ProgressBar);
        this._barraDeVida.progress = 1;
        this.node.parent.on("atualizarVida", this.atualizarInterface, this);
    },


    atualizarInterface: function atualizarInterface(event) {
        var dados = event.detail;
        this._barraDeVida.progress = dados.vidaAtual / dados.vidaMaxima;
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
        //# sourceMappingURL=BarraDeVidaInimigo.js.map
        