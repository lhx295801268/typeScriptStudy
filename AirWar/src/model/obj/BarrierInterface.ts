// TypeScript file
/*物体父类*/
class BarrierInterface{
    // 加速度
    a = 0;
    //0是否飞机 1是子弹
    barrierType = 0;
    // 障碍物绑定的视图
    bindLayerObj:egret.DisplayObjectContainer;
    
    constructor(bindObj:egret.DisplayObjectContainer, a:number){
        this.bindLayerObj = bindObj;
        this.a = a;
    }
}