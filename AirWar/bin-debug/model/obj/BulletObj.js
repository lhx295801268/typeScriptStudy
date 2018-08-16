/*// 子弹类*/
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
var BulletObj = (function (_super) {
    __extends(BulletObj, _super);
    function BulletObj(bindObj, a, bulletType) {
        var _this = _super.call(this, bindObj, a) || this;
        //子弹类型 0普通子弹
        _this.bulletType = 0;
        _this.bulletType = bulletType;
        return _this;
    }
    return BulletObj;
}(BarrierInterface));
__reflect(BulletObj.prototype, "BulletObj");
//# sourceMappingURL=BulletObj.js.map