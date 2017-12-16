/** 読み込み時初期化 */
var bgm1;
var bgm2;
var bgmCount=0;
var startDate;
function preload(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canv");

  //効果音読み込み
  startDate= new Date();
  bgm1 = loadSound('./js/sound/81191__payattention__booooooo.mp3');
  bgm2 = loadSound('./js/sound/81191__payattention__booooooo.mp3');
}

/** 読み込み後初期化 */
var personObj = [];
function setup() {
  frameRate(30);
  noStroke();

  personObj = [];
  var personCount = (windowWidth*windowHeight/(48*BASE_SIZE)/(48*BASE_SIZE))*5;
  for(var i=0;i<personCount;i++){
    var p = new Person(random(windowWidth-(48*BASE_SIZE)),random(windowHeight-(48*BASE_SIZE)));
    personObj.push(p);
  }
  personObj.sort(function(a,b){
    if(a.y<b.y) return -1;
    if(a.y > b.y) return 1;
    return 0;
  });
}

/** 人クラス */
var BASE_SIZE = 2;
function Person(x,y){
  this.x = x;
  this.y = y;
  this.clothesColor = color(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
  this.pantsColor = color(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
  this.skinColor = color(255,226,136);
  this.raiseFlg = false;
  if(getRandomNumber(1)){
    this.raiseFlg = true;
  }
  this.moveTime = getRandomNumber(15);
  this.draw = function(){
    this.moveTime--;
    if(this.moveTime<=0){
      this.moveTime=15;
      this.raiseFlg = !this.raiseFlg;
    }
    //頭
    fill(this.skinColor);
    expandRect(this.x+20,this.y+10,8,6);
    //胴体
    fill(this.clothesColor);
    expandRect(this.x+16,this.y+16,16,14);
    //右腕
    expandRect(this.x+13,this.y+19,3,14);
    fill(this.skinColor);
    expandRect(this.x+13,this.y+33,3,3);
    //足
    fill(this.pantsColor);
    expandRect(this.x+16,this.y+30,5,18);
    expandRect(this.x+27,this.y+30,5,18);
    expandRect(this.x+16,this.y+30,16,6);
    //左腕
    var armY;
    if(this.raiseFlg){
      //腕上げ中
      armY = 4;
    }else{
      //腕下ろし中
      armY = 11;
    }
    fill(this.skinColor);
    expandRect(this.x+30,this.y+armY,5,4);
    fill(this.clothesColor);
    expandRect(this.x+30,this.y+4+armY,5,12);
  };
}

/** 矩形描画 */
function expandRect(x,y,wid,hei){
  rect(x*BASE_SIZE,y*BASE_SIZE,wid*BASE_SIZE,hei*BASE_SIZE);
}


/** 画面描画 */
function draw(){
  background(color(128,128,128));

  //BGM再生
  if(!bgm1.isPlaying() && !bgm2.isPlaying()){
    bgm1.play();
  }
  var now = new Date();
  if((now.getTime() - startDate.getTime())/1000 >=22){
    if(bgm1.isPlaying()){
      bgm2.play();
    }else{
      bgm1.play();
    }
    startDate = now;
  }

  //人描画
  personObj.forEach(function(value) {
    value.draw();
  });


}

/** ランダムな整数を取得 */
function getRandomNumber(max){
  var num = Number(floor(random(max+1)));
  return num;
}

//ウィンドウリサイズイベント
var timer = false;
$(window).resize(function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        console.log('resized');
        //キャンバス再描画
        resizeCanvas(windowWidth, windowHeight);
        setup();
    }, 200);
});
