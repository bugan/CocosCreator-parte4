
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
            default: [],
        }
    },
    onLoad : function(){
        this.node.on("SoltarItem", this.soltarItem, this);
    },

    soltarItem: function () {
        if(this.deveSoltar()){
            let item = this.sorteiaItem();
            item.parent = this.node.parent;
            item.position = this.node.position;
        }
    },

    deveSoltar: function(){
        return Math.random() < this.chanceDeSoltar;
    },

    sorteiaItem : function(){
        let index = Math.floor(Math.random() * this.itens.length);
        let item = cc.instantiate(this.itens[index]);
        return item;
    }
    
});
