var graphics;
var cursor;
var cursor2;
var stripes;
var rectangles;
var cursorWidth = window.innerWidth;
var stripeWidth = window.innerWidth;
var cursorHeight = 160;
var stripeHeight = 160;
var cursorColor = 0xF8F8F8; //0xffffff
var stripeColor = 0xF8F8F8;
var suitekiplayed;
var knockplayed;
var mainMode;
var textColor = "0x000000";
var fadeTime = 1300;
var menuTweenDuration = 2000;
var tweenIsPlaying = false;
var mainCalledFirstTime = true;
var currentMainMode = [0, 0, 0];
var currentBgColor;

var bgwhite = "0xF8F8F8"; //#F8F8F8
var waterblue = "0x72DAE8"
var grassgreen = "0x5F9968"
var metalgray = "0x8A9DAD"
var mudbrown = "0x7F6152"
var transDark = "0x000000"

var waterblueRGB = [114, 218, 232];
var grassgreenRGB = [95, 153, 104];
var metalgrayRGB = [138, 157, 173];
var mudbrownRGB = [127, 97, 82];


//素材の読み込みシーン
class preloadScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'preloadScene', active: true });
    }

    preload() {
        this.load.image('titleBg', 'assets/thumb_mobile.png');
        this.load.image('description', ['assets/description.png']);
        this.load.image('audioNotify', ['assets/audioNotify.png']);
        this.load.image('tutorial', ['assets/tutorial2.png']);
        this.load.image('backButton', ['assets/backButton.png']);

        this.load.audio('suiteki', ['assets/suiteki.mp3']);
        this.load.audio('suityu', ['assets/suityu.mp3']);
        this.load.audio('knock', ['assets/knock2.mp3']);
        this.load.audio('kusatyu', ['assets/kusatyu.mp3']);
        this.load.audio('kusanuke', ['assets/kusanuke.mp3']);
        this.load.audio('metal', ['assets/metal.mp3']);


    }

    create() {

        this.scene.start("titleScene");
//        this.scene.start("tutorialScene");
//        this.scene.start("menuScene");

    }
}

//タイトルシーン
class titleScene extends Phaser.Scene {

    constructor () {
        super({ key: 'titleScene', active: false });
    }

    create() {
        var titleBg = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'titleBg').setAlpha(0).setInteractive();

        this.tweens.add({
          targets: titleBg,
          alpha: 1,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        titleBg.on('pointerdown', () => {

            this.tweens.add({
              targets: titleBg,
              alpha: 0,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("descriptionScene") },
            }, this);
        });

    }
}

class descriptionScene extends Phaser.Scene {

    constructor () {
        super({ key: 'descriptionScene', active: false });
    }

    create() {
        var descriptionImage = this.add.sprite(window.innerWidth/2, window.innerHeight/2+40, 'description').setAlpha(0).setInteractive();

        this.tweens.add({
          targets: descriptionImage,
          alpha: 1,
          y : window.innerHeight/2,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        descriptionImage.on('pointerdown', () => {

            this.tweens.add({
              targets: descriptionImage,
              alpha: 0,
              y : window.innerHeight/2-40,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("audioNotifyScene") },
            }, this);
        });

    }
}

class audioNotifyScene extends Phaser.Scene {

    constructor () {
        super({ key: 'audioNotifyScene', active: false });
    }

