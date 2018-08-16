// TypeScript file
class TotalScreen extends egret.DisplayObjectContainer{
    disposeObj:BehaviorDispose;
    animatedList:Array<egret.Tween> = new Array<egret.Tween>();
    playerViewAnimatedList:Array<egret.Tween> = new Array<egret.Tween>();
    constructor(){
        super();
    }
    
    createNpcPlaneSucCallback(newNpcPlane: BarrierInterface):void{

    }

    initUI(){
        // egret.TextField
        let backgroundView:egret.Shape = new egret.Shape();
        backgroundView.graphics.beginFill(0xffffff);
        backgroundView.graphics.drawRect(0, 0, this.width, this.height);
        backgroundView.graphics.endFill();
        this.addChild(backgroundView);
        this.touchEnabled = true;

        this.disposeObj = new BehaviorDispose(this, (value:BarrierInterface)=>{
            console.log("=======>createNpcViewBlock<=======");
            this.createNpcViewBlock(value);

        }, (value:BarrierInterface)=>{
            console.log("=======>npcDeleteBlock<=======");
            this.npcDeleteBlock(value);

        }, (value:BarrierInterface)=>{
            console.log("=======>gameOverBlock<=======");
            this.gameOverBlock(value);
    
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
    }


    showPlaneNewView(value:PlaneObj):void{
        this.addChild(value.bindLayerObj);
        // this.addBgColor2View(value.bindLayerObj, 0xFFFF00);
        if(!value.isPlayer){
            
            //添加帧动画
            
            let layerAnimated:egret.Tween = egret.Tween.get(value.bindLayerObj);
            layerAnimated.to({y:this.height}, 3000/(value.a <= 0 ? 1 : value.a)).call(() => {
                //动画完成 删除图片以及数据
                this.removeChild(value.bindLayerObj);
                this.disposeObj.deleteNpcView(value.bindLayerObj);
                this.stopAndDeleteAnimated(layerAnimated);
            });
            this.animatedList.push(layerAnimated);
            console.log("=======>添加动画到动画数组之后的动画数组长度:"+ this.animatedList.length.toString() +"<=======");
            layerAnimated.play();

            layerAnimated.addEventListener(egret.Event.CHANGE, ():void=>{
                this.npcViewMoveMethod();
            }, this);
        }
    }
    /*NPC视图移动函数调用*/
    npcViewMoveMethod(){
        this.disposeObj.judgePlayerPlaneCrash();
    }
    
    /*创建NPC视图回调函数调用*/
    createNpcViewBlock(value:BarrierInterface){
        if(value.barrierType == 0){
            this.showPlaneNewView(<PlaneObj>value);
        }
        
    }
    
    /*npc视图消失回调函数调用*/
    npcDeleteBlock(value:BarrierInterface){
        this.removeChild(value.bindLayerObj);
    }

    /*创建子弹 并且显示动画*/
    createBullet(value:BulletObj){
        console.log("=======>createBullet<=======");
        let curX = this.disposeObj.playerPlane.bindLayerObj.x;
        let curY = this.disposeObj.playerPlane.bindLayerObj.y;

        value.bindLayerObj.x = curX;
        value.bindLayerObj.y = curY - value.bindLayerObj.height;

        let tw:egret.Tween = egret.Tween.get(value.bindLayerObj);
        tw.to({y:(-value.bindLayerObj.height)}, ((value.a == 0 ? 1 : value.a)*500)).call(()=>{
            tw.pause();
            this.disposeObj.deleteBullet(value);
        }, this);
        value.bindLayerObj.addEventListener(egret.Event.CHANGE, ()=>{

            if(this.disposeObj.bulletHitEnemyPlane(value)){
                this.removeChild(value.bindLayerObj);
                this.disposeObj.deleteBullet(value);
                value = null;
                this.disposeObj.score += 100;
            }
        }, this);
    }

    /*游戏完结函数*/
    gameOverBlock(value:BarrierInterface){
        this.clearAnimated();

        let gameOverTextField:egret.TextField = new egret.TextField();
        this.addChild(gameOverTextField);
        gameOverTextField.x = 0;
        gameOverTextField.y = this.height / 2;
        gameOverTextField.width = this.width;
        gameOverTextField.textColor = 0x000000;
        gameOverTextField.textAlign = egret.HorizontalAlign.CENTER;
        gameOverTextField.text = "GAME OVER"
    }

    // 手指移动事件函数
    private onTouchMoveTap( evt:egret.TouchEvent )
    {
        console.log("=======>onTouchMoveTap:手指移动事件<=======");
        let moveDistance = evt.stageX;
        let tempView:egret.DisplayObjectContainer = this.disposeObj.playerPlane.bindLayerObj;
        tempView.x = moveDistance;
    }

    /*玩家视图移动回调函数调用*/
    private playerViewMoveMethod( evt:egret.TouchEvent )
    {
        console.log("=======>playerViewMoveMethod<=======");
        this.disposeObj.judgePlayerPlaneCrash();
    }



    /*停止删除目标动画*/
    stopAndDeleteAnimated(desAnimated:egret.Tween){
        for(let index = 0; index < this.animatedList.length; index++){
            let temp:egret.Tween = this.animatedList[index];
            if(temp == desAnimated){
                temp.pause();
                this.animatedList.splice(index, 1);
                temp = null;
                break;
            }
        }
    }
    /*清楚所有动画*/
    clearAnimated(){
        for(let index = 0; index < this.animatedList.length; index++){
            let temp:egret.Tween = this.animatedList[index];
            temp.pause();
        }

        this.animatedList.splice(0, this.animatedList.length);
    }



    addBgColor2View(desView:egret.DisplayObjectContainer, bgColor:number):void{
        if(null == desView){
            return;
        }
        let bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(bgColor);
        bg.graphics.drawRect(0, 0, desView.width, desView.height);
        bg.graphics.endFill();
        desView.addChild(bg);
    }
}