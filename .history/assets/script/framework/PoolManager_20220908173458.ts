
import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;




interface IDictPool {
    [name: string]: NodePool;
}

interface IDictPrefab {
    [name: string]: Prefab;
}

@ccclass('PoolManager')
export class PoolManager {

    //实例化
    public static instance() {
        if (!this._instance) {
            this._instance = new PoolManager();
        }

        return this._instance;
    }

    private _dictPool: IDictPool = {};  //设置类型
    private _dictPrefab: IDictPrefab = {};//缓存预制
    private static _instance: PoolManager;//判断是否实例化过

    //拿节点
    public getNode(prefab: Prefab, parent: Node) {
        let name = prefab.data.name;
        // console.log('get node   ' + name);
        let node: Node = null;
        this._dictPrefab[name] = prefab;
        const pool = this._dictPool[name];
        //判断有没有当前分类的容器
        if (pool) {
            //判断是不是有该分类的小分类
            //判断容量，容量不足实例化新对象
            if (pool.size() > 0) {
                node = pool.get();
            } else {//实例化新对象
                node = instantiate(prefab);
            }
        } else {//创建新类型的容器
            this._dictPool[name] = new NodePool();
            node = instantiate(prefab);
        }
        //设置父节点
        node.parent = parent;
        //激活
        node.active = true;
        //返回出去
        return node;
    }

    //放节点
    public putNode(node: Node) {
        let name = node.name;
        // console.log('put node   ' + name);

        //放入后节点回收
        node.parent = null;
        //判断容器中有无当前分类节点
        if (!this._dictPool[name]) {
            this._dictPool[name] = new NodePool();
        }

        this._dictPool[name].put(node);
    }
}

