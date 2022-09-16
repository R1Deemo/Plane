
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


    //开启触摸监听
    start() {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);

        // [3]
    }


    _touchStart(touch: Touch, event: EventTouch) {
        this.gameManager.isShooting(true);

    }
    _touchMove(touch: Touch, event: EventTouch) {
        // if (!this.gameManager.isGameStart) {
        //     return;
        // }

        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }
    _touchEnd(touch: Touch, event: EventTouch) {

        this.gameManager.isShooting(false);
    }
}




