
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Tue Sep 06 2022 16:50:53 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property
    public speed = 1;

    start() {

        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


    _touchMove(touch: Touch, event: EventTouch) {
        const delta = touch.getDelta();
        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.01 * this.speed * delta.x, pos.y, pos.z - 0.01 * this.speed * delta.y);

    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
