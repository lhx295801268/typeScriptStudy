var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var PlayerPlaneView = (function (_super) {
    __extends(PlayerPlaneView, _super);
    function PlayerPlaneView() {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.image.texture = RES.getRes("hero1_png");
        _this.addChild(_this.image);
        return _this;
    }
    return PlayerPlaneView;
}(egret.DisplayObjectContainer));
__reflect(PlayerPlaneView.prototype, "PlayerPlaneView");
//# sourceMappingURL=PlayerPlaneView.js.map