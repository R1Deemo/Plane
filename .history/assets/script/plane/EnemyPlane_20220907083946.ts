
import { _decorator, Component, Node } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
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
    public createBulletTime = 0.5//敌机发射子弹周期/

    private _enemySpeed = 0;//敌机速度
    private _needBullet = false;//是否需要发射子弹

    private _gameManage: GameManager = null;//获取gameManage

    private _currCreateBulletTime = 0;

    //public enemyType = Constant.EnemyType.TYPE1;


    start() {
        // [3]
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);//敌机移动

        if (this._needBullet) {
            this._currCreateBulletTime += deltaTime;
            if (this._currCreateBulletTime > this.createBulletTime) {
                this._currCreateBulletTime = 0;
                this._gameManage.createEnemyBullert();
            }
        }

        //超出屏幕销毁
        if (movePos > OUTOFBOUNCE) {
            this.node.destroy();
        }
    }

    //把要的参数传进来
    show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManage = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;


    }
}


