
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletProp
 * DateTime = Wed Sep 07 2022 14:55:44 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = BulletProp.ts
 * FileBasenameNoExtension = BulletProp
 * URL = db://assets/script/bullet/BulletProp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('BulletProp')
export class BulletProp extends Component {

    private _propSpeed = 0.3;
    private _propXSpeed = 0.3;
    private _gameManager: GameManager = null;
    //开启碰撞监听
    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    //碰撞事件
    private _onTriggerEnter(event: ITriggerEvent) {
        const name = event.selfCollider.name;
        if (name === "bulletM") {

        }

    }


    update(deltaTime: number) {
        let pos = this.node.position;
        if (pos.x >= 15) {
            this._propXSpeed = this._propSpeed;
        } else if (pos.x <= -15) {
            this._propXSpeed = -this._propSpeed;
        }

        this.node.setPosition(pos.x + this._propXSpeed, pos.y, pos.z - this._propSpeed);

        pos = this.node.position;
        if (pos.z > 50) {
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number) {
        this._propSpeed = speed;
    }
}

