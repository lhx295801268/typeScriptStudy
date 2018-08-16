// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*行为处理类*/
var BehaviorDispose = (function () {
    function BehaviorDispose(suLayer, createNpcPlaneSucCallback, npcPlaneDisappearCallback, gameOverBlock) {
        this.score = 0;
        this.playerBulletList = new Array();
        //关数等级
        this.level = 1;
        // 最大关数
        this.maxLevel = 10;
        //最大循环时间间隔2s
        this.maxRunloopTime = 2000;
        // 是否停止创建障碍物
        this.isStopCreateBarrier = false;
        this.suLayer = suLayer;
        this.createNpcPlaneSucCallback = createNpcPlaneSucCallback;
        this.npcPlaneDisappearCallback = npcPlaneDisappearCallback;
        this.gameOverBlock = gameOverBlock;
        this.enemyPlaneList = new Array();
        this.playerPlane = new PlaneObj((new PlayerPlaneView()), 0, true);
        this.playerPlane.barrierType = 0;
        this.playerPlane.bindLayerObj.addEventListener(egret.Event.ADDED_TO_STAGE, this.judgePlayerPlaneCrash, this);
    }
    /*随机生成物体*/
    BehaviorDispose.prototype.createDownThings = function () {
        //目前只有敌方飞机
        var resultObj = new PlaneObj((new BarrierView()), 0, false);
        return (resultObj);
    };
    /*随机生成物体下落方位*/
    BehaviorDispose.prototype.randomStartLocation = function () {
        var maxWidth = this.suLayer.width;
        var rand = Math.random();
        var resultX = (0 + Math.round(rand * maxWidth));
        var resultNumbers = [resultX, 0];
        return resultNumbers;
    };
    /*玩家飞机方位位置移动更新*/
    BehaviorDispose.prototype.updatePlayerLocation = function (curLayer) {
        if (this.playerPlane.bindLayerObj == curLayer) {
            this.playerPlane.bindLayerObj = curLayer;
        }
        return this.playerPlane;
    };
    /*
        判定两个物体是否进行了碰撞
    */
    BehaviorDispose.prototype.judgeSrcAndDesCrash = function (srcObj, desObj) {
        if (null == srcObj.bindLayerObj || null == desObj.bindLayerObj) {
            return false;
        }
        var srcBounds = new egret.Rectangle(srcObj.bindLayerObj.x, srcObj.bindLayerObj.y, srcObj.bindLayerObj.width, srcObj.bindLayerObj.height);
        var desBounds = new egret.Rectangle(desObj.bindLayerObj.x, desObj.bindLayerObj.y, desObj.bindLayerObj.width, desObj.bindLayerObj.height);
        var resultValue = srcBounds.intersection(desBounds);
        var resultBoolean = !((resultValue.height == 0) && (resultValue.width == 0) && (resultValue.top == 0) && (resultValue.bottom == 0));
        return resultBoolean;
    };
    /*判定玩家飞机是否碰触障碍物*/
    BehaviorDispose.prototype.judgePlayerPlaneCrash = function () {
        for (var index = 0; index < this.enemyPlaneList.length; index++) {
            var tempNPC = this.enemyPlaneList[index];
            if (this.judgeSrcAndDesCrash(this.playerPlane, tempNPC)) {
                this.enemyPlaneList.splice(index, 1);
                this.gameOverBlock(tempNPC);
                return true;
            }
        }
        return false;
    };
    /*子弹操作*/
    /*子弹生成循环计时器生成*/
    BehaviorDispose.prototype.startCreateBulletTimer = function () {
        var _this = this;
        if (null != this.createBulletTimer) {
            this.createBulletTimer.stop();
            this.createBulletTimer = null;
        }
        this.createBulletTimer = new egret.Timer(500, 0);
        this.createBulletTimer.addEventListener(egret.TimerEvent.TIMER, function (param) {
            var tempBullet = new BulletObj((new BuuletView()), 0, 1);
            _this.playerBulletList.push(tempBullet);
            _this.bulletCreateBlock(tempBullet);
        }, this);
    };
    /*删除子弹*/
    BehaviorDispose.prototype.deleteBullet = function (desBullet) {
        for (var index = 0; index < this.playerBulletList.length; index++) {
            var temp = this.playerBulletList[index];
            if (temp == desBullet) {
                this.playerBulletList.splice(index, 1);
                break;
            }
        }
    };
    /*遍历目标子弹是否和地方飞机碰撞*/
    BehaviorDispose.prototype.bulletHitEnemyPlane = function (desBullet) {
        for (var pos = 0; pos < this.playerBulletList.length; pos++) {
            var temp = this.playerBulletList[pos];
            if (this.judgeSrcAndDesCrash(temp, desBullet)) {
                temp.bindLayerObj.image = RES.getRes("enemy1_down3_png");
                this.deleteNpcView(temp.bindLayerObj);
                this.npcPlaneDisappearCallback(temp);
                return true;
            }
        }
        return false;
    };
    /*runloop执行障碍物生成 然后回调给layer*/
    BehaviorDispose.prototype.startCreateBarrierTimer = function () {
        var _this = this;
        if (null != this.createBarrierTimer) {
            this.stopCreateBarrierTimer();
        }
        var runloopTime = 2000; //默认每2s生成一个障碍物
        if (this.level > this.maxLevel) {
            runloopTime = 100;
        }
        else {
            runloopTime = this.maxRunloopTime - (this.level * 100);
        }
        this.createBarrierTimer = new egret.Timer(runloopTime, 0);
        this.createBarrierTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.createBarrierTimerRunLoopMethod();
        }, this);
        this.createBarrierTimer.start();
    };
    /*停止创建障碍物计时器*/
    BehaviorDispose.prototype.stopCreateBarrierTimer = function () {
        if (this.createBarrierTimer != null) {
            this.createBarrierTimer.stop();
            this.createBarrierTimer = null;
        }
    };
    /*循环创建障碍物函数*/
    BehaviorDispose.prototype.createBarrierTimerRunLoopMethod = function () {
        if (this.isStopCreateBarrier) {
            this.stopCreateBarrierTimer();
            return;
        }
        var newDownThingLocation = this.randomStartLocation();
        var newNpcPlane = (this.createDownThings()); //因为目前只有飞机所以直接强制类型转换
        newNpcPlane.barrierType = 0;
        newNpcPlane.isPlayer = false;
        newNpcPlane.bindLayerObj.x = newDownThingLocation[0];
        newNpcPlane.bindLayerObj.y = newDownThingLocation[1];
        this.enemyPlaneList.push(newNpcPlane);
        //回调
        this.createNpcPlaneSucCallback(newNpcPlane);
    };
    BehaviorDispose.prototype.deleteNpcView = function (desView) {
        for (var index = 0; index < this.enemyPlaneList.length; index++) {
            var tempObj = this.enemyPlaneList[index];
            if (tempObj.bindLayerObj == desView) {
                this.enemyPlaneList.splice(index, 1);
                tempObj = null;
                break;
            }
        }
    };
    return BehaviorDispose;
}());
__reflect(BehaviorDispose.prototype, "BehaviorDispose");
//# sourceMappingURL=BeharviorDispose.js.map