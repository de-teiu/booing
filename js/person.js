/** 画面に描画する人の定義 */
function Person(x, y) {
  this.x = x;
  this.y = y;
  this.clothesColor = color(getRandomNumber(255), getRandomNumber(255), getRandomNumber(255));
  this.pantsColor = color(getRandomNumber(255), getRandomNumber(255), getRandomNumber(255));
  this.skinColor = color(255, 226, 136);
  this.raiseFlg = false;
  if (getRandomNumber(1)) {
    this.raiseFlg = true;
  }
  this.moveTime = getRandomNumber(15);

}
/** 描画 */
Person.prototype.draw = function () {

  //15フレームに１回腕の上げ下げを切り替え
  this.moveTime--;
  if (this.moveTime <= 0) {
    this.moveTime = 15;
    this.raiseFlg = !this.raiseFlg;
  }
  //頭
  fill(this.skinColor);
  expandRect(this.x + 20, this.y + 10, 8, 6);
  //胴体
  fill(this.clothesColor);
  expandRect(this.x + 16, this.y + 16, 16, 14);
  //右腕
  expandRect(this.x + 13, this.y + 19, 3, 14);
  fill(this.skinColor);
  expandRect(this.x + 13, this.y + 33, 3, 3);
  //足
  fill(this.pantsColor);
  expandRect(this.x + 16, this.y + 30, 5, 18);
  expandRect(this.x + 27, this.y + 30, 5, 18);
  expandRect(this.x + 16, this.y + 30, 16, 6);
  //左腕
  //腕を上げた状態かどうかで座標を決定
  var armY = this.raiseFlg ? 4 : 11;

  fill(this.skinColor);
  expandRect(this.x + 30, this.y + armY, 5, 4);
  fill(this.clothesColor);
  expandRect(this.x + 30, this.y + 4 + armY, 5, 12);
};