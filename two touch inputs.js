class MainScene extends Phaser.Scene {

    //this.bgImg
    //this.platforms
    //this.player
    //this.cursors
    //this.stars
    //this.scoreText
    //this.bombs

    constructor() {
        // Sceneを拡張してクラスを作る際にコンストラクタでSceneの設定を渡します
        // 自動実行をオフに
        super({ key: 'MainScene', active: false });

        this.score = 0;
        this.gameOver = false;
    }

    preload() {
    }

    create() {
        this.bgImg = this.add.image(400, 300, 'sky');

    }

    update() {

        if (this.gameOver) {

            const { width, height } = this.game.canvas;

            let gameOverText = this.add.text(80, 100, 'Game Over', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setFontSize(128).setColor('#f00');
            let clickPrmptText = this.add.text(100, 300, 'Click to Return to Title Screen ').setFontSize(32).setColor('#000');


            // 画面を埋めるようなZoneを作成
            let zone = this.add.zone(width/2, height/2, width, height);

            // Zoneをクリックできるように設定
            zone.setInteractive({
                useHandCursor: true  // マウスオーバーでカーソルが指マークになる
            });

            // Zoneをクリックしたら必要なデータを初期化しTitleSceneに遷移
            zone.on('pointerdown', () => {

                // ハイスコア（最高得点）が更新された場合は登録
                if(highScore < this.score) highScore = this.score;


                // 参考
                // Best way to destroy a object
                // https://phaser.discourse.group/t/best-way-to-destroy-a-object/3209
                //object.setActive(false).setVisible(false);
                //object.destroy();



                // 以下　destroyで消すことのできたオブジェクト

                //this.bgImg.destroy();
                //this.player.destroy();
                //this.scoreText.destroy();
                //gameOverText.destroy();
                //zone.destroy();

                // 消さなくてもこのMainSceneを再び呼び出したときに問題なさそうだったので現在はコメントアウトにしている
                // Sceneを切り替えるごとにPhaserが自動で、上記のサイトの説明にある
                // .setActive(false).setVisible(false)　のようなことを行ってくれている？
                // MainSceneを再び呼び出し時の状態を見るに
                // gameOverText、zone　では初期化的なことも自動で行ってくれている？



                // 以下　destroyで消すことのできなかったオブジェクト
                //this.cursors.destroy();
                //this.platforms.destroy();
                //this.stars.destroy();
                //this.bombs.destroy();

                // this.cursors　キーボード入力のようなPCの基本的な機能を表すようなオブジェクトは消せない？
                // this.platforms、this.stars、this.bombsのような内部にさらに複数のオブジェクトを保持しているような
                // オブジェクトは直接消せない？　または消す前に何らかの処理が必要？
                //
                // MainSceneを再び呼び出し時の状態を見るにdestroyによる削除がなくても今のところ問題なさそう
                // こちらの消せないオブジェクトも.setActive(false).setVisible(false)　のようなことを自動で行ってくれている？
                // this.stars、this.bombsはMainScene再呼び出し時には初期かもちゃんとされていそう



                // 数値、文字列、真偽値といった基本的なデータはdestroyで削除できないが
                // そのまま残しておくと、このMainSceneを再び呼び出したときに最後に保持したデータ内容がそのまま残ってしまう
                // なのでthis.score、this.gameOverは初期化を行う
                // 参考
                //　→　this.scoreは初期化を行わないと、得点が累積の得点となっていまう
                //　→　this.gameOverは初期化を行わないと一度ゲームオーバー状態設定後にずっとゲームオーバー状態が続いてしまう

                //this.score.destroy();
                //this.gameOver.destroy();
                this.score = 0;
                this.gameOver = false;



                // 必要な初期化後に、タイトル画面（TitleScene）へ遷移
                this.scene.start("TitleScene")

            });


            return;

        }

        if (this.cursors.left.isDown) {

            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

        } else if (this.cursors.right.isDown) {

            this.player.setVelocityX(160);

            this.player.anims.play('right', true);

        } else {

            this.player.setVelocityX(0);

            this.player.anims.play('turn');

        }


        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // collectStarメソッド
    // Playerがスターを取得すると得点を加算して表示
    // 画面上のスターが取得されて全てなくなるごとにスターを再生＆爆弾を1つ追加していく
    ////////////////////////////////////////////////////////////////////////////////////////
    collectStar (player, star) {

        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);


        if (this.stars.countActive(true) === 0) {

            //  A new batch of stars to collect
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // hitBombメソッド
    // Playerが爆弾に触れたらゲームオーバー
    // 爆弾に触れたらPlayerを正面を向かせて赤くして、ゲームオーバー状態に設定
    ////////////////////////////////////////////////////////////////////////////////////////
    hitBomb (player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

}

var config = {
    //parent: 'content',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [LoadingScene, TitleScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

}

let game = new Phaser.Game(config);
