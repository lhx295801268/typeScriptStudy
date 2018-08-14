var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 物体父类
var BarrierInterface = (function () {
    function BarrierInterface() {
    }
    BarrierInterface.prototype.BarrierInterface = function () {
    };
    return BarrierInterface;
}());
__reflect(BarrierInterface.prototype, "BarrierInterface");
