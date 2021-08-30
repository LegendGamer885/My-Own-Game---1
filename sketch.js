var canvas
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jet, jetImg;
var meteor, meteorImg, meteorGroup;
var missile, missileImg, missileGroup;
var explosion, explosionImg;
var blast;
var backgroundImg;
var invisibleEarth;
var meteorArray = [];

function preload() {
  backgroundImg = loadImage("./assets/Sp_00.png");

  jetImg = loadImage("./assets/F-22.png");
  missileImg = loadImage("./assets/missile.png");
  meteorImg = loadAnimation("./assets/Meteor/Met_00.png","./assets/Meteor/Met_01.png","./assets/Meteor/Met_02.png","./assets/Meteor/Met_03.png","./assets/Meteor/Met_04.png","./assets/Meteor/Met_05.png");
  explosionImg = loadAnimation("./assets/Explosion/Expl_0.png", "./assets/Explosion/Expl_1.png", "./assets/Explosion/Expl_2.png", "./assets/Explosion/Expl_3.png", "./assets/Explosion/Expl_4.png", "./assets/Explosion/Expl_5.png", "./assets/Explosion/Expl_6.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  invisibleEarth = createSprite(8, height / 2, 20, height);
  invisibleEarth.visible = false;

  jet = createSprite(100, height / 2);
  jet.addImage(jetImg);
  jet.rotation = 90;
  jet.scale = 0.4

  missileGroup = new Group();
  meteorGroup = new Group();
}

function draw() {
  background(backgroundImg);

  if (gameState === PLAY) {

    if (keyDown(UP_ARROW)) {
      jet.x = jet.x + 7;
    }

    if (keyDown(DOWN_ARROW)) {
      jet.x = jet.x - 7;
    }

    if (keyDown(LEFT_ARROW)) {
      jet.y = jet.y - 7;
    }

    if (keyDown(RIGHT_ARROW)) {
      jet.y = jet.y + 7;
    }

    if (keyDown("SPACE")) {
      spawnRockets();
    }

    spawnMeteors();

    if (meteorGroup.isTouching(invisibleEarth)) {
      gameState = END;
    }

    if (missileGroup.isTouching(meteorGroup)) {
      for (var i = 0; i < meteorGroup.length; i++) {
        if (missileGroup.isTouching(meteorGroup[i])) {

          explosion = createSprite(meteorGroup[i].x, meteorGroup[i].y, 20, 20);
          explosion.addAnimation("explosion", explosionImg);
          explosion.scale = 0.3;
          meteorGroup[i].destroy();
          missileGroup.destroyEach();

          setTimeout(() => {
            explosion.destroy();
          }, 1000);
        }
      }

    }

  }

  else if (gameState === END) {
    meteorGroup.setVelocityXEach(0);
    meteorGroup.destroyEach();
    missileGroup.destroyEach();
  }

  drawSprites();
}

function spawnRockets() {
  missile = createSprite(300, 400, 20, 20);
  missile.addImage(missileImg);
  missile.rotation = 90;
  missile.x = jet.x;
  missile.y = jet.y;
  missile.velocityX = 6;
  missile.lifetime = 200;
  missile.scale = 0.1;
  missileGroup.add(missile);
}

function spawnMeteors() {
  var i = Math.round(random(120, height - 100));
  if (frameCount % 40 === 0) {
    meteor = createSprite(width - 20, i, 20, 20);
    meteor.addAnimation("meteor",meteorImg);
    meteor.rotation = 90;
    meteor.velocityX = -7;
    meteor.lifetime = 250;
    meteor.scale = 0.5;
    meteorGroup.add(meteor);

    for (i = 0; i < meteor.length; i++) {
      meteorArray[i].add(meteorGroup);
    }
  }
}
