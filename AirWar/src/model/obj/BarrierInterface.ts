// TypeScript file
/*物体父类*/
class BarrierInterface{
    // 物体x坐标
    x = 0;
    // 物体y坐标
    y = 0;
    // 宽
    width = 0;
    // 高
    height = 0;
    // 加速度
    a = 0;
    // 障碍物绑定的视图
    bindLayerObj:egret.DisplayObjectContainer;
    
    constructor(frameX:number, frameY:number, frameWidth:number, frameHeight:number, a:number){
        this.x = frameX;
        this.y = frameY;
        this.width = frameWidth;
        this.height = frameHeight;
        this.a = a;
    }
}