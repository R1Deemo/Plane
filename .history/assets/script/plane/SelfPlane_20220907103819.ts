
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Collider } from 'cc';
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


    start() {
        const colider = this.getComponent(Collider);//开启碰撞
        colider.on('onCollisionEnter', this.onTriggerEnter, this);//监听碰撞


    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}


