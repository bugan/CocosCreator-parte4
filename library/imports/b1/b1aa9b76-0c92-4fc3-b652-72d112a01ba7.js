"use strict";
cc._RF.push(module, 'b1aa9t2DJJPw7ZSctESoBun', 'AjusteZIndex');
// Scripts/AjusteZIndex.js

"use strict";

cc.Class({
    extends: cc.Component,

    update: function update(deltaTime) {
        this.node.zIndex = -this.node.y;
    }
});

cc._RF.pop();