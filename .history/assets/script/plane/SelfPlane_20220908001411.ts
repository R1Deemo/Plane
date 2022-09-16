
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Collider, ITriggerEvent, AudioSource } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Tue Sep 06 2022 16:50:53 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    //添加爆炸效果
    @property(Node)
    public explode: Node = null;

    //添加血条
    @property(Node)
    public bloodFace: Node = null;

    @property(Node)
    public blood: Node = null;//添加血量根节点


    public lifeValue = 5;//设置玩家最高血量
    public isDie = false;//判断存活状态

    private _currLife = 0;//玩家当前血量
    private _audioSource: AudioSource = null;

    start() {
        this._audioSource = this.getComponent(AudioSource);
    }
    //开启事件监听
    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    //初始化玩家血量
    public init() {
        this._currLife = this.lifeValue;
        this.isDie = false;
        this.explode.active = false;//死亡特效关闭
        this.bloodFace.setScale(1, 1, 1);//血条加满
    }
    //玩家碰撞
    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();//获取碰撞分组
        //判断碰撞敌机或子弹
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || Constant.CollisionType.ENEMY_BULLET) {
            if (this._currLife === this.lifeValue) {
                this.blood.active = true;//开启血量显示
            }
            this._currLife--;//血量减少
            this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1);//设置血条
            if (this._currLife <= 0) {//死亡执行
                this.isDie = true;
                this.blood.active = false;//关闭血量显示
                this._audioSource.play();//死亡音效
                this.explode.active = true;//死亡特效
            }

        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}


