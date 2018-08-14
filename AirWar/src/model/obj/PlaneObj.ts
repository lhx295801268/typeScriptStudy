/*// 飞机类*/
class PlaneObj extends BarrierInterface{
	// 是否为玩家飞机
	isPlayer:boolean = false;


	constructor(frameX:number, frameY:number, frameWidth:number, frameHeight:number, a:number, isPlayer:boolean){
		super(frameX, frameY, frameWidth, frameHeight, a);
		this.isPlayer = isPlayer;
	}
}
