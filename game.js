let shipX
let shipY
let shipSlow

let bulletX
let bulletY

let bulletSpeed

let enemyX
let enemyY

let enemySize

let enemySpeed

let score

let playerHealth

let enemyShape

let heartX
let heartY

let heartSpeed

let heartSpawn

let enemyHealth

let enemyHealthBar

let enemyHealthMax

let bossX
let bossY
let bossSpeed
let bossHealth
let maxBossHealth

let dynamiteX
let dynamiteY

let dynamiteSpeed

let shipImage

let laserGreenImage

let backgroundImage

let meteorImage
let meteorImage2
let meteorImage3

let bossImage

let laserRedImage

let backgroundMusic

let laserFireSound

let pickUpHealthSound

let crashSound

let buttonPlay

let start

let musicVolumeSlider

let currentScene

function preload() {
  shipImage = loadImage('assets/playerShip1_red.png')
  laserGreenImage = loadImage('assets/laserGreen09.png')
  backgroundImage = loadImage('assets/purple.png')
  meteorImage = loadImage('assets/meteorBrown_big1.png')
  meteorImage2 = loadImage('assets/meteorBrown_big2.png')
  meteorImage3 = loadImage('assets/meteorGrey_big4.png')
  bossImage = loadImage('assets/enemyBlack1.png')
  laserRedImage = loadImage('assets/laserRed08.png')
  backgroundMusic = loadSound('assets/Space_Idea.mp3')
  laserFireSound = loadSound('assets/laser9.mp3')
  pickUpHealthSound = loadSound('assets/phaserUp6.mp3')
  crashSound = loadSound('assets/pepSound5.mp3')
}

function setup() {
  
  currentScene = "startScene"
  
  musicVolumeSlider = createSlider(0, 100)
  
  
  backgroundMusic.play()
  backgroundMusic.loop()
  
  

  
  createCanvas(600, 525);
  shipX = width/2
  shipY = height - 100
  
  shipSlow = 0.9
  
  frameRate(120)
  
  bulletX = 123551653161
  bulletY = 15353153613731
  
  
  score = 0
  
  playerHealth = 3
  
  spawnEnemy()
  
  rectMode(CENTER)
  
  spawnHeart()
  
  bossX = 0
  bossY = 40
  
  bossSpeed = random(5, 15)
  bossHealth = 3
  
  dynamiteX = bossX
  dynamiteY = bossY
  
  dynamiteSpeed = random(10, 25)
  
  shipImage.resize(50, 50)
  
  start = 1

}

function startScene(){
  musicVolumeSlider.position(0, 300)

  image(backgroundImage, 0, 0, width, height)
  rectMode(CORNERS)
  rect(0, 400, 200, 500)
  textSize(24)
  
  fill(0)
  
  textAlign(CENTER, CENTER)

  text('PLAY', 70, 460)
  
  textSize(12)
  fill('white')
  
 
  textAlign(LEFT, TOP)
  text(`How to Play:
1. Use the mouse to move the ship
2. Left click to shoot a laser 
NOTE - THERE IS ONLY ONE SHOT PER CLICK`, 10, 10)
  
  backgroundMusic.setVolume(musicVolumeSlider.value()/100)
  
  if (mouseIsPressed && mouseX < 200 && mouseY > 400) {
    currentScene = "level1Scene"
    musicVolumeSlider.position(10000, 300)

  }
}

function drawBackground() {
  imageMode(CORNERS)
  image(backgroundImage, 0, 0, width, height) 
}

function spawnHeart(){
  heartX = random(0, width)
  heartY = 0
  heartSpeed = random(2, 5)
  heartSpawn = random(1, 10)
  if(heartSpawn < 2.5){
    heartSpawn = 1
  }
}

function spawnEnemy(){
  enemyY = 0
  enemyX = random(0, width)
  enemySize = random(30, 100)
  enemySpeed = random(7, 13) 
  enemyShape = random(1, 4)
  if(enemyShape > 2.5){
    enemyShape = 3
  }else if(enemyShape < 1.5){
    enemyShape = 1
  }else if(enemyShape > 1.5){
    enemyShape = 2
  }
  enemyHealthLogic()
}

function draw() {
  background(220)
  drawBackground()
  
  if (currentScene == "startScene") {
    startScene()
  } else if (currentScene == "level1Scene") {
    level1Scene()
  } else if (currentScene == "bossGameScene") {
    bossGameScene()
  } else if (currentScene == "gameOverScene") {
    gameOverScene()
  } else if (currentScene == "gameWonScene") {
    gameWonScene()
  }
}

function level1Scene(){
  bulletLogic()

  shipLogic()

  enemyLogic()

  bulletHitLogic()
  
  playerHitEnemyLogic()

  healthLogic()
  
  drawScore()

  heartLogic()
  
  if(score > 150){
    currentScene = "bossGameScene"
  }
  if(playerHealth < 1){
    currentScene = "gameOverScene"
  }

}

function gameOverScene(){
  fill(random(255), random(255), random(255))
  textAlign(CENTER, CENTER)
  text("GAME OVER", width/2, height/2)
  
  fill('black')
  text(`Your score is: ${score}`, width/2, height/2 + 30)
  text("click to play again", width/2, height/2 + 60)
  
  if(mouseIsPressed){
    playerHealth = 3
    score = 0
    bossHealth = 50
    
    currentScene = 'startScene'
  }
}

