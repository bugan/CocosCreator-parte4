(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PreloadCena.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd01ebw+1BZPZJTQ8BRC1jdL', 'PreloadCena', __filename);
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
        //# sourceMappingURL=PreloadCena.js.map
        