    create() {
        var audioNotifyImage = this.add.sprite(window.innerWidth/2, window.innerHeight/2+40, 'audioNotify').setAlpha(0).setInteractive();

        this.tweens.add({
          targets: audioNotifyImage,
          alpha: 1,
          y : window.innerHeight/2,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        audioNotifyImage.on('pointerdown', () => {

            this.tweens.add({
              targets: audioNotifyImage,
              alpha: 0,
              y : window.innerHeight/2-40,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("menuScene") },
            }, this);
        });

    }
}

class menuScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'menuScene', active: false });
    }

    create() {

        game.sound.stopAll();

        tweenIsPlaying = false;

        var rectArray = [];
        var backgroundRect = this.add.rectangle(innerWidth/2 , innerHeight/2 , innerWidth, innerHeight, bgwhite);

        var rect1 = this.add.rectangle(innerWidth/2 - 100 - 100 * 0.6 * 1.5 - 100 * 0.5, innerHeight/2 + 40, 100, 100, waterblue);
        var rect2 = this.add.rectangle(innerWidth/2 - 100 * 0.5 - 100 * 0.6 * 0.5, innerHeight/2 + 40, 100, 100, grassgreen);
        var rect3 = this.add.rectangle(innerWidth/2 + 100 * 0.5 + 100 * 0.6 * 0.5, innerHeight/2 + 40, 100, 100, metalgray);
        var rect4 = this.add.rectangle(innerWidth/2 + 100 + 100 * 0.6 * 1.5 + 100 * 0.5, innerHeight/2 + 40, 100, 100, mudbrown);

        rectArray.push(rect1, rect2, rect3, rect4);

        for (const elem of rectArray) {

            elem.setAlpha(0);
            elem.setStrokeStyle(0);
            elem.setInteractive();
            elem.depth = 0;

            this.tweens.add({
              targets: elem,
              y: innerHeight/2,
              alpha: 1,
              duration: fadeTime,
              ease: 'Expo.easeInOut',
              onComplete: function () {  }
              }, this);

        }

        rect1.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, waterblueRGB ) ;

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect1,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(1) ; }
                    }, this);

                fadeOut(this, rect2, rect3, rect4);
            }

        });

        rect2.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, grassgreenRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect2,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(2); }
                    }, this);

                fadeOut(this, rect1, rect3, rect4);
            }


        });

        rect3.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, metalgrayRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect3,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(3); }
                    }, this);

                fadeOut(this, rect1, rect2, rect4);

            }
        });

        rect4.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, mudbrownRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect4,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(4); }
                    }, this);

                fadeOut(this, rect1, rect2, rect3);
            }
        });

        function fadeOut(a, rectA, rectB, rectC){

                a.tweens.add({
                    targets: [ rectA,rectB,rectC ],
                    alpha: 0,
                    duration: 2000,
                    ease: 'Expo',
                }, this);
        }

        function goToMainScene(a){


            if(a == 1 ){
                currentBgColor = waterblue;
                mainMode = "water";

                cursorHeight = 160;
                stripeHeight = 160;
            }

            if(a == 2){
                currentBgColor = grassgreen;
                mainMode = "grass";

                cursorHeight = 160;
                stripeHeight = 160;
            }

            if(a == 3){
                currentBgColor = metalgray;
                mainMode = "metal";

                cursorHeight = stripeHeight * 2;
                stripeHeight = 160;
            }

            if(a == 4){
                currentBgColor = mudbrown;
                mainMode = "wood";

                cursorHeight = stripeHeight * 2;
                stripeHeight = 160;
            }

            if ( mainCalledFirstTime == true ){

                backgroundRect.destroy();

                for (const elem of rectArray) {

                    elem.destroy();

                }

                game.scene.start("tutorialScene");

            }else{

                game.scene.start("mainScene")

            }
        }

        function arrayCopy(a, b) {
            for (let i = 0; i < b.length; ++i) {
                a[i] = b[i];
            }
        }
    }
}

class tutorialScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'tutorialScene', active: false });
    }

    create() {

        mainCalledFirstTime = false;

        console.log("tutorial called");

        var backgroundRect2 = this.add.rectangle(innerWidth/2 ,innerHeight/2 ,innerWidth, innerHeight, currentBgColor);
        var transDarkRect = this.add.rectangle(innerWidth/2 ,innerHeight/2 ,innerWidth, innerHeight, transDark).setAlpha(0);
        var tutorialImage = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'tutorial').setAlpha(0).setInteractive();

//        transDarkRect.setDepth(1);
//        tutorialImage.setDepth(2);

        transDarkRect.setStrokeStyle(0);

        console.log("tween called");

        this.tweens.add({
            targets: transDarkRect,
            alpha: 0.25,
            duration: fadeTime,
            ease: 'Power2',
            onComplete: function () {  }
            }, this);

        this.tweens.add({
          targets: tutorialImage,
          alpha: 1,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        tutorialImage.on('pointerdown', () => {

            this.tweens.add({
              targets: tutorialImage,
              alpha: 0,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => {  },
            }, this);

            this.tweens.add({
              targets: transDarkRect,
              alpha: 0,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("mainScene") },
            }, this);
        });
    }
}

class mainScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'mainScene', active: false });
    }

    create (){

        this.cameras.main.fadeIn(1000, currentMainMode[0], currentMainMode[1], currentMainMode[2]);

        this.suityu = this.sound.add('suityu', false);
        this.suiteki = this.sound.add('suiteki', false);
        this.knock = this.sound.add('knock', false);
        this.kusatyu = this.sound.add('kusatyu', false);
        this.kusanuke = this.sound.add('kusanuke', false);
        this.metal = this.sound.add('metal', false);

        var backgroundRect = this.add.rectangle(innerWidth/2 ,innerHeight/2 ,innerWidth, innerHeight, currentBgColor);

        graphics = this.add.graphics(
        {fillStyle: { color: cursorColor }
        });
        cursor = new Phaser.Geom.Rectangle(
            window.innerWidth/2 - cursorWidth/2,
            0,
            cursorWidth,
            cursorHeight, Phaser.Geom.Rectangle.Contains);

        //当たり判定のための透明カーソル
        cursor2 = new Phaser.Geom.Rectangle(
            window.innerWidth/2 - cursorWidth/2,
            0,
            cursorWidth,
            cursorHeight * 0.9,
            Phaser.Geom.Rectangle.Contains);

        //ストライプ生成
        rectangles = [];
        for(var i = 0; i < 5; i++)
        {
            rectangles.push(new Phaser.Geom.Rectangle(
            window.innerWidth/2 - stripeWidth/2,
            window.innerHeight/2 - stripeHeight/2*(-11 + i*4),
            stripeWidth,
            stripeHeight,
            cursorColor));
        }

        this.input.on('pointermove', function (pointer) {
            Phaser.Geom.Rectangle.CenterOn(
                cursor, window.innerWidth/2, pointer.y);

            Phaser.Geom.Rectangle.CenterOn(
                cursor2, window.innerWidth/2, pointer.y);
        });

        var backbuttonImage = this.add.sprite(90, 100, 'backButton').setAlpha(1).setInteractive().setScale(0.8);

        backbuttonImage.on('pointerdown', () => {
            console.log("back pushed")
            this.cameras.main.fadeOut(1000, 255, 255, 255);
            this.scene.start("menuScene");
        });
    }

    update(){
        graphics.clear();
        graphics.fillRectShape(cursor);

        for(var i = 0; i < rectangles.length; i++){
            graphics.fillRectShape(rectangles[i]);
        }

        if(mainMode == "water"){
            if (Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5]) ){

                if(!this.suityu.isPlaying){
                    this.suityu.play();
                }
                suitekiplayed = false;

            }else{
                if(this.suityu.isPlaying){
                    this.suityu.stop();
                }
        //
                if(!this.suiteki.isPlaying && !suitekiplayed){
                    this.suiteki.play();
                    suitekiplayed = true;
                }
            }
        }

        if(mainMode == "grass"){
            if (Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5]) ){

                if(!this.kusatyu.isPlaying){
                    this.kusatyu.play();
                }
                suitekiplayed = false;

            }else{
                if(this.kusatyu.isPlaying){
                    this.kusatyu.stop();
                }
        //
                if(!this.kusanuke.isPlaying && !suitekiplayed){
                    this.kusanuke.play();
                    suitekiplayed = true;
                }
            }
        }

        if(mainMode == "metal"){
            if(Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5] )) {

                if(knockplayed == false){

                    this.metal.play();
                    knockplayed = true;

                }

            }else{
                knockplayed = false;
            }
        }

        if(mainMode == "wood"){
            if(Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5] )) {

                if(knockplayed == false){

                    this.knock.play();
                    knockplayed = true;

                }

            }else{
                knockplayed = false;
            }
        }
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: bgwhite,
    scene: [ preloadScene,
             titleScene,
             descriptionScene,
             audioNotifyScene,
             tutorialScene,
             menuScene,
             mainScene ],
    audio: {
        disableWebAudio: true
    }
}

let game = new Phaser.Game(config);
