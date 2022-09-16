
import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AudioManager
 * DateTime = Wed Sep 07 2022 22:13:49 GMT+0800 (中国标准时间)
 * Author = R1Deemo
 * FileBasename = AudioManager.ts
 * FileBasenameNoExtension = AudioManager
 * URL = db://assets/script/framework/AudioManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */



//数据结构接口
interface IAudioMap {
    [name: string]: AudioClip;
}


{


}

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property([AudioClip])
    public audioList: AudioClip[] = [];

    private _dict: IAudioMap = {};
    private _audioSource: AudioSource = null;

    start() {
        for (let i = 0; i < this.audioList.length; i++) {
            const element = this.audioList[i];
            this._dict[element.name] = element;
        }
        if (audioClip !== undefined) {
            this._audioSource = this.getComponent(AudioSource);
        }

    }

    public play(name: string) {
        const audioClip = this._dict[name];
        this._audioSource.playOneShot(audioClip);

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
