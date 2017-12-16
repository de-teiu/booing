/** 読み込み時初期化 */
var booing;
function preload() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canv");

  //ブーイング再生クラス初期化
  booing = new Booing();
}

/** 読み込み後初期化 */
var personObj = [];
function setup() {
  frameRate(30);
  noStroke();

  //人クラス初期化
  personObj = [];
  //画面サイズに応じて描画する人数をざっくり指定
  var personCount = (windowWidth * windowHeight / (48 * BASE_SIZE) / (48 * BASE_SIZE)) * 5;
  //人をランダムに配置
  for (var i = 0; i < personCount; i++) {
    var p = new Person(random(windowWidth - (48 * BASE_SIZE)), random(windowHeight - (48 * BASE_SIZE)));
    personObj.push(p);
  }
  //描画順調整のため、人オブジェクトをy座標順にソート
  personObj.sort(function (a, b) {
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return 0;
  });
}

/** 矩形描画 */
var BASE_SIZE = 2;
function expandRect(x, y, wid, hei) {
  rect(x * BASE_SIZE, y * BASE_SIZE, wid * BASE_SIZE, hei * BASE_SIZE);
}


/** 画面描画 */
function draw() {
  background(color(128, 128, 128));

  //BGM再生
  booing.loopPlay();

  //人描画
  personObj.forEach(function (value) {
    value.draw();
  });


}

/** ランダムな整数を取得 */
function getRandomNumber(max) {
  var num = Number(floor(random(max + 1)));
  return num;
}

//ウィンドウリサイズイベント
var timer = false;
$(window).resize(function () {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    console.log('resized');
    //キャンバス再描画
    resizeCanvas(windowWidth, windowHeight);
    setup();
  }, 200);
});
