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
/*// 飞机类*/
var PlaneObj = (function (_super) {
    __extends(PlaneObj, _super);
    function PlaneObj(bindObj, a, isPlayer) {
        var _this = _super.call(this, bindObj, a) || this;
        // 是否为玩家飞机
        _this.isPlayer = false;
        _this.isPlayer = isPlayer;
        return _this;
    }
    return PlaneObj;
}(BarrierInterface));
__reflect(PlaneObj.prototype, "PlaneObj");
//# sourceMappingURL=PlaneObj.js.map