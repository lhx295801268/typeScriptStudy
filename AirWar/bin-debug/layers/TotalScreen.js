var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var TotalScreen = (function (_super) {
    __extends(TotalScreen, _super);
    function TotalScreen() {
        var _this = _super.call(this) || this;
        _this.animatedList = new Array();
        _this.playerViewAnimatedList = new Array();
        return _this;
    }
    TotalScreen.prototype.createNpcPlaneSucCallback = function (newNpcPlane) {
    };
    TotalScreen.prototype.initUI = function () {
        var _this = this;
        // egret.TextField
        var backgroundView = new egret.Shape();
        backgroundView.graphics.beginFill(0xffffff);
        backgroundView.graphics.drawRect(0, 0, this.width, this.height);
        backgroundView.graphics.endFill();
        this.addChild(backgroundView);
        this.touchEnabled = true;
        this.disposeObj = new BehaviorDispose(this, function (value) {
            console.log("=======>createNpcViewBlock<=======");
            _this.createNpcViewBlock(value);
        }, function (value) {
            console.log("=======>npcDeleteBlock<=======");
            _this.npcDeleteBlock(value);
        }, function (value) {
            console.log("=======>gameOverBlock<=======");
            _this.gameOverBlock(value);
        });
        this.disposeObj.bulletCreateBlock = this.createBullet;
        this.addChild(this.disposeObj.playerPlane.bindLayerObj);
        this.disposeObj.playerPlane.bindLayerObj.x = this.width / 2;
        this.disposeObj.playerPlane.bindLayerObj.y = this.height - this.disposeObj.playerPlane.bindLayerObj.height;
        // this.addBgColor2View(this.disposeObj.playerPlane.bindLayerObj, 0x7FFFAA);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveTap, this);
        this.disposeObj.playerPlane.bindLayerObj.addEventListener(egret.Event.CHANGE, this.playerViewMoveMethod, this);
        this.disposeObj.startCreateBarrierTimer();
        this.disposeObj.startCreateBulletTimer();
    };
    TotalScreen.prototype.showPlaneNewView = function (value) {
        var _this = this;
        this.addChild(value.bindLayerObj);
        // this.addBgColor2View(value.bindLayerObj, 0xFFFF00);
        if (!value.isPlayer) {
            //添加帧动画
            var layerAnimated_1 = egret.Tween.get(value.bindLayerObj);
            layerAnimated_1.to({ y: this.height }, 3000 / (value.a <= 0 ? 1 : value.a)).call(function () {
                //动画完成 删除图片以及数据
                _this.removeChild(value.bindLayerObj);
                _this.disposeObj.deleteNpcView(value.bindLayerObj);
                _this.stopAndDeleteAnimated(layerAnimated_1);
            });
            this.animatedList.push(layerAnimated_1);
            console.log("=======>添加动画到动画数组之后的动画数组长度:" + this.animatedList.length.toString() + "<=======");
            layerAnimated_1.play();
            layerAnimated_1.addEventListener(egret.Event.CHANGE, function () {
                _this.npcViewMoveMethod();
            }, this);
        }
    };
    /*NPC视图移动函数调用*/
    TotalScreen.prototype.npcViewMoveMethod = function () {
        this.disposeObj.judgePlayerPlaneCrash();
    };
    /*创建NPC视图回调函数调用*/
    TotalScreen.prototype.createNpcViewBlock = function (value) {
        if (value.barrierType == 0) {
            this.showPlaneNewView(value);
        }
    };
    /*npc视图消失回调函数调用*/
    TotalScreen.prototype.npcDeleteBlock = function (value) {
        this.removeChild(value.bindLayerObj);
    };
    /*创建子弹 并且显示动画*/
    TotalScreen.prototype.createBullet = function (value) {
        var _this = this;
        var curX = this.disposeObj.playerPlane.bindLayerObj.x;
        var curY = this.disposeObj.playerPlane.bindLayerObj.y;
        value.bindLayerObj.x = curX;
        value.bindLayerObj.y = curY - value.bindLayerObj.height;
        var tw = egret.Tween.get(value.bindLayerObj);
        tw.to({ y: (-value.bindLayerObj.height) }, ((value.a == 0 ? 1 : value.a) * 500)).call(function () {
            tw.pause();
            _this.disposeObj.deleteBullet(value);
        }, this);
        value.bindLayerObj.addEventListener(egret.Event.CHANGE, function () {
            if (_this.disposeObj.bulletHitEnemyPlane(value)) {
                _this.removeChild(value.bindLayerObj);
                _this.disposeObj.deleteBullet(value);
                value = null;
                _this.disposeObj.score += 100;
            }
        }, this);
    };
    /*游戏完结函数*/
    TotalScreen.prototype.gameOverBlock = function (value) {
        this.clearAnimated();
        var gameOverTextField = new egret.TextField();
        this.addChild(gameOverTextField);
        gameOverTextField.x = 0;
        gameOverTextField.y = this.height / 2;
        gameOverTextField.width = this.width;
        gameOverTextField.textColor = 0x000000;
        gameOverTextField.textAlign = egret.HorizontalAlign.CENTER;
        gameOverTextField.text = "GAME OVER";
    };
    // 手指移动事件函数
    TotalScreen.prototype.onTouchMoveTap = function (evt) {
        console.log("=======>onTouchMoveTap:手指移动事件<=======");
        var moveDistance = evt.stageX;
        var tempView = this.disposeObj.playerPlane.bindLayerObj;
        tempView.x = moveDistance;
    };
    /*玩家视图移动回调函数调用*/
    TotalScreen.prototype.playerViewMoveMethod = function (evt) {
        console.log("=======>playerViewMoveMethod<=======");
        this.disposeObj.judgePlayerPlaneCrash();
    };
    /*停止删除目标动画*/
    TotalScreen.prototype.stopAndDeleteAnimated = function (desAnimated) {
        for (var index = 0; index < this.animatedList.length; index++) {
            var temp = this.animatedList[index];
            if (temp == desAnimated) {
                temp.pause();
                this.animatedList.splice(index, 1);
                temp = null;
                break;
            }
        }
    };
    /*清楚所有动画*/
    TotalScreen.prototype.clearAnimated = function () {
        for (var index = 0; index < this.animatedList.length; index++) {
            var temp = this.animatedList[index];
            temp.pause();
        }
        this.animatedList.splice(0, this.animatedList.length);
    };
    TotalScreen.prototype.addBgColor2View = function (desView, bgColor) {
        if (null == desView) {
            return;
        }
        var bg = new egret.Shape();
        bg.graphics.beginFill(bgColor);
        bg.graphics.drawRect(0, 0, desView.width, desView.height);
        bg.graphics.endFill();
        desView.addChild(bg);
    };
    return TotalScreen;
}(egret.DisplayObjectContainer));
__reflect(TotalScreen.prototype, "TotalScreen");
//# sourceMappingURL=TotalScreen.js.map