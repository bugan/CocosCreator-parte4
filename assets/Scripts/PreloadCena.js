
cc.Class({
    extends: cc.Component,

    properties: {
        cena : cc.String,
    },

    onLoad () {
        cc.director.preloadScene(this.cena);     
    },

    
});
