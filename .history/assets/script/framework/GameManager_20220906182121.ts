
import { _decorator, Component, Node, Prefab } from 'cc';
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

    private _currShootTime = 0;//射击周期
    private _isShooting = false;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._currShootTime += deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {

        }
    }

    public createPlayerBullert() {

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
