"use strict";
cc._RF.push(module, 'cc245ptCQlCrZh+DgyeVG+d', 'SoltarItens');
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
        if (this.podeSoltar()) {
            var item = this.sorteiaItem();
            item.parent = this.node.parent;
            item.position = this.node.position;
        }
    },

    podeSoltar: function podeSoltar() {
        return Math.random() < this.chanceDeSoltar;
    },

    sorteiaItem: function sorteiaItem() {
        var index = Math.floor(Math.random() * this.itens.length);
        var item = cc.instantiate(this.itens[index]);
        return item;
    }

});

cc._RF.pop();