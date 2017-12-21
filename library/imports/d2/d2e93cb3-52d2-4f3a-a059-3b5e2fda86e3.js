"use strict";
cc._RF.push(module, 'd2e93yzUtJPOqBZO14v2obj', 'AjusteZIndex');
// Scripts/AjusteZIndex.js

"use strict";

cc.Class({
    extends: cc.Component,

    update: function update(deltaTime) {
        this.node.zIndex = -this.node.y;
    }
});

cc._RF.pop();