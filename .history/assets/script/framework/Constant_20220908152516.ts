
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Tue Sep 06 2022 19:56:19 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/script/framework/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

//不是组件，不需要继承@ccclass('Constant')


//记录飞机组合
export class Constant {

    //敌机类型
    public static EnemyType = {//敌机类型
        TYPE1: 1,
        TYPE2: 2,
        TYPE3: 3,//Boss

    };
    //敌机组合方式
    public static Combination = {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3,

    };
    //碰撞类型
    public static CollisionType = {
        SELF_PLANE: 1 << 1,//必须设置二进制的值
        ENEMY_PLANE: 1 << 2,
        SELF_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
        BULLET_PROP: 1 << 5,
        BOSS: 1 << 6,
    };
    //道具池
    public static BulletPropType =
        {
            BULLET_M: 1,
            BULLET_H: 2,
            BULLET_S: 3,

        }
    //子弹角度
    public static Direction =
        {
            LEFT: 1,
            MIDDLE: 2,
            RIGHT: 3,

        }


    start() {
        // [3]
    }

    update(deltaTime: number) {
        // [4]
    }
}


