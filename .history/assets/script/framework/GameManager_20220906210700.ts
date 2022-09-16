
import { _decorator, Component, Node, Prefab, instantiate, math } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { EnemyPlane } from '../plane/EnemyPlane';
import { Constant } from './Constant';
//import { Bullet } from '../bullet/Bullet';
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
    // 子弹
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

    //敌人飞机
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;
    //敌机生成时间
    @property
    public createEnemyTime = 1;
    //敌机速度
    @property
    public enemy1Speed = 0.5
    @property
    public enemy2Speed = 0.7



    private _currShootTime = 0;//射击周期
    private _isShooting = false;
    private _currCreateEnemyTime = 0;//当前创建的敌机时间
    private _combinationInterval = 0;   //组合的间隔状态

    start() {
        this._init();
    }

    update(deltaTime: number) {
        //发射子弹
        this._currShootTime += deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {//射击时间大于周期，再发射子弹
            this.createPlayerBullert();
            this._currShootTime = 0;
        }
        //生成敌机
        if (this._combinationInterval === Constant.Combination.PLAN1) {
            this._currCreateEnemyTime += deltaTime;
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }


        } else if (this._combinationInterval === Constant.Combination.PLAN2) {

        } else if (this._combinationInterval === Constant.Combination.PLAN3) {

        }


    }


    private _init() {
        this._currShootTime = this.shootTime;//点击后必发射一颗子弹
        this._changePlaneMode();//改变敌机状态
    }

    //设置计时器
    private _changePlaneMode() {
        this.schedule(this._modeChanged, 10, 3);//每10s改变一次状态，调用3次

    }
    //根据状态改变组合
    private _modeChanged() {
        this._combinationInterval++;
    }


    //创建子弹
    public createPlayerBullert() {
        const bullet = instantiate(this.bullet01);//实例化
        bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.position;//记录飞机位置
        bullet.setPosition(pos.x, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }
    public isShooting(value: boolean) {
        this._isShooting = value;

    }
    //创建敌机 根据敌机种类决定敌机速度和模型
    public createEnemyPlane() {
        const whichEnemy = math.randomRangeInt(1, 3);//随机生成敌机种类
        let prefab: Prefab = null;
        let speed = 0;

        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;

        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }
        const enemy = instantiate(prefab);//实例化预制体
        enemy.setParent(this.node);//设置到gameManage节点上
        const enemyComp = enemy.getComponent(EnemyPlane);

    }


}

