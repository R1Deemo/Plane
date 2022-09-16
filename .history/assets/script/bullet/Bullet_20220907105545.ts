
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
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

    onEnable() {
        const colider = this.getComponent(Collider);//开启碰撞
        colider.on('onCollisionEnter', this._onTriggerEnter, this);//监听碰撞
    }

    onDisable() {
        const colider = this.getComponent(Collider);//开启碰撞
        colider.off('onCollisionEnter', this._onTriggerEnter, this);//取消监听
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
        this.node.destroy();//销毁
    }


    show(speed: number, isEnemyBullet: boolean) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;

    }

}

