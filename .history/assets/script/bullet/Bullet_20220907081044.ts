
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

const OUTOFRAME = 50;


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
        const moveLength = pos.z - this._bulletSpeed;
        this.node.setPosition(pos.x, pos.y, moveLength);


        if (Math.abs(moveLength) > OUTOFRAME) {
            this.node.destroy();

            console.log('bullet destroy');
        }
    }

    show(speed: number, isEnemyBullet: boolean) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;

    }

}

