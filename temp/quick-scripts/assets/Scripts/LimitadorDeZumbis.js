(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/LimitadorDeZumbis.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f34acYPPEhKdrYPSNMarY8n', 'LimitadorDeZumbis', __filename);
// Scripts/LimitadorDeZumbis.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        limiteDeInimigos: cc.Float,
        prefabInimigo: cc.Prefab,
        _pool: cc.NodePool
    },

    onLoad: function onLoad() {
        this._pool = new cc.NodePool("Inimigo");
        var inimigo = void 0;
        for (var i = 0; i < this.limiteDeInimigos; i++) {
            inimigo = cc.instantiate(this.prefabInimigo);
            this._pool.put(inimigo);
        }
        cc.director.getScene().on("BuscarInstanciaPoolZumbis", this.retornarInstancia, this);
        cc.director.getScene().on("ZumbiMorreu", this.devolverZumbi, this);
    },


    retornarInstancia: function retornarInstancia(evento) {
        var outroNode = evento.getUserData().node;
        outroNode.emit("receberInstanciaPool", { instancia: this });
    },

    novoZumbi: function novoZumbi() {
        return this._pool.get();
    },

    devolverZumbi: function devolverZumbi(evento) {
        var zumbi = evento.getUserData();
        this._pool.put(zumbi);
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
        //# sourceMappingURL=LimitadorDeZumbis.js.map
        