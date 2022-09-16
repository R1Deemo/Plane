
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from '../bullet/Bullet';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Tue Sep 06 2022 18:03:20 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/script/framework/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    // bullet
    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;
    @property
    public shootTime = 0.3;//射击
    @property
    public bulletSpeed = 1;//子弹移速

    //子弹管理节点
    @property(Node)
    public bulletRoot: Node = null;

    private _currShootTime = 0;//射击周期
    private _isShooting = false;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._currShootTime += deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {
            this.createPlayerBullert();
            this._currShootTime = 0;
        }
    }

    public createPlayerBullert() {
        const bullet = instantiate(this.bullet01);//实例化
        bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.position;//记录子弹位置
        bullet.setPosition(pos.x, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;



    }

    public isShooting(value: boolean) {
        this._isShooting = value;

    }

    private _init() {
        this._currShootTime = this.shootTime;//点击后必发射一颗子弹
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
