// TypeScript file


/*行为处理类*/
class BehaviorDispose{
    score:number = 0;

    // 显示的layer
    suLayer:egret.DisplayObjectContainer;
    // 玩家飞机
    playerPlane : PlaneObj;
    //生成子弹的计时器
    private createBulletTimer:egret.Timer;
    playerBulletList:Array<BulletObj> = new Array<BulletObj>();
    // 游戏结束回调
    private gameOverBlock:Function;
    /*子弹生成回调*/
    bulletCreateBlock:Function;

// 创建障碍物属性
    //敌方飞机列表
    enemyPlaneList:Array<PlaneObj>;
    //关数等级
    level:number = 1;
    // 最大关数
    private maxLevel:number = 10;
    //最大循环时间间隔2s
    private maxRunloopTime = 2000;
    //计时器 生成障碍物的计时器
    createBarrierTimer:egret.Timer;
    // 是否停止创建障碍物
    isStopCreateBarrier:boolean = false;
    //创建一个新的障碍物的回调
    private createNpcPlaneSucCallback:Function;//(newNpcPlane: BarrierInterface) => void;

    // 障碍物删除回调
    private npcPlaneDisappearCallback:Function;//(newNpcPlane: BarrierInterface) => void;

    constructor(suLayer:egret.DisplayObjectContainer, createNpcPlaneSucCallback:Function, npcPlaneDisappearCallback:Function, gameOverBlock:Function){
        this.suLayer = suLayer;
        this.createNpcPlaneSucCallback = createNpcPlaneSucCallback;
        this.npcPlaneDisappearCallback = npcPlaneDisappearCallback;
        this.gameOverBlock = gameOverBlock;
        
        this.enemyPlaneList = new Array<PlaneObj>();

        this.playerPlane = new PlaneObj((new PlayerPlaneView()), 0, true);
        this.playerPlane.barrierType = 0;
        this.playerPlane.bindLayerObj.addEventListener(egret.Event.ADDED_TO_STAGE, this.judgePlayerPlaneCrash, this);
    }

    /*随机生成物体*/
    createDownThings():BarrierInterface{
        //目前只有敌方飞机
        let resultObj = new PlaneObj((new BarrierView()), 0, false)
        return (resultObj);
    }

    /*随机生成物体下落方位*/
    randomStartLocation():number[]{
        let maxWidth:number = this.suLayer.width;
        let rand = Math.random();
        let resultX = (0+Math.round(rand * maxWidth));
        let resultNumbers:number[] = [resultX, 0];
        
        return resultNumbers;
    }

    /*玩家飞机方位位置移动更新*/
    updatePlayerLocation(curLayer:egret.DisplayObjectContainer):PlaneObj{
        if(this.playerPlane.bindLayerObj == curLayer){
            this.playerPlane.bindLayerObj = curLayer;
        }
        return this.playerPlane;
    }

    /*
        判定两个物体是否进行了碰撞
    */
    judgeSrcAndDesCrash(srcObj:BarrierInterface, desObj:BarrierInterface):boolean{
        
        if(null == srcObj.bindLayerObj || null == desObj.bindLayerObj){
            return false;
        }
        let srcBounds:egret.Rectangle = new egret.Rectangle(srcObj.bindLayerObj.x, srcObj.bindLayerObj.y, srcObj.bindLayerObj.width, srcObj.bindLayerObj.height);
        let desBounds:egret.Rectangle = new egret.Rectangle(desObj.bindLayerObj.x, desObj.bindLayerObj.y, desObj.bindLayerObj.width, desObj.bindLayerObj.height);
        let resultValue:egret.Rectangle = srcBounds.intersection(desBounds);
        let resultBoolean:boolean = !((resultValue.height == 0) && (resultValue.width == 0) &&( resultValue.top == 0) && (resultValue.bottom == 0));
        
        return resultBoolean;
    }

