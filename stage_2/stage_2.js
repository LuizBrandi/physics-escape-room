let laserRect; // Área de clique para mover o emissor
let laserOrigin;
let laserAngle = 0;
let mirror;
let target;
let walls = [];
let laserOn = false;
let draggingMirror = false;
let draggingEmitter = false; // Controle de arraste do emissor
let state = "start"; // Estados: "start", "game", "victory"
let targetIcon; // Ícone do alvo
let hideo; // Variável para armazenar a fonte
let techno; // Variável para armazenar a fonte
let prolamina; // Variável para armazenar a fonte
let laserColorPicker;
let laserColor = 'red'; // Cor inicial do laser

// Variáveis do temporizador
let timer = 20; // Tempo restante em segundos
let lastUpdateTime; // Última vez que o temporizador foi atualizado

function preload() {
  targetIcon = loadImage("path_to_target_icon.png");
  octo = loadFont('assets/TT Octosquares Trial Regular.ttf');
  znic = loadFont('assets/zrnic rg.otf');
  smack = loadFont('assets/Smack Laideth Down 2024.otf');
  raider = loadFont('assets/raidercrusader.ttf');
}
function setup() {
  createCanvas(800, 600);

  // Configurar o seletor de cores
  laserColorPicker = createColorPicker('#ff0000'); // Cor inicial em hexadecimal (vermelho)
  laserColorPicker.position(720, 20);
  laserColorPicker.input(() => {
    laserColor = laserColorPicker.value();
  });

  // Configurações do jogo
  setupGame();
}

function setupGame() {
  // Inicializar variáveis do jogo
  laserRect = { x: 80, y: height - 120, w: 100, h: 25 };
  laserOrigin = createVector(laserRect.x + laserRect.w, laserRect.y + laserRect.h / 2);

  mirror = { x: 410, y: 450, size: 50, vertices: [] };
  calculateMirrorVertices();

  target = { x: 700, y: 200, radius: 30, hit: false };

  walls = [
    { x: 400, y: 500, w: 20, h: 200 },
    { x: 400, y: 0, w: 20, h: 400 }
  ];

  // Inicializar o temporizador
  timer = 20;
  lastUpdateTime = millis();
}

function draw() {
  // Atualizar cursor baseado na interação
  if (draggingEmitter) {
    cursor('grabbing'); // Cursor enquanto arrasta o emissor
  } else if (
    mouseX > laserRect.x &&
    mouseX < laserRect.x + laserRect.w &&
    mouseY > laserRect.y &&
    mouseY < laserRect.y + laserRect.h
  ) {
    cursor('grab'); // Cursor para indicar que é possível pegar o emissor
  } else {
    cursor('default'); // Cursor padrão
  }
  
  switch (state) {
    case "start":
      drawStartScreen();
      break;
    case "game":
      drawGame();
      break;
    case "victory":
      drawVictoryScreen();
      break;
  }
}

function drawStartScreen() {
  background(30); // Fundo escuro

  // Título do jogo com estilo futurista
  textFont(raider);
  textAlign(CENTER, CENTER);
  textSize(80);
  fill(0, 255, 255); // Cores neon 
  text("Refração Laser", width / 2, height / 3);

   // Botão "Jogar"
  let buttonX = width / 2 - 75;
  let buttonY = height / 2;
  let buttonWidth = 150;
  let buttonHeight = 50;

  fill(0, 255, 255); // Cor de fundo neon
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Botão com bordas arredondadas

  fill(0);
  textSize(24);
  textFont(smack); 
  text("Jogar", width / 2, buttonY + buttonHeight / 2);

  // Detectar clique no botão
  if (
    mouseX > buttonX && mouseX < buttonX + buttonWidth &&
    mouseY > buttonY && mouseY < buttonY + buttonHeight &&
    mouseIsPressed
  ) {
    state = "game";
  }
}

function drawGame() {
  background(20); // Fundo escuro com tom de cinza para o jogo

  if (target.hit) {
    state = "victory";
    return;
  }
  
   // Atualizar o temporizador
  let currentTime = millis();
  if (currentTime - lastUpdateTime >= 1000) {
    timer--;
    lastUpdateTime = currentTime;
  }

  if (timer <= 0) {
    resetGame();
    state = "start";
    return;
  }

  // Atualizar a posição da origem do laser
  laserOrigin.set(
    laserRect.x + laserRect.w / 2,
    laserRect.y + laserRect.h / 2
  );

  if (laserOn) {
    drawLaser();
  }

  drawLaserEmitter();
  drawMirror();
  drawTarget();
  drawWalls();
  
// Exibir o temporizador com estilo
  textAlign(RIGHT, BOTTOM);
  textFont(smack); 
  textSize(72);
  fill(255, 0, 255); // Cor neon para o temporizador
  //text(`Tempo restante: ${timer}s`, width / 2, 270);
  text(`${timer}s`,780,600);

  
  
  // Instruções com estilo
  textAlign(LEFT, TOP);
  textSize(14);
  textFont(znic); 
  fill(255, 255, 255);
  text(
    "Instruções:\n" +
    "Arraste o emissor do laser com o mouse\n" +
    "Mexa o triângulo com o mouse\n" +
    "Rotacione a direção do emissor nas setinhas (Direita e Esquerda)\n" +
    "Desligue e ligue o laser com espaço\n\n" +
    "Para vencer, acerte o feixe no alvo!",
    10, 10
  );

  // Texto para escolher a cor do laser
  fill(255, 255, 255);
  textSize(14);
  textFont(znic); 
  text('Escolha a cor do laser:', 580, 28);
}

