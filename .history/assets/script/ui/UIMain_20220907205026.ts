
import { _decorator, Component, Node, SystemEvent, EventTouch } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

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

    @property(GameManager)
    public gameManager: GameManager = null;

    @property(Node)
    public gemeStart: Node = null;
    @property(Node)
    public geme: Node = null;
    @property(Node)
    public gemeOver: Node = null;


    //重新开始
    public reStart() {
        this.gemeOver.active = false;
        this.geme.active = true;
    }
    //返回界面
    public returnMain() {
        this.gemeOver.active = false;
        this.gemeStart.active = true;
    }


    start() {
        //开启触摸监听
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);

        // 显示开始界面
        this.gemeStart.active = true;
    }


    _touchStart(touch: Touch, event: EventTouch) {
        if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true);
        } else {
            this.gemeStart.active = false;
            this.geme.active = true;
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




