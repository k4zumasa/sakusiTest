function preload() {

    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('click', ['sound_alum.mp3']);
    this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');

}
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#badae8',
    scene: {
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var cursor;
var stripes;
var graphics;
var rectWidth = window.innerWidth/1.5;
var stripeWidth = window.innerWidth/1.5;
var cursorHeight = 100;
var cursorHeight = 100;
var cursorColor = 0xffffff; //0xffffff
var stripeColor = 0xffffff;
var soundThreshold;

function create (){

    var sprite = this.add.sprite(400, 300, 'eye').setInteractive();

    //graphicsオブジェクトの生成
    graphics = this.add.graphics(
    { lineStyle: { width: 2, color: 0x0000aa },
    fillStyle: { color: cursorColor }
    });

    soundThreshold = [];

    //ストライプ生成
    for(var i = 0; i < 6; i++)
    {
        var stripe = this.add.rectangle(
        window.innerWidth/2,
        window.innerHeight/2 - cursorHeight/2*(-11 + i*4),
        stripeWidth,
        cursorHeight,
        cursorColor);

        //この配列に入っている座標にカーソルが到達したら発音
        soundThreshold.push(window.innerHeight/2 - cursorHeight/2*(-11 + i*4));
    }

    for (var i=0; i<soundThreshold.length; i++){
        console.log(i);
        console.log(soundThreshold[i]);
        }


    //カーソルの生成とドラッグ有効化
    graphics.setInteractive(cursor = new Phaser.Geom.Rectangle(
        window.innerWidth/2 - rectWidth/2,
        0,
        rectWidth,
        cursorHeight), Phaser.Geom.Rectangle.Contains);

    this.input.setDraggable(graphics);
    this.input.on('drag', function (pointer, cursor, dragX, dragY) {
        cursor.y = dragY;
        console.log(dragY);
    });


//     let text = this.add.text(5, 5, "soundThreshold", {fontSize: 30,fontFamily: "Arial"});

}

function update ()
{
    graphics.clear();
    graphics.fillRectShape(cursor);
//     console.log(dragY);
}
function playsound(){

}

