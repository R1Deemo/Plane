
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
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


    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }
    //玩家碰撞
    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();//获取碰撞分组
        //判断碰撞敌机或子弹
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || Constant.CollisionType.ENEMY_BULLET) {
            console.log("减血");
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}


