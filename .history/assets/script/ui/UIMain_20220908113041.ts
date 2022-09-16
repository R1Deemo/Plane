
import { _decorator, Component, Node, SystemEvent, EventTouch } from 'cc';
import { GameManager } from '../framework/GameManager';
import { SelfPlane } from '../plane/SelfPlane';
const { ccclass, property } = _decorator;
console.log(SelfPlane);

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Tue Sep 06 2022 17:30:33 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/script/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('UIMain')
export class UIMain extends Component {
    //飞行速度
    @property
    public planeSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;
    //导入gameManager
    @property(GameManager)
    public gameManager: GameManager = null;
    //导入SelfPlane
    @property(SelfPlane)
    public planeSelf: SelfPlane = null;

    //开始界面
    @property(Node)
    public gameStart: Node = null;
    //游戏界面
    @property(Node)
    public game: Node = null;
    //结束页面
    @property(Node)
    public gameOver: Node = null;
    //提示页面
    @property(Node)
    public gameHelp: Node = null;
    //设置页面
    @property(Node)
    public gameSetting: Node = null;

    //简单按钮
    public easy() {
        this.gameSetting.active = false;
        this.game.active = true;
        //this.planeSpeed = 0.5;
        console.log(this.planeSelf);

        //console.log(this.selfPlane);
        // this.selfPlane.easy(100);

    }

    //困难按钮
    public hard() {
        this.gameSetting.active = false;
        this.game.active = true;
        //this.planeSpeed = 1.5;
        // this.selfPlane.hard();
    }
    //设置按钮
    public setting() {
        this.gameStart.active = false;
        this.gameSetting.active = true;

    }
    //继续按钮
    public continue() {
        this.gameHelp.active = false;
        this.game.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.gameReStart();

    }
    //重新开始按钮
    public reStart() {
        this.gameOver.active = false;
        this.game.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.gameReStart();
    }
    //返回界面按钮
    public returnMain() {
        this.gameOver.active = false;
        this.gameStart.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.returnMain();
    }


    start() {
        //开启触摸监听
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);

        // 显示开始界面
        this.gameStart.active = true;
    }

    //触摸事件
    _touchStart(touch: Touch, event: EventTouch) {
        if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true);
        } else {//触摸屏幕
            this.gameStart.active = false;

            this.gameHelp.active = true;
            this.game.active = false;
            //  this.game.active = true;
            this.gameManager.playAudioEffect('button');
            //this.gameManager.gameStart();
        }


    }
    _touchMove(touch: Touch, event: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return;
        }

        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }
    _touchEnd(touch: Touch, event: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return;
        }
        this.gameManager.isShooting(false);
    }
}




