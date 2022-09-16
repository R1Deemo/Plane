
import { _decorator, Component, Node } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Tue Sep 06 2022 19:39:41 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/script/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

const OUTOFBOUNCE = 50;//敌机飞到此处销毁
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public enemySpeed = 0;//敌机速度

    public enemyType = Constant.EnemyType.TYPE1;


    start() {
        // [3]
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this.enemySpeed * deltaTime;
        this.node.setPosition(pos.x, pos.y, movePos);//敌机移动

        if (movePos > OUTOFBOUNCE) {
            this.node.destroy();
        }
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