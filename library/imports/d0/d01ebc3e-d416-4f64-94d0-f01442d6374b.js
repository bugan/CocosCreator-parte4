"use strict";
cc._RF.push(module, 'd01ebw+1BZPZJTQ8BRC1jdL', 'PreloadCena');
// Scripts/PreloadCena.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        cena: cc.String
    },

    onLoad: function onLoad() {
        cc.director.preloadScene(this.cena);
    }
});

cc._RF.pop();