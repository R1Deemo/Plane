
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ProgressBar
 * DateTime = Thu Sep 08 2022 09:15:52 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = progressBar.ts
 * FileBasenameNoExtension = progressBar
 * URL = db://assets/script/ui/progressBar.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('ProgressBar')
export class ProgressBar extends Component {
    @property(Node)
    progressBar: Node = null;
    // @property(Node)
    // btnTop: Node = null;


    private _time = 0;

    // public btnStart() {
    //     cc.director.loadScene("game");

    // }
    onLoad() {

        this._time = 0
    }
    // update(deltaTime: number) {
    //     //this.progress.progress += dt;//性能消耗大
    //     //一秒加0.1
    //     this._time += deltaTime;
    //     if (this._time < 1) return;
    //     this._time--;
    //     this.progress.progress += 0.3;
    //     // if (this.progress.progress >= 1) {
    //     //     this.progress.node.active = false;
    //     //     this.btnTop.active = true;
    //     //     this.btnTop.on("click", this.btnStart, this)
    //     // }
    // }
    update(deltaTime: number) {
        var progress = progressBar.progress;
        if (progress > 0) {
            progress += deltaTime;
        }
        else {
            progress = 1;
        }
        progressBar.progress = progress;
    }

}



