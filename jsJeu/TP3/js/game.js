var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//Canvas
var divArena;
var canArena;
var conArena;
var ArenaWidth = 500;
var ArenaHeight = 300;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) 
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
///////////////////////////////////



/////////////////////////////////
// Hero Player
var imgPlayer = new Image();
imgPlayer.src = "./assets/Ship/f1.png";
var xPlayer = 20;
var yPlayerSpeed = 10;
var yPlayer = 100;
var PlayerHeight = 15;
var PlayerWidth = 32;
var PlayerImgHeight = 29;
var PlayerImgWidth = 64;
//Projectiles
var tabProj = new Array();
var projSpeed = 10;
/////////////////////////////////
// Alien
const NB_ALIEN = 20;
const BASE_XPOS_ALI = ArenaHeight;
const TAILLE_ALIEN_X = 15;
const TAILLE_ALIEN_Y = 15;
var tabAlien = new Array();
var tabAlienVisibles = new Array();
var alienGen = false;
var imgAlien = new Image();
imgAlien.src = "./assets/Enemy/eSpritesheet_40x30.png";
var compteurPosAli = 0;
var alienSpeed = 1;
var compteurNumAlien = 0;
/////////////////////////////////
// Gestion
var compteur = 0;
/////////////////////////////////


class Projectile {
    constructor(height, width, x, y, color) {
        this.hProj = height;
        this.wProj = width;
        this.xPosProj = x;
        this.yPosProj = y;
        this.colorProj = color;
    }

    draw(){
        conArena.fillStyle = this.colorProj;
        conArena.fillRect(this.xPosProj, this.yPosProj, this.hProj, this.wProj);
    }

    clear(){
        //conArena.fillStyle = "blue";
        conArena.clearRect(this.xPosProj-10, this.yPosProj, this.hProj+1, this.wProj+1);
    }

    movement(){
        this.draw();
        this.clear();
        this.xPosProj += projSpeed;
    }
}

class Alien {
    constructor(x, y) {
        this.hAli = 15;
        this.wAli = 15;
        this.xPosAli = x;
        this.yPosAli = y;
        //this.xImgAli = xImg;
        this.yImgAli = 30;
        this.compteurImg = 0;
    }

    draw(){
        //conArena.fillStyle = "green";
        //conArena.fillRect(this.xPosAli, this.yPosAli, this.hAli, this.wAli); //test
        conArena.drawImage(imgAlien, 0, this.yImgAli, 40, 30, this.xPosAli, this.yPosAli, this.hAli, this.wAli);
               //image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur
               //sx et sy = pos dans l'img
               //sLargeur et sHauteur = taille dans l'img
               //dx et dy = pos sur le canva
               //dLargeur et dHauteur = taille sur le canva
    }

    clear(){
        //conArena.fillStyle = "blue";
        conArena.clearRect(this.xPosAli, this.yPosAli, this.hAli+1, this.wAli+1);
    }

    clearPos(){
        this.xPosAli = BASE_XPOS_ALI;
    }

    movement(){
        this.clear();
        this.draw();
        this.compteurImg++;
        this.compteurImg = this.compteurImg%10;
        if(this.compteurImg === 5){
            this.yImgAli += 30;
            this.yImgAli = this.yImgAli%180;
        }
        this.xPosAli -= alienSpeed;
    }
}

function genererAliens(){
    var min=10;
    var max=200;
    var random = (Math.round(Math.random() * (max - min) + min));
    for(var x = 0; x < NB_ALIEN; x++){
        tabAlien.push(new Alien(BASE_XPOS_ALI, random));
        random = (Math.round(Math.random() * (max - min) + min)%100);
    }
    alienGen = true;
    //console.log(tabAlien);
}



function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    clearItems();

    compteur++;
    compteur = compteur%100;
    if(compteur === 10){
        if(alienGen === false){
            genererAliens();
        }
        if(tabAlienVisibles.length === NB_ALIEN+1){
            let a = tabAlienVisibles.pop(); //enlève des visibles l'alien situé à la fin du tab
            let pos = tabAlien.indexOf(a);
            tabAlien[pos].clearPos();
        }

        tabAlienVisibles.push(tabAlien[compteurPosAli]); //ajoute en visible l'alien situé au début du tab
        compteurPosAli++;
        compteurPosAli = compteurPosAli%NB_ALIEN;
        //console.log(tabAlienVisibles);
    }
    
    var keycode;
    for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.UP) {
                    if(yPlayer > 0)
                        yPlayer -= yPlayerSpeed;
                }
                if(keycode == keys.DOWN) {
                    if(yPlayer < 130)
                        yPlayer += yPlayerSpeed;
                } 
                if(keycode == keys.SPACE) {
                    tabProj.push(new Projectile(5, 2, xPlayer+(PlayerWidth*1.35), yPlayer+7, "yellow"));
                }             
            }
        keyStatus[keycode] = false;
    }
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    conArena.drawImage(imgPlayer, 0,0,PlayerImgWidth,PlayerImgHeight, xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    tabProj.map(e => e.movement());
    tabAlienVisibles.forEach(e => e.movement());
}

function clearItems() {
    "use strict"; 
    conArena.clearRect(xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    //tabProj.map(e => e.clear());
    //tabProj.length = 0;
}

function updateGame() {
    "use strict"; 
    updateScene();
    updateItems();
}

function drawGame() {
    "use strict"; 
    drawScene();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);


    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
