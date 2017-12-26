(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/AjusteZIndex.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b1aa9t2DJJPw7ZSctESoBun', 'AjusteZIndex', __filename);
// Scripts/AjusteZIndex.js

"use strict";

cc.Class({
    extends: cc.Component,

    update: function update(deltaTime) {
        this.node.zIndex = -this.node.y;
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
        //# sourceMappingURL=AjusteZIndex.js.map
        