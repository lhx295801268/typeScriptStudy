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
var PlaneObj = (function (_super) {
    __extends(PlaneObj, _super);
    function PlaneObj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaneObj.prototype.PlaneObj = function () {
    };
    return PlaneObj;
}(BarrierInterface));
__reflect(PlaneObj.prototype, "PlaneObj");
