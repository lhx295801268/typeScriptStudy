/*// 子弹类*/

class BulletObj extends BarrierInterface{
	//子弹类型 0普通子弹
	bulletType = 0;

	constructor(frameX:number, frameY:number, frameWidth:number, frameHeight:number, a:number, bulletType:number){
		super(frameX, frameY, frameWidth, frameHeight, a);
		this.bulletType = bulletType;
	}
}
