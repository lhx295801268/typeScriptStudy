/*// 子弹类*/

class BulletObj extends BarrierInterface{
	//子弹类型 0普通子弹
	bulletType = 0;

	constructor(bindObj:egret.DisplayObjectContainer, a:number, bulletType:number){
		super(bindObj, a);
		this.bulletType = bulletType;
	}
}
