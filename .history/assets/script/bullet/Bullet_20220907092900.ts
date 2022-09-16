
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Tue Sep 06 2022 17:37:51 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */




@ccclass('Bullet')
export class Bullet extends Component {

    private _bulletSpeed = 0;

    //判断是否为敌机子弹
    private _isEnemyBullet = false;

    start() {
        // [3]
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        //设置边界
        let outOfRange = -50;//玩家子弹-50为边界，敌机+50

        if (this._isEnemyBullet) { //敌机子弹处理
            // moveLength = pos.z + this._bulletSpeed;
            // outOfRange = 50;

        } else {//玩家子弹处理
            moveLength = pos.z - this._bulletSpeed;
        }
        this.node.setPosition(pos.x, pos.y, moveLength);

        //
        if (moveLength > outOfRange) {
            this.node.destroy();
            console.log('bullet destroy');
        }
    }

    show(speed: number, isEnemyBullet: boolean) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;

    }

}

