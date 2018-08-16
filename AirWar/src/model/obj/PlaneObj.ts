/*// 飞机类*/
class PlaneObj extends BarrierInterface{
	// 是否为玩家飞机
	isPlayer:boolean = false;


	constructor(bindObj:egret.DisplayObjectContainer, a:number, isPlayer:boolean){
		super(bindObj, a);
		this.isPlayer = isPlayer;
	}
}
