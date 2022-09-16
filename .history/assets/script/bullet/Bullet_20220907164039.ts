
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
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
    //子弹速度
    private _bulletSpeed = 0;
    //子弹方向  //默认直线
    private _direction = Constant.Direction.MIDDLE;

    //判断是否为敌机子弹
    private _isEnemyBullet = false;

    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }
    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        //设置边界
        let outOfRange = -50;//玩家子弹-50为边界，敌机+50

        if (this._isEnemyBullet) { //敌机子弹处理
            moveLength = pos.z + this._bulletSpeed;
            outOfRange = 50;

        } else {//玩家子弹处理
            moveLength = pos.z - this._bulletSpeed;
            //给子弹加入角度
            if (this._direction === Constant.Direction.LEFT) {
                this.node.setPosition(pos.x - this._bulletSpeed, pos.y, moveLength);
            } else if (this._direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + this._bulletSpeed, pos.y, moveLength);

            } else {
                this.node.setPosition(pos.x, pos.y, moveLength);

            }



        }
        this.node.setPosition(pos.x, pos.y, moveLength);

        if (this._isEnemyBullet) {
            if (moveLength > outOfRange) {//敌机子弹销毁
                this.node.destroy();
                console.log('bullet destroy');
            }
        } else {//玩家子弹销毁
            if (moveLength < outOfRange) {
                this.node.destroy();
                console.log('bullet destroy');
            }

        }
    }
    //子弹碰撞执行
    private _onTriggerEnter(event: ITriggerEvent) {
        console.log("子弹销毁");
        this.node.destroy();//销毁
    }

    //接收
    show(speed: number, isEnemyBullet: boolean, direction = Constant.Direction.MIDDLE) {//不给角度默认直线
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
        this._direction = direction;

    }

}

