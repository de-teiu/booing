/** ブーイング再生用オブジェクト定義 */
function Booing() {
    var FILE_PATH = 'https://raw.githubusercontent.com/de-teiu/booing/master/js/sound/81191__payattention__booooooo.mp3';


    //1つの音をうまいこと途切れないようにループ再生するため、mp3を読み込んだオブジェクトを2つ用意
    this.startDate = new Date();
    this.bgm1 = loadSound(FILE_PATH);
    this.bgm2 = loadSound(FILE_PATH);
};

/** ループ再生 */
Booing.prototype.loopPlay = function () {

    //BGMが鳴ってなかったら再生
    if (!this.bgm1.isPlaying() && !this.bgm2.isPlaying()) {
        this.bgm1.play();
    }

    //再生が終了するあたりのタイミングでもう片方のBGMを再生開始
    var now = new Date();
    if ((now.getTime() - this.startDate.getTime()) / 1000 >= 22) {
        this.bgm1.isPlaying() ? this.bgm2.play() : this.bgm1.play();
        this.startDate = now;
    }
};