// TypeScript file
class BuuletView extends egret.DisplayObjectContainer{
    image:egret.Bitmap;
    constructor(){
        super();
        this.image = RES.getRes("bullet1_png");
        this.addChild(this.image);
        this.image.x = 0;
        this.image.y = 0;
    }
}