    /*判定玩家飞机是否碰触障碍物*/
    judgePlayerPlaneCrash():boolean{
        for(let index = 0; index < this.enemyPlaneList.length; index++){
            let tempNPC:BarrierInterface = this.enemyPlaneList[index];
            if(this.judgeSrcAndDesCrash(this.playerPlane, tempNPC)){
                this.enemyPlaneList.splice(index, 1);
                this.gameOverBlock(tempNPC);
                return true;
            }
        }
        return false;
    }


    /*子弹操作*/
    /*子弹生成循环计时器生成*/
    startCreateBulletTimer(){
        if(null != this.createBulletTimer){
            this.createBulletTimer.stop();
            this.createBulletTimer = null;
        }
        this.createBulletTimer = new egret.Timer(500, 0);
        this.createBulletTimer.addEventListener(egret.TimerEvent.TIMER, (param:egret.TimerEvent)=>{
            let tempBullet:BulletObj = new BulletObj((new BuuletView()), 0, 1);
            this.playerBulletList.push(tempBullet);
            this.bulletCreateBlock(tempBullet);
        }, this);
    }

    /*删除子弹*/
    deleteBullet(desBullet:BulletObj){
        for(let index = 0;index < this.playerBulletList.length; index++){
            let temp:BulletObj = this.playerBulletList[index];
            if(temp == desBullet){
                this.playerBulletList.splice(index, 1);
                break;
            }
        }
    }

    /*遍历目标子弹是否和地方飞机碰撞*/
    bulletHitEnemyPlane(desBullet:BulletObj):boolean{
        for(let pos = 0; pos < this.playerBulletList.length; pos++){
            let temp:BulletObj = this.playerBulletList[pos];
            if(this.judgeSrcAndDesCrash(temp, desBullet)){
                (<BarrierView>temp.bindLayerObj).image = RES.getRes("enemy1_down3_png");
                this.deleteNpcView(temp.bindLayerObj);
                this.npcPlaneDisappearCallback(temp);
                return true;
            }
        }
        return false;
    }

    /*runloop执行障碍物生成 然后回调给layer*/
    startCreateBarrierTimer(){
        if(null != this.createBarrierTimer){
            this.stopCreateBarrierTimer();
        }
        let runloopTime = 2000;//默认每2s生成一个障碍物
        if(this.level > this.maxLevel){
            runloopTime = 100;
        }else{
            runloopTime = this.maxRunloopTime - (this.level * 100);
        }
        this.createBarrierTimer = new egret.Timer(runloopTime, 0);
        this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER, ()=>{
            
            this.createBarrierTimerRunLoopMethod();

        }, this);
        this.createBarrierTimer.start();
    }

    /*停止创建障碍物计时器*/
    stopCreateBarrierTimer(){
        if(this.createBarrierTimer != null){
            this.createBarrierTimer.stop();
            this.createBarrierTimer = null;
        }        
    }

    /*循环创建障碍物函数*/
    createBarrierTimerRunLoopMethod(){
        if(this.isStopCreateBarrier){
            this.stopCreateBarrierTimer();
            return;
        }
        let newDownThingLocation:number[] = this.randomStartLocation();
        
        let newNpcPlane:PlaneObj = <PlaneObj>(this.createDownThings());//因为目前只有飞机所以直接强制类型转换
        newNpcPlane.barrierType = 0;
        newNpcPlane.isPlayer = false;
        newNpcPlane.bindLayerObj.x = newDownThingLocation[0];
        newNpcPlane.bindLayerObj.y = newDownThingLocation[1];

        this.enemyPlaneList.push(newNpcPlane);
        //回调
        this.createNpcPlaneSucCallback(newNpcPlane);
    }

    deleteNpcView(desView:egret.DisplayObjectContainer){
        for(let index = 0; index < this.enemyPlaneList.length; index++){
            let tempObj = this.enemyPlaneList[index];
            if(tempObj.bindLayerObj == desView){
                this.enemyPlaneList.splice(index,1);
                tempObj = null;
                break;
            }
        }
    }
}