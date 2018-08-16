var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
/*物体父类*/
var BarrierInterface = (function () {
    function BarrierInterface(bindObj, a) {
        // 加速度
        this.a = 0;
        //0是否飞机 1是子弹
        this.barrierType = 0;
        this.bindLayerObj = bindObj;
        this.a = a;
    }
    return BarrierInterface;
}());
__reflect(BarrierInterface.prototype, "BarrierInterface");
//# sourceMappingURL=BarrierInterface.js.map