function bulletHitLogic(){
  if(bulletY < enemyY + enemySize && bulletY > enemyY - enemySize && bulletX < enemyX + enemySize && bulletX > enemyX - enemySize){
    
    enemyHealth -= 1
    
    if(enemyHealth == 0){
      enemyX = 20000
      spawnEnemy()
      enemyHealthLogic()
    }
    
    enemyHealthBar -= enemyHealthBar/2
    
    bulletX = 20000
    
    score += 1
  }
}

function shipLogic(){
  
  let dx = mouseX - shipX
  let dy = mouseY - shipY
  
  shipX += dx * shipSlow
  shipY += dy * shipSlow
  
  
  imageMode(CENTER)
  image(shipImage, shipX, shipY)
  //textSize(50)
  //textAlign(CENTER, CENTER)
  //text("👾", shipX, shipY)
  

}

function enemyLogic(){
  
  //textSize(24)
  //text(`enemy health: ${enemyHealth}`, enemyX, enemyY - enemySize)
  
  healthBar ()
  
  fill('black')
  if(enemyShape == 1){
    imageMode(CENTER)
    image(meteorImage, enemyX, enemyY)
  }else if(enemyShape == 2){
    image(meteorImage2, enemyX, enemyY)
    imageMode(CENTER)
  }else {
    imageMode(CENTER)
    image(meteorImage3, enemyX, enemyY)
  }
  
  
  enemyY += enemySpeed
  
  if(enemyY > height){
    spawnEnemy()
  }


}

function drawScore (){
  fill('black')
  textSize(24)
  textAlign(RIGHT, TOP)
  text(`score: ${score}`, width - 20, 0)
}

function bulletLogic (){
  
  imageMode(CENTER)
  image(laserGreenImage, bulletX, bulletY)
  
  //textSize(40)
  //text("!", bulletX, bulletY)
  bulletY -= 30
  
  if (mouseIsPressed) {
    bulletY = shipY
    bulletX = shipX
    laserFireSound.play()
    laserFireSound.setVolume(1)
  }
}

function playerHitEnemyLogic() {
  if(shipY < enemyY + enemySize && shipY > enemyY - enemySize && shipX < enemyX + enemySize && shipX > enemyX - enemySize){
    spawnEnemy()
    playerHealth -= 1
    crashSound.play()
  }
  
}

function healthLogic(){
  textAlign(LEFT, TOP)
  text(`health: ${playerHealth}`, 0, 0)
  
}

function heartLogic(){

  if(heartSpawn == 1 && shipY < heartY +20 && shipY > heartY - 20 && shipX > heartX - 20 && shipX < heartX + 20){
    playerHealth += 1
    heartX = 200000000
    spawnHeart()
    pickUpHealthSound.play()
    
  }

  if(heartY > height){
    spawnHeart()
  }
  
  if(heartSpawn == 1){

    textAlign(CENTER, CENTER)
    text("💖", heartX, heartY)
  }
  heartY += heartSpeed
}

function enemyHealthLogic(){
  enemyHealthMax = ceil(random(1, 4))
  enemyHealth = enemyHealthMax
}

function healthBar (){
  let healthPercent = enemyHealth/enemyHealthMax
  rectMode(CORNERS)
  fill('white')
  rect(enemyX - enemySize, enemyY - enemySize - 10, 
       enemyX + enemySize, enemyY - enemySize - 10 + 5)

  fill('red')
  rect(enemyX - enemySize, enemyY - enemySize - 10, 
       enemyX - enemySize + 2*enemySize*healthPercent, enemyY - enemySize - 10 + 5)
  
}

function dynamiteFallLogic(){
  imageMode(CENTER)
  image(laserRedImage, dynamiteX, dynamiteY)
  dynamiteY += dynamiteSpeed

  
  if(dynamiteY > height){
    dynamiteY = bossY 
    dynamiteX = bossX
    dynamiteSpeed = random(10, 25)
  }
}

function gameWonScene(){
  textAlign(CENTER)
  textSize(24)
  fill('white')
  text(`GGS Bro you are the ultimate 
EPIC Fortnite Gamer. Enjoy`, width/2, height/2)
  
  if(mouseIsPressed){
    currentScene = 'startScene'
  }

}

function bossLogic(){
  imageMode(CENTER)
  image(bossImage, bossX, bossY)
  bossX += bossSpeed
  textSize(24)
  textAlign(CENTER, CENTER)

  text(`clown health: ${bossHealth}`, bossX, bossY - 40)
  if(bossX > width - 100 || bossX < 0){
    bossSpeed *= -1
  }

}

function bulletHitBossLogic(){
  if(bulletY < bossY + 72 && bulletY > bossY - 72 && bulletX < bossX + 72 && bulletX > bossX - 72){
    bossHealth -= 1
    bulletX = 2000000
  }
  
}

function dyninamiteHitLogic(){
  if(shipY < dynamiteY + 40 && shipY > dynamiteY - 40 && shipX < dynamiteX + 40 && shipX > dynamiteX - 40){
    playerHealth -= 1
    dynamiteY = 200000000
    crashSound.play()
  }
}

function bossGameScene(){
  
  dyninamiteHitLogic()
  
  bulletLogic()

  shipLogic()

  drawScore()
  
  healthLogic()
  
  bossLogic()
  
  bulletHitBossLogic()
  
  dynamiteFallLogic()
  
  if(bossHealth < 1){
    currentScene = 'gameWonScene'
  }
  
  if(playerHealth < 1){
    currentScene = 'gameOverScene'
  }
  
}

