
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, BoxCollider, macro } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { BulletProp } from '../bullet/BulletProp';
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
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    //道具接入
    @property(Prefab)
    public bulletPropH: Prefab = null;
    @property(Prefab)
    public bulletPropM: Prefab = null;
    @property(Prefab)
    public bulletPropS: Prefab = null;
    @property(Prefab)
    public bulletPropSpeed = 0.3;



    private _currShootTime = 0;//射击周期
    private _isShooting = false;
    private _currCreateEnemyTime = 0;//当前创建的敌机时间
    private _combinationInterval = Constant.Combination.PLAN1;   //组合的间隔状态
    private _bulletType = Constant.BulletPropType.BULLET_M;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        //发射子弹 
        this._currShootTime += deltaTime;
        if (this._isShooting && this._currShootTime > this.shootTime) {//射击时间大于周期，再发射子弹
            this.createPlayerBullertM();//默认发射M类型子弹
            this._currShootTime = 0;
        }
        //生成敌机 
        this._currCreateEnemyTime += deltaTime;
        if (this._combinationInterval === Constant.Combination.PLAN1) {//前10s
            if (this._currCreateEnemyTime > this.createEnemyTime) {//
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if (this._combinationInterval === Constant.Combination.PLAN2) {//10~20s
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.9) {//增加时间减少出现频率
                const randomCombination = math.randomRangeInt(1, 3);//随机组合一和二
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.creteCombination1();
                } else {
                    this.createEnemyPlane();
                }
                this._currCreateEnemyTime = 0;//时间置零
            }
            //20s以上
        } else {
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.8) {//增加时间减少出现频率
                const randomCombination = math.randomRangeInt(1, 4);//随机组合一，二，三
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.creteCombination2();
                } else if (randomCombination === Constant.Combination.PLAN3) {
                    this.creteCombination2();
                }
                this._currCreateEnemyTime = 0;//时间置零
            }

        }


    }


    private _init() {
        this._currShootTime = this.shootTime;//点击后必发射一颗子弹
        this._changePlaneMode();//改变敌机状态

        this.createBulletProp();
    }

    //设置计时器
    private _changePlaneMode() {
        this.schedule(this._modeChanged, 10, macro.REPEAT_FOREVER);//每10s改变一次状态，一直记时

    }
    //根据状态改变组合
    private _modeChanged() {
        this._combinationInterval++;
        this.createBulletProp();//创建道具
    }

    //得分
    public addScore() {

    }

    //改变子弹类型的接口
    public changeBulletType(type: number) {
        this._bulletType = type;

    }

    //生成道具
    public createBulletProp() {
        const randomProp = math.randomRangeInt(1, 4);//随机生成三种道具
        let prefab: Prefab = null;
        if (randomProp === Constant.BulletPropType.BULLET_H) {
            prefab = this.bulletPropH;

        } else if (randomProp === Constant.BulletPropType.BULLET_S) {
            prefab = this.bulletPropS;
        } else {
            prefab = this.bulletPropM;
        }
        //实例化道具
        const prop = instantiate(prefab);
        prop.setParent(this.node);
        prop.setPosition(15, 0, -50);
        const propComp = prop.getComponent(BulletProp);
        propComp.show(this, -this.bulletPropSpeed);
    }
    //创建玩家子弹
    //M类型子弹
    public createPlayerBullertM() {
        const bullet = instantiate(this.bullet01);//实例化
        bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.position;//记录飞机位置
        bullet.setPosition(pos.x, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }
    //H类型子弹  //两发子弹
    public createPlayerBullertH() {
        const pos = this.playerPlane.position;//记录飞机位置
        //left
        const bullet1 = instantiate(this.bullet03);//实例化
        bullet1.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false);

        //right
        const bullet2 = instantiate(this.bullet03);//实例化
        bullet2.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false);
    }
    //S类型子弹
    public createPlayerBullertS() {
        const pos = this.playerPlane.position;//记录飞机位置
        //中间
        const bullet = instantiate(this.bullet05);//选择子弹贴图并实例化
        bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet.setPosition(pos.x, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
        //左边
        const bullet1 = instantiate(this.bullet05);//选择子弹贴图并实例化
        bullet1.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet1.setPosition(pos.x - 4, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false, Constant.Direction.LEFT);
        //右边
        const bullet2 = instantiate(this.bullet05);//选择子弹贴图并实例化
        bullet2.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet2.setPosition(pos.x + 4, pos.y, pos.z - 7);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
    }

    //创建敌机子弹 离敌机大概6位置
    public createEnemyBullert(targetPos: Vec3) {
        const bullet = instantiate(this.bullet01);//实例化
        bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.position;//记录飞机位置
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);//设置子弹位置    子弹离飞机6位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(1, true);//子弹速度为1  //必须比敌机移动快
        //给敌机子弹设置分组

        const colliderComp = bullet.getComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET);
        colliderComp.setMask(Constant.CollisionType.SELF_PLANE);
    }


    //判断是否射击
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
        enemyComp.show(this, speed, true);//单架敌机发射子弹
        //随机敌机位置
        const randomPos = math.randomRangeInt(-24, 21);
        enemy.setPosition(randomPos, 0, -50);
    }
    //敌机组合类型
    //组合一  5架飞机
    public creteCombination1() {
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            element.setPosition(-20 + i * 10, 0, -50);//每架飞机之间间隔10
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed, false);//设置飞行速度    //组合飞机不发射子弹
        }
    }
    //组合二   7架飞机
    public creteCombination2() {
        const enemyArray = new Array<Node>(7);

        const combinationPos = [//V字形阵容
            -21, 0, -60,
            -14, 0, -55,
            - 7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60,
            // 14, 0, -60,
            // 21, 0, -55,
            // 28, 0, -50,
            // 35, 0, -45,
            // 42, 0, -50,
            // 49, 0, -55,
            // 56, 0, -60,
        ];

        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy02);
            const element = enemyArray[i];
            element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy2Speed, false);//设置飞行速度
        }

    }



}




