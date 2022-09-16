
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
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);
            if (moveLength > 50) {
                this.node.destroy();
                //  PoolManager.instance().putNode(this.node);
                //  console.log('bullet destroy');
            }
        } else {
            moveLength = pos.z - this._bulletSpeed;
            //设置子弹飞行角度
            if (this._direction === Constant.Direction.LEFT) {
                this.node.setPosition(pos.x - this._bulletSpeed * 0.2, pos.y, moveLength);
            } else if (this._direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + this._bulletSpeed * 0.2, pos.y, moveLength);
            } else {
                this.node.setPosition(pos.x, pos.y, moveLength);
            }

            if (moveLength < -50) {
                this.node.destroy();
                //PoolManager.instance().putNode(this.node);
                // console.log('bullet destroy');
            }
        }
    }
    //子弹碰撞执行
    private _onTriggerEnter(event: ITriggerEvent) {
        //console.log("子弹销毁");
        const collisionGroup = event.otherCollider.getGroup();//获取碰撞分组
        //判断碰撞敌机或子弹销毁
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || Constant.CollisionType.ENEMY_BULLET) {
            console.log("子弹销毁");
            this.node.destroy();//销毁
        }

    }

    //接收
    show(speed: number, isEnemyBullet: boolean, direction = Constant.Direction.MIDDLE) {//不给角度默认直线
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
        this._direction = direction;

    }

}

