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
var BarrierView = (function (_super) {
    __extends(BarrierView, _super);
    function BarrierView() {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.image.texture = RES.getRes("enemy1_png");
        _this.addChild(_this.image);
        return _this;
    }
    return BarrierView;
}(egret.DisplayObjectContainer));
__reflect(BarrierView.prototype, "BarrierView");
//# sourceMappingURL=BarrierView.js.map