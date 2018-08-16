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
var BuuletView = (function (_super) {
    __extends(BuuletView, _super);
    function BuuletView() {
        var _this = _super.call(this) || this;
        _this.image = RES.getRes("bullet1_png");
        _this.addChild(_this.image);
        _this.image.x = 0;
        _this.image.y = 0;
        return _this;
    }
    return BuuletView;
}(egret.DisplayObjectContainer));
__reflect(BuuletView.prototype, "BuuletView");
//# sourceMappingURL=BulletView.js.map