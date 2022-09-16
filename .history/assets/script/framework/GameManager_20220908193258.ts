
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, BoxCollider, macro, Label, Animation } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { BulletProp } from '../bullet/BulletProp';
import { Boss } from '../plane/Boss';
import { EnemyPlane } from '../plane/EnemyPlane';
import { SelfPlane } from '../plane/SelfPlane';
import { AudioManager } from './AudioManager';
import { Constant } from './Constant';
import { PoolManager } from './PoolManager';
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
    @property(SelfPlane)
    public playerPlane: SelfPlane = null;
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

    //Boss
    @property(Prefab)
    public Boss: Prefab = null;

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
    @property
    public bulletPropSpeed = 0.3;

    // ui界面
    @property(Node)
    public gamePage: Node = null;
    @property(Node)
    public gameOverPage: Node = null;
    @property(Label)
    public gameScore: Label = null;
    @property(Label)
    public gameOverScore: Label = null;
    //动画播放
    @property(Animation)
    public overAnim: Animation = null;

    //爆炸效果
    @property(Prefab)
    public explode: Prefab = null;
    //导入boss文件
    @property(Boss)
    public BossJs: Boss = null;

    //audio
    @property(AudioManager)
    public audioEffect: AudioManager = null;

    //判断游戏是否开始，用于跳转界面
    public isGameStart = false;


    //数据定义
    private _currShootTime = 0;//射击时间
    private _isShooting = false;//射击状态
    private _currCreateEnemyTime = 0;//当前创建的敌机时间
    private _combinationInterval = Constant.Combination.PLAN1;   //组合的间隔状态
    private _bulletType = Constant.BulletPropType.BULLET_M;//子弹类型
    private _score = 0;//得分
    //BOSS存活情况
    private _isBossLive = false;


    start() {
        this._init();
    }

    update(deltaTime: number) {
        //游戏是否开始
        if (!this.isGameStart) {
            return;
        }
        //判读玩家是否死亡
        if (this.playerPlane.isDie) {
            this.gameOver();
            return;
        }
        //发射子弹 
        this._currShootTime += deltaTime;
        //选择碰撞后生成子弹类型
        if (this._isShooting && this._currShootTime > this.shootTime) {//射击时间大于周期，再发射子弹
            if (this._bulletType === Constant.BulletPropType.BULLET_H) {
                this.createPlayerBullertH();
            } else if (this._bulletType === Constant.BulletPropType.BULLET_S) {
                this.createPlayerBullertS();
            } else {
                this.createPlayerBullertM();//默认发射M类型子弹
            }
            //播放音效
            const name = 'bullet' + (this._bulletType % 2 + 1)//判断是哪种子弹
            this.playAudioEffect(name);
            this._currShootTime = 0;
        }
        //生成敌机 组合
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
                    this.createEnemyPlane();
                } else if (randomCombination === Constant.Combination.PLAN2) {
                    this.creteCombination1();
                } else if (randomCombination === Constant.Combination.PLAN3) {
                    this.creteCombination2();
                }
                this._currCreateEnemyTime = 0;//时间置零
            }
        }

    }

    //音频接口
    public playAudioEffect(name: string) {
        this.audioEffect.play(name);

    }

    //初始化
    private _init() {
        this._currShootTime = this.shootTime;//点击后必发射一颗子弹
        this.playerPlane.init();//初始化飞机
        // this.createBulletProp(); //生成道具
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
    //返回主界面
    public returnMain() {
        this._currShootTime = 0;//射击时间
        this._isShooting = false;//射击状态
        this._currCreateEnemyTime = 0;//当前创建的敌机时间
        this._combinationInterval = Constant.Combination.PLAN1;   //组合的间隔状态
        this._bulletType = Constant.BulletPropType.BULLET_M;
        this.playerPlane.node.setPosition(0, 0, 15);//重置玩家位置
        this._score = 0;//重置分数
        //取消定时器
        // this.unschedule(this._modeChanged);
    }
    //重新开始
    public gameReStart() {
        this.gameStart();
        // this.isGameStart = true;//游戏状态
        this._currShootTime = 0;//射击时间
        // this._isShooting = false;//射击状态
        // this.playerPlane.init();//初始化飞机
        // this._changePlaneMode();//调用函数开启定时器
        this._currCreateEnemyTime = 0;//当前创建的敌机时间
        this._combinationInterval = Constant.Combination.PLAN1;   //组合的间隔状态
        this._bulletType = Constant.BulletPropType.BULLET_M;
        this.playerPlane.node.setPosition(0, 0, 15);//重置玩家位置
        //this._score = 0;//重置分数
        //this.gameScore.string = this._score.toString();//重新开始后游戏内分数显示为0

    }
    //游戏开始
    public gameStart() {
        this.isGameStart = true;
        this._changePlaneMode();//调用函数开启定时器
        this._score = 0;
        this.gameScore.string = this._score.toString();
        this.playerPlane.init();//初始化飞机

    }
    //游戏结束
    public gameOver() {
        this.isGameStart = false;
        this.gamePage.active = false;
        this.gameOverPage.active = true;
        this.gameOverScore.string = this._score.toString();//更新游戏结束的分数
        this.overAnim.play();
        this._isShooting = false;
        this.BossJs.bossIsLive = false;

        //this.playerPlane.init();//初始化飞机
        //取消定时器
        this.unschedule(this._modeChanged);
        this._destroyAll();//销毁所有节点

    }

    //得分
    public addScore() {
        this._score++;
        this.gameScore.string = this._score.toString();
        // 生成boss
        if (this._score == 2) {
            if (!this._isBossLive) {
                this.creteCombination3();//生成BOSS
                this._isBossLive = true;
            }
        }



    }

    //改变子弹类型的接口
    public changeBulletType(type: number) {
        this._bulletType = type;

    }

    //敌机死亡特效函数
    public createEnemyEffect() {

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
        //const prop = instantiate(prefab);
        const prop = PoolManager.instance().getNode(prefab, this.node);//实例化
        // prop.setParent(this.node);
        prop.setPosition(15, 0, -50);
        const propComp = prop.getComponent(BulletProp);
        propComp.show(this, -this.bulletPropSpeed);
    }
    //创建玩家子弹
    //M类型子弹
    public createPlayerBullertM() {
        // const bullet = instantiate(this.bullet01);//实例化
        const bullet = PoolManager.instance().getNode(this.bullet01, this.bulletRoot);//实例化
        // bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.node.position;//记录飞机位置
        bullet.setPosition(pos.x, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机1位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }

    //H类型子弹  //两发子弹
    public createPlayerBullertH() {
        const pos = this.playerPlane.node.position;//记录飞机位置
        //left
        // const bullet1 = instantiate(this.bullet03);//实例化
        const bullet1 = PoolManager.instance().getNode(this.bullet03, this.bulletRoot);//实例化
        //  bullet1.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机3位置左右
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false);

        //right
        // const bullet2 = instantiate(this.bullet03);//实例化
        const bullet2 = PoolManager.instance().getNode(this.bullet03, this.bulletRoot);//实例化
        //bullet2.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false);
    }
    //S类型子弹
    public createPlayerBullertS() {
        const pos = this.playerPlane.node.position;//记录飞机位置
        //中间
        //const bullet = instantiate(this.bullet05);//选择子弹贴图并实例化
        const bullet = PoolManager.instance().getNode(this.bullet05, this.bulletRoot);//实例化
        //bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet.setPosition(pos.x, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
        //左边
        // const bullet1 = instantiate(this.bullet05);//选择子弹贴图并实例化
        const bullet1 = PoolManager.instance().getNode(this.bullet05, this.bulletRoot);//实例化
        // bullet1.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet1.setPosition(pos.x - 4, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false, Constant.Direction.LEFT);
        //右边
        //const bullet2 = instantiate(this.bullet05);//选择子弹贴图并实例化
        const bullet2 = PoolManager.instance().getNode(this.bullet05, this.bulletRoot);//实例化
        //bullet2.setParent(this.bulletRoot);//将所有子弹放在该节点下
        bullet2.setPosition(pos.x + 4, pos.y, pos.z - 1);//设置子弹位置    子弹离飞机7位置左右
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
    }


    //创建敌机子弹 改变敌方子弹外观
    public createEnemyBullert(targetPos: Vec3) {
        //const bullet = instantiate(this.bullet01);//实例化
        const bullet = PoolManager.instance().getNode(this.bullet04, this.bulletRoot);//实例化   改变敌方子弹外观
        // bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.node.position;//记录飞机位置
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);//设置子弹位置    子弹离飞机6位置左右
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(1, true);//子弹速度为1  //必须比敌机移动快
        //给敌机子弹设置分组

        const colliderComp = bullet.getComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET);
        colliderComp.setMask(Constant.CollisionType.SELF_PLANE);
    }
    //创建Boss子弹 改变boss子弹外观
    public createBossBullert(targetPos: Vec3) {
        //const bullet = instantiate(this.bullet01);//实例化
        const bullet = PoolManager.instance().getNode(this.bullet04, this.bulletRoot);//实例化   改变敌方子弹外观
        // bullet.setParent(this.bulletRoot);//将所有子弹放在该节点下
        const pos = this.playerPlane.node.position;//记录飞机位置
        bullet.setPosition(targetPos.x + 7, targetPos.y, targetPos.z);//设置左边子弹位置    
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z);//设置中间子弹位置    
        bullet.setPosition(targetPos.x - 7, targetPos.y, targetPos.z);//设置右边子弹位置    

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

        } else if (whichEnemy === Constant.EnemyType.TYPE2) {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
            // } else {
            //     prefab = this.Boss;
            //     speed = 0;
        }
        // const enemy = instantiate(prefab);//实例化预制体
        const enemy = PoolManager.instance().getNode(prefab, this.node);//实例化
        //enemy.setParent(this.node);//设置到gameManage节点上
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(this, speed, true);//单架敌机发射子弹
        // //Boss
        // const BOSS = enemy.getComponent(Boss);
        // BOSS.show(this, speed, true);//单架敌机发射子弹
        //随机敌机位置
        const randomPos = math.randomRangeInt(-24, 21);
        enemy.setPosition(randomPos, 0, -50);



    }
    //敌机组合类型
    //组合一  5架飞机
    public creteCombination1() {
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            //  enemyArray[i] = instantiate(this.enemy01);
            enemyArray[i] = PoolManager.instance().getNode(this.enemy02, this.node);//实例化   
            const element = enemyArray[i];
            // element.parent = this.node;
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
            //  enemyArray[i] = instantiate(this.enemy02);
            enemyArray[i] = PoolManager.instance().getNode(this.enemy02, this.node);//实例化  
            const element = enemyArray[i];
            // element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy2Speed, false);//设置飞行速度
        }
    }
    //BOSS设置
    public creteCombination3() {
        // const boss = instantiate(this.Boss);
        const boss = PoolManager.instance().getNode(this.Boss, this.node);//实例化   

        // boss.parent = this.node;
        boss.setPosition(8, 0, -37);//boss初始位置
        const enemyBoss = boss.getComponent(Boss);
        console.log(enemyBoss);
        enemyBoss.show(this, 0, true);//设置飞行速度    //boss发射子弹
    }
    //删除所有gameManager下的所有子节点
    private _destroyAll() {
        let children = this.node.children;//消除当前节点的所有对象
        let length = children.length;
        let i = 0;
        //从下往上消除节点  //节点树
        for (i = length - 1; i > 0; i--) {
            const child = children[i];
            PoolManager.instance().putNode(child);
            //  child.destroy();
        }

        //删除子弹节点
        children = this.bulletRoot.children;
        length = children.length;
        for (i = length - 1; i > 0; i--) {
            const child = children[i];
            PoolManager.instance().putNode(child);
            //child.destroy();
        }




    }



}




