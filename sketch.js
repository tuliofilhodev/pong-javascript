function preload() {
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  
  createCanvas(600, 400);
  trilha.loop(0,1,0.3);
}

function draw() {
  
  background(0);
  mostraBolinha();
  movimentaBolinha();
  antiBug();
  verificaBolinha();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisao();
  colisaoBiblioteca(xRaquete, yRaquete);
  mostrarRaquete(xOponente, yOponente);
  movimentaOponente();
  colisaoBiblioteca(xOponente, yOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
}

function mostraBolinha() {
  
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaBolinha() {
  
  if (xBolinha + raio> width ||
    xBolinha - raio< 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio> height ||
    yBolinha - raio< 0){
    velocidadeyBolinha *= -1;
  }
}

function mostrarRaquete(x,y) {
  
  fill(color(0,255,0));
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete() {

  if(keyIsDown(UP_ARROW) &&
    (yRaquete > 0)){
    yRaquete -= 4;
  }

  if(keyIsDown(DOWN_ARROW) &&
    (yRaquete + alturaRaquete < height)){
    yRaquete += 4;
  }
}

//function movimentaOponente() {
//  
//  
//      if(keyIsDown(87) &&
//             (yRaquete > 0)){
//       yOponente -= 4;}
//
//      if(keyIsDown(83) &&
//          (yOponente + alturaOponente < height)){
//        yOponente += 4;}
//}

function verificaColisao() {
  
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete +   alturaRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
  }
}

function colisaoBiblioteca(x, y) {
  
  colisao =
collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colisao){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaOponente() {
  
  velocidadeYOponente = yBolinha/1.6 - yOponente - comprimentoRaquete / 2 - 15;
  yOponente += velocidadeYOponente  + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar() {
  
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  stroke(255);
  rect(180, 7, 40, 24);
  fill(255);
  noStroke();
  text(meusPontos, 200, 26);
  fill(color(255, 140, 0));
  stroke(255);
  rect(380, 7, 40, 24);
  fill(255);
  noStroke();
  text(pontosOponente, 400, 26);
}

function marcaPonto() {
  
  if (xBolinha > 585) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15) {
    pontosOponente += 1;
    ponto.play();
  }
}

function antiBug() {
  
  if (xBolinha  < 9){
    xBolinha = 30
  }
  if (xBolinha> 591){
    xBolinha = 570
  }

}

function calculaChanceDeErrar() {
  
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
      chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro /2;

//Variáveis do movimento da bolinha
let velocidadexBolinha = 8;
let velocidadeyBolinha = 8;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 100;

//Variáveis do oponente
let xOponente = 585;
let yOponente = 150;
let comprimentoOponente = 10;
let alturaOponente = 100;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colisao = false;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;