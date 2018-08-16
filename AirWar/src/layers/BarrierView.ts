class BarrierView extends egret.DisplayObjectContainer{
    image:egret.Bitmap = new egret.Bitmap();
    constructor(){
        super();
        this.image.texture = RES.getRes("enemy1_png");
        this.addChild(this.image);
    }

}