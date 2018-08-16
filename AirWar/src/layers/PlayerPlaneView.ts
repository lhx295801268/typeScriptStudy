// TypeScript file
class PlayerPlaneView extends egret.DisplayObjectContainer{
    private image:egret.Bitmap = new egret.Bitmap();
    constructor(){
        super();
        this.image.texture = RES.getRes("hero1_png");
        this.addChild(this.image);
    }
}