function drawVictoryScreen() {
  background(20); // Fundo escuro

  textAlign(CENTER, CENTER);
  textSize(64);
  fill(0, 255, 255); // Cor neon para vitória
  textFont(smack); 
  text("Você venceu!", width / 2, height / 2 - 40);

  textSize(24);
  fill(255);
  textFont(znic); 
  text(
    "Parabéns! Você usou a refração para guiar o laser!",
    width / 2,
    height / 2 + 40
  );

  // Botão para voltar ao início com estilo futurista
  let buttonX = width / 2 - 75;
  let buttonY = height - 150;
  let buttonWidth = 150;
  let buttonHeight = 50;

  fill(0, 255, 255);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);

  fill(0);
  textSize(14);
  textFont(smack); 
  text("Jogar Novamente", width / 2, buttonY + buttonHeight / 2);

  if (
    mouseX > buttonX && mouseX < buttonX + buttonWidth &&
    mouseY > buttonY && mouseY < buttonY + buttonHeight &&
    mouseIsPressed
  ) {
    resetGame();
    state = "start";
  }
}

function resetGame() {
  setupGame(); // Reinicia o estado do jogo
}


function drawLaser() {
  let laserDirection = p5.Vector.fromAngle(laserAngle).mult(1000);
  let laserEnd = p5.Vector.add(laserOrigin, laserDirection);

  for (let wall of walls) {
    let intersection = lineRect(
      laserOrigin.x, laserOrigin.y,
      laserEnd.x, laserEnd.y,
      wall.x, wall.y, wall.w, wall.h
    );

    if (intersection) {
      laserEnd = intersection.copy();
      break;
    }
  }

  let refractResult = lineTriangle(
    laserOrigin.x, laserOrigin.y, laserEnd.x, laserEnd.y, mirror.vertices
  );

  if (refractResult) {
    let refractPoint = refractResult.point;
    let normal = refractResult.normal;

    let n1 = 1; // Ar
    let n2 = 1.5; // Material do espelho

    let incoming = p5.Vector.sub(refractPoint, laserOrigin).normalize();
    let cosTheta1 = -incoming.dot(normal);
    let sinTheta2Squared = (n1 / n2) ** 2 * (1 - cosTheta1 ** 2);

    if (sinTheta2Squared <= 1) {
      let cosTheta2 = sqrt(1 - sinTheta2Squared);
      let refractedDirection = p5.Vector.add(
        p5.Vector.mult(normal, (n1 / n2) * cosTheta1 - cosTheta2),
        p5.Vector.mult(incoming, n1 / n2)
      ).normalize().mult(1000);

      laserEnd = refractPoint.copy();
      let secondEnd = p5.Vector.add(refractPoint, refractedDirection);

      for (let wall of walls) {
        let intersection = lineRect(
          refractPoint.x, refractPoint.y,
          secondEnd.x, secondEnd.y,
          wall.x, wall.y, wall.w, wall.h
        );

        if (intersection) {
          secondEnd = intersection.copy();
          break;
        }
      }

      if (lineCircle(
        refractPoint.x, refractPoint.y,
        secondEnd.x, secondEnd.y,
        target.x, target.y,
        target.radius
      )) {
        target.hit = true;
      }

      stroke('blue');
      line(refractPoint.x, refractPoint.y, secondEnd.x, secondEnd.y);
    }
  }
  
  stroke(laserColor); // Usa a cor selecionada no laser principal
  line(laserOrigin.x, laserOrigin.y, laserEnd.x, laserEnd.y);
}


function drawMirror() {
  fill(200); // Cinza metálico
  noStroke();
  triangle(
    mirror.vertices[0].x, mirror.vertices[0].y,
    mirror.vertices[1].x, mirror.vertices[1].y,
    mirror.vertices[2].x, mirror.vertices[2].y
  );
}

function drawTarget() {
  // Desenhar a imagem no lugar do círculo
  imageMode(CENTER);
  stroke(0, 255, 255); // Neon para o alvo
  strokeWeight(5);
  fill(0);
  image(targetIcon, target.x, target.y, target.radius * 2, target.radius * 2);
}

function drawLaserEmitter() {
  push();
  translate(laserOrigin.x, laserOrigin.y); // Mover para o centro do emissor
  rotate(laserAngle); // Rotacionar
  noStroke();

  // Corpo da lanterna com estilo futurista
  fill(80); // Cinza metálico para o corpo
  rectMode(CENTER);
  rect(0, 0, laserRect.w, laserRect.h, 5); // Corpo com cantos arredondados

  // "Bico" da lanterna estilizado
  fill(60); // Um cinza mais claro
  triangle(
    laserRect.w / 2, -laserRect.h / 2, // Ponto superior direito do retângulo
    laserRect.w / 2, laserRect.h / 2,  // Ponto inferior direito do retângulo
    laserRect.w / 2 + 15, 0            // Ponto do bico
  );

  // Detalhes futuristas da lanterna (ex.: botão)
  fill(150); // Cinza claro
  rect(-laserRect.w / 4, 0, 10, 15, 2); // Botão no corpo

  pop();
}


function drawWalls() {
  fill(50, 50, 50); // Cor metálica escura para as paredes
  noStroke();
  walls.forEach(wall => {
    rect(wall.x, wall.y, wall.w, wall.h);
  });
}

function mousePressed() {
  // Detecta se clicou no emissor
  if (
    mouseX > laserRect.x &&
    mouseX < laserRect.x + laserRect.w &&
    mouseY > laserRect.y &&
    mouseY < laserRect.y + laserRect.h
  ) {
    draggingEmitter = true; // Começa a arrastar o emissor
  }

  // Detecta se clicou no espelho
  if (
    collidePointTriangle(
      mouseX,
      mouseY,
      mirror.vertices[0].x,
      mirror.vertices[0].y,
      mirror.vertices[1].x,
      mirror.vertices[1].y,
      mirror.vertices[2].x,
      mirror.vertices[2].y
    )
  ) {
    draggingMirror = true; // Começa a arrastar o espelho
  }
}

function mouseDragged() {
  if (draggingEmitter) {
    laserRect.x = mouseX - laserRect.w / 2;
    laserRect.y = mouseY - laserRect.h / 2;
  }

  if (draggingMirror) {
    mirror.x = mouseX;
    mirror.y = mouseY;
    calculateMirrorVertices();
  }
}

function mouseReleased() {
  draggingMirror = false; // Para de arrastar o espelho
  draggingEmitter = false; // Para de arrastar o emissor
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    laserAngle -= 0.1; // Rotaciona no sentido anti-horário
  } else if (keyCode === RIGHT_ARROW) {
    laserAngle += 0.1; // Rotaciona no sentido horário
  } else if (key === ' ') {
    laserOn = !laserOn; // Alterna o estado do laser
  }
}


function calculateMirrorVertices() {
  let size = mirror.size;
  let height = (sqrt(3) / 2) * size;
  mirror.vertices = [
    createVector(mirror.x, mirror.y - height / 2),
    createVector(mirror.x - size / 2, mirror.y + height / 2),
    createVector(mirror.x + size / 2, mirror.y + height / 2)
  ];
}

function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  let ac = createVector(cx - x1, cy - y1);
  let ab = createVector(x2 - x1, y2 - y1);
  let abLen = ab.mag();
  ab.normalize();
  let proj = ac.dot(ab);
  proj = constrain(proj, 0, abLen);

  let closestPoint = createVector(x1, y1).add(ab.mult(proj));
  let distance = dist(closestPoint.x, closestPoint.y, cx, cy);

  return distance <= r;
}

function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
  let left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  let right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  let top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  let bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  return left || right || top || bottom;
}

function lineTriangle(x1, y1, x2, y2, vertices) {
  for (let i = 0; i < 3; i++) {
    let next = (i + 1) % 3;
    let intersection = lineLine(
      x1, y1, x2, y2,
      vertices[i].x, vertices[i].y,
      vertices[next].x, vertices[next].y
    );

    if (intersection) {
      let p1 = vertices[i];
      let p2 = vertices[next];
      let edge = p5.Vector.sub(p2, p1);
      let normal = createVector(-edge.y, edge.x).normalize();

      let toLaser = p5.Vector.sub(laserOrigin, intersection).normalize();
      if (normal.dot(toLaser) < 0) {
        normal.mult(-1);
      }

      return { point: intersection.copy(), normal: normal.copy() };
    }
  }
  return null;
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
           ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
           ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    let intersectionX = x1 + uA * (x2 - x1);
    let intersectionY = y1 + uA * (y2 - y1);
    return createVector(intersectionX, intersectionY);
  }

  return null;
}