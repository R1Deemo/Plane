
import { _decorator, Component, Node, ITriggerEvent, Collider } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
import { PoolManager } from '../framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Boss
 * DateTime = Thu Sep 08 2022 15:12:54 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = Boss.ts
 * FileBasenameNoExtension = Boss
 * URL = db://assets/script/plane/Boss.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Boss')
export class Boss extends Component {

    @property
    public createBulletTime = 0.5//敌机发射子弹周期/

    private _gameManage: GameManager = null;//获取gameManage
    private _needBullet = false;//是否需要发射子弹
    private _currCreateBulletTime = 0;
    private _enemySpeed = 0;

    public bossLifeValue = 1000;//设置boss最高血量
    public bossIsDie = false;//判断存活状态

    private _bossCurrLife = 0;//玩家当前血量


    //开启碰撞监听
    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    start() {
        this.init();
    }

    update(deltaTime: number) {
        //生成子弹
        if (this._needBullet && !this.bossIsDie) {
            this._currCreateBulletTime += deltaTime;
            if (this._currCreateBulletTime > this.createBulletTime) {
                this._currCreateBulletTime = 0;
                this._gameManage.createEnemyBullert(this.node.position);
            }
        }
    }
    //碰撞后执行
    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();//获取碰撞分组
        //碰到玩家子弹或者玩家
        if (collisionGroup === Constant.CollisionType.SELF_PLANE || Constant.CollisionType.SELF_BULLET) {
            this._bossCurrLife--;//血量减少\
            console.log(this._bossCurrLife);
            if (this._bossCurrLife <= 0) {//死亡执行
                this.bossIsDie = true;
                PoolManager.instance().putNode(this.node);
                //this.node.destroy();//销毁
            }
            //   this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1);//设置血条
            //   this.blood.active = false;//关闭血量显示
            //  this._audioSource.play();//死亡音效
            //  this.explode.active = true;//死亡特效
            console.log("boss");
            this._gameManage.playAudioEffect('enemy');
            this._gameManage.addScore();//加分
        }


    }


    //把要的参数传进来
    public show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManage = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;
    }
    public init() {
        this._bossCurrLife = this.bossLifeValue;
        this.bossIsDie = false;
        ///this.explode.active = false;//死亡特效关闭
        //this.bloodFace.setScale(1, 1, 1);//血条加满
        //this.blood.active = false;//关闭血量显示
    }

}
