(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/SoltarItens.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cc245ptCQlCrZh+DgyeVG+d', 'SoltarItens', __filename);
// Scripts/SoltarItens.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        chanceDeSoltar: {
            type: cc.Float,
            default: 0,
            range: [0, 1],
            slide: true
        },
        itens: {
            type: cc.Prefab,
            default: []
        }
    },
    onLoad: function onLoad() {
        this.node.on("SoltarItem", this.soltarItem, this);
    },

    soltarItem: function soltarItem() {
        if (this.deveSoltar()) {
            var item = this.sorteiaItem();
            item.parent = this.node.parent;
            item.position = this.node.position;
        }
    },

    deveSoltar: function deveSoltar() {
        return Math.random() < this.chanceDeSoltar;
    },

    sorteiaItem: function sorteiaItem() {
        var index = Math.floor(Math.random() * this.itens.length);
        var item = cc.instantiate(this.itens[index]);
        return item;
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
        //# sourceMappingURL=SoltarItens.js.map
        