// TypeScript file


/*行为处理类*/
class BehaviorDispose{
    

    // 显示的layer
    suLayer:egret.DisplayObjectContainer;
    // 玩家飞机
    playerPlane : PlaneObj;
    playerBulletList:Array<BulletObj> = new Array<BulletObj>();

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
    public createNpcPlaneSucCallback: (newNpcPlane: BarrierInterface) => void;
    // 障碍物删除回调
    public npcPlaneDisappearCallback: (disappearNpcPlane: BarrierInterface) => void;

    constructor(suLayer:egret.DisplayObjectContainer){
        this.suLayer = suLayer;
        this.enemyPlaneList = new Array<PlaneObj>();
    }

    /*随机生成物体*/
    createDownThings():BarrierInterface{
        //目前只有敌方飞机
        let resultObj = new PlaneObj(0, 0, 10, 10, 0, false)
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
    updatePlayerLocation(x:number, y:number):PlaneObj{
        this.playerPlane.x = x;
        this.playerPlane.y = y;
        
        return this.playerPlane;
    }

    /*判定两个物体是否进行了碰撞*/
    judgeSrcAndDesCrash(srcObj:BarrierInterface, desObj:BarrierInterface):boolean{
        if(null == srcObj || null == desObj){
            return false;
        }

        let srcXWidth = srcObj.x + srcObj.width;
        let srcYHeight = srcObj.y + srcObj.height;

        let desXWidth = desObj.x + desObj.width;
        let desYHeight = desObj.y + desObj.height;

        if(((srcObj.x >= desObj.x) && (srcObj.x < desXWidth)) || ((srcXWidth > desObj.x) && (desObj.x > srcObj.x))){
            if((srcObj.y <= desObj.y) && (srcYHeight >= desObj.y)){
                return true;
            }else if((srcObj.y > desObj.y) && (srcObj.y < desYHeight)){
                return true;
            }
        }

        return false;
    }
    /*判定玩家飞机是否碰触障碍物*/
    judgePlayerPlaneCrash():boolean{
        for(let index = 0; index < this.enemyPlaneList.length; index++){
            let tempNPC:BarrierInterface = this.enemyPlaneList[index];
            if(this.judgeSrcAndDesCrash(tempNPC, this.playerPlane)){
                return true;
            }
        }
        return false;
    }

    /*判定障碍物是否消失*/
    judgeNPCPlayerCrash(){
        let willDeleteList:Array<BarrierInterface> = new Array<BarrierInterface>();
        for(let index = 0; index < this.enemyPlaneList.length; index++){
            let tempNPC:BarrierInterface = this.enemyPlaneList[index];
            //判断是否出了边框
            if((tempNPC.x + tempNPC.width)<0 || (tempNPC.x > this.suLayer.width)){
                //除了边框消失 回调
                this.npcPlaneDisappearCallback(tempNPC);
                willDeleteList.push(tempNPC);
                continue;
            }else if(tempNPC.y > this.suLayer.height){
                this.npcPlaneDisappearCallback(tempNPC);
                willDeleteList.push(tempNPC);
                continue;
            }
            //判断是否撞击子弹
            for(let pos = 0; pos < this.playerBulletList.length; pos++){
                let tempObj:BarrierInterface = <BarrierInterface>this.playerBulletList[pos];
                if(this.judgeSrcAndDesCrash(tempObj, tempNPC)){
                    this.npcPlaneDisappearCallback(tempNPC);
                    willDeleteList.push(tempNPC);
                    continue;
                }
            }
        }
        
        for(let tempNum in willDeleteList){
            
        }
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
        this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER, this.createBarrierTimerRunLoopMethod, this);
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

        newNpcPlane.x = newDownThingLocation[0];
        newNpcPlane.y = newDownThingLocation[1];

        this.enemyPlaneList.push(newNpcPlane);
        //回调
        this.createNpcPlaneSucCallback(newNpcPlane);
    }
}