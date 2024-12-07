let magnet;
let faucet;
let lamp;
let waterFlow = false;
let lampOn = false;
let waterAmount = 0;
let faucetX = 200, faucetY = 200;
let magnetRotating = false; // Controle do giro do imã
let squares = []; // Array para armazenar os quadrados
let dragManager; // Objeto para gerenciar o arrasto dos quadrados
let copper;
let illustrativeLampImg; // Variável para a imagem da lâmpada ilustrativa
let magneticPileImg;  // Imagem para a pilha magnética
let woodImg; // Imagem da madeira
let faucetImg; // Imagem da torneira
let waterParticles = []; // Array para armazenar as partículas de água
let startMessageTime = 0;  // Tempo inicial da mensagem de início
let successMessageTime = 0;  // Tempo inicial da mensagem de sucesso
let showStartMessage = true;  // Flag para exibir a mensagem de início
let showSuccessMessage = false;  // Flag para exibir a mensagem de sucesso


function setup() {
  createCanvas(600, 400);
  
  // Carrega a imagem da mesa (supondo que ela esteja na pasta 'assets' com o nome 'table.png')
  tableImage = loadImage('images/cenario2.png');  // Substitua pelo caminho correto da sua imagem
  
  copperImg = loadImage('images/copper.png');  // Substitua pelo caminho correto da sua imagem
  
   illustrativeLampImg = loadImage('images/lampada.png');  // Carrega a imagem da lâmpada ilustrativa
   magneticPileImg = loadImage('images/pilha.png');  // Carrega a imagem da pilha magnética
   woodImg = loadImage('images/madeira.png'); // Carrega a imagem da madeira
  faucetImg = loadImage('images/torneira.png'); // Carrega a imagem da torneira
  
  // Criação do imã com eixo de rotação
  magnet = new Magnet(width / 2-25, height / 2+50, 100);
  
  // Criação da torneira
  faucet = new Faucet(faucetX+170, faucetY-100);
  
  // Criação da lâmpada
  lamp = new Lamp(width - 450, 150);

  // Criando dois quadrados com cores diferentes
  squares.push(new Square(100, 300, 50, color(255, 0, 0, 0)));  // Quadrado Vermelho
  squares.push(new Square(300, 300, 50, color(0, 255, 0, 0)));  // Quadrado Verde

  // Inicializando o gerenciador de arraste
  dragManager = new DragManager(squares);
  
  // A mensagem "Acenda a lâmpada" será mostrada por 3 segundos ao começar o jogo
  startMessageTime = millis();  // Marca o tempo de início da mensagem
}

function draw() {
  background(220);
  
   // Desenha a imagem da mesa como fundo
  image(tableImage, 0, 0, width, height+50);  // Ajusta a imagem para cobrir todo o fundo
  
  // Verificar se a mensagem inicial ainda deve ser mostrada
  if (showStartMessage && millis() - startMessageTime < 3000) {
    showMessage("Acenda a lâmpada");
  } else {
    showStartMessage = false;  // Desativa a exibição da mensagem inicial após 3 segundos
  }
  
   // Verifica se o usuário conseguiu ligar a torneira e acender a lâmpada
  if (waterFlow && lampOn && !showSuccessMessage) {
    successMessageTime = millis();  // Marca o tempo de início da mensagem de sucesso
    showSuccessMessage = true;  // Habilita a exibição da mensagem de sucesso
  }
  
  // Verificar se a mensagem de sucesso deve ser mostrada
  if (showSuccessMessage && millis() - successMessageTime < 3000) {
    showMessage("Você Conseguiu");
  } else {
    showSuccessMessage = false;  // Desativa a exibição da mensagem de sucesso após 3 segundos
  }
  // Desenha a parede à direita da tela
  fill(150, 75, 0); // Cor da parede (marrom)
  rect(width - 153, 0, 500, height); // Desenha um retângulo como parede
  
  // Desenha a estaca preta
  fill(0, 0, 0); // Cor da parede (marrom)
  rect(width -330, 250, 10, height); // Desenha um retângulo como parede
  
  // Desenha a estaca branca
  fill(255, 255, 255); // Cor da parede (marrom)
  rect(width -800, 145, 350, 15, height); // Desenha um retângulo como parede
  
  
  // Remove as bordas para todos os objetos desenhados
  noStroke();  // Remove as bordas
  
  // Defina o ângulo de rotação (em radianos)
  let angle = PI / 2; // Exemplo de rotação de 45 graus (PI/4 radianos)

  // Traduza o sistema de coordenadas para o centro da imagem
  push(); // Salva o estado atual do sistema de coordenadas
  translate(width / 2, height / 2); // Move o sistema de coordenadas para o centro
  rotate(angle); // Aplica a rotação
  
  // Desenha a imagem, ajustando sua posição para centralizar a rotação
  image(copperImg, -copperImg.width / 2+200, -copperImg.height / 2+350, width - 675, height - 500);
  
  pop(); // Restaura o estado anterior do sistema de coordenadas

  // Desenha a imagem da madeira girando ao redor de seu próprio eixo
  let scaleFactor = 0.3; // Fator de escala (50%)
  let newWidth = woodImg.width * scaleFactor * 2;
  let newHeight = woodImg.height * scaleFactor;

  // Salva o estado atual do sistema de coordenadas
  push(); 

  // Traduza o sistema de coordenadas para o centro da madeira
  translate(width / 2-20, height / 2 + 45); // Move o sistema para o centro da madeira

  // Aplica a rotação com base no ângulo do imã
  rotate(magnet.angle);

  // Desenha a madeira com o centro no ponto de rotação
  image(woodImg, -newWidth / 2 , -newHeight / 2, newWidth, newHeight);

  pop(); // Restaura o estado do sistema de coordenadas
  
  // Atualiza o controle do giro do imã
  if (waterFlow) {
    magnetRotating = true; // O imã começa a girar
  } else {
    magnetRotating = false; // O imã para de girar
  }
  
  magnet.update(magnetRotating); // Passa a variável para o imã
  magnet.display();
  
  // Desenha a torneira
  faucet.display();
  
  // Lógica para controlar a lâmpada
  if (magnetRotating) {
    lampOn = true; // Acende a lâmpada automaticamente se o imã estiver girando
  } else {
    lampOn = false; // Apaga a lâmpada quando o imã parar de girar
  }
  
  // Desenha a lâmpada
  lamp.display();
  
  // Se a água está fluindo, simula o aumento do nível da água
  if (waterFlow) {
    waterAmount += 5.0;
    if (waterAmount > 500) waterAmount = 500;
     // Gera novas partículas de água
    waterParticles.push(new WaterParticle(faucet.x + faucet.width / 2, faucet.y + faucet.height / 2));
  }

  // Desenha a imagem da torneira sobre a torneira
  image(faucetImg, faucet.x, faucet.y - 10, faucet.width + 50, faucet.height + 50); 
  
  // Desenha as partículas de água
  for (let i = waterParticles.length - 1; i >= 0; i--) {
    let particle = waterParticles[i];
    particle.update();
    particle.display();
    
    // Remove partículas que já morreram (ficaram transparentes)
    if (particle.isDead()) {
      waterParticles.splice(i, 1);
    }
  }
  
  // Atualiza e exibe os quadrados
  dragManager.update();
  dragManager.display();
}

function showMessage(message) {
  textSize(32);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(message, width / 2, height / 2);
}

// Partículas de água
class WaterParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(7, 15); // Tamanho aleatório da partícula
    this.speedY = random(3, 5); // Velocidade de movimento para baixo
    this.life = 255; // Vida da partícula (de 255 a 0)
  }

  update() {
    this.y += this.speedY; // Move a partícula para baixo
    this.life -= 1; // A partícula vai ficando mais transparente com o tempo
  }

  display() {
    noStroke();
    fill(0, 50, 250, 180, this.life); // Cor azul e com transparência
    ellipse(this.x-2, this.y+35, this.size+5);
    noStroke();
    fill(255, 255, 255, 100, this.life); // Cor azul e com transparência
    ellipse(this.x-2, this.y+35, this.size-10);
  }

  isDead() {
    return this.life <= 0; // Verifica se a partícula morreu
  }
}

// Imã que gira
class Magnet {
  constructor(x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.angle = 0;
    this.rotationSpeed = 0.1;
  }
  
  update(shouldRotate) {
    if (shouldRotate) {
      this.angle += this.rotationSpeed; // Gira o imã
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    // Desenha o imã (simbolicamente, com cores para indicar norte e sul)
    strokeWeight(8);
    line(0, 0, this.len, 0); // Lado Norte
    strokeWeight(2);
    line(0, 0, -this.len, 0); // Lado Sul
    stroke(0, 0, 0); // Cor do Norte
    ellipse(this.len, 0, 0, 0); // Ponto do Norte
    stroke(0, 0, 0); // Cor do Sul
    ellipse(-this.len, 0, 0, 0); // Ponto do Sul
    pop();
  }
}

class Faucet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;  // Tamanho original da torneira
    this.height = 40; // Tamanho original da torneira
    this.clicked = false;  // Variável para controlar o clique
    this.waterActivated = false; // Indica se o fluxo de água foi ativado
    
    // Ajustando a área de clique
    this.clickAreaWidth = 20;  // Largura da área de clique
    this.clickAreaHeight = 20; // Altura da área de clique
  }
  
  display() {

    
    // Verifica se o clique ocorreu dentro da área da torneira e se a torneira pode ser acionada
    if (this.isMouseOver() && this.canTurnOnWater()) {
      if (mouseIsPressed && !this.clicked) {
        waterFlow = !waterFlow;  // Alterna entre abrir e fechar a torneira
        if (!waterFlow) {
          waterAmount = 0;  // Se a torneira fechar, a água some
        }
        this.clicked = true;  // Marca que o clique foi realizado
      } else if (!mouseIsPressed) {
        this.clicked = false;  // Reseta o clique quando o mouse é solto
      }
    }
  }
  
  // Verifica se os quadrados estão na posição correta
  canTurnOnWater() {
    let redSquare = squares[0]; // Quadrado Vermelho
    let greenSquare = squares[1]; // Quadrado Verde

    // Verifica se o quadrado vermelho está grudado no imã/volante
    let redOnFaucet = dist(redSquare.x + redSquare.size / 2, redSquare.y + redSquare.size / 2, faucet.x + faucet.width / 2-100, faucet.y + faucet.height / 2 +150) < 25;

    // Verifica se o quadrado verde está grudado na lâmpada
    let greenOnLamp = dist(greenSquare.x + greenSquare.size / 2, greenSquare.y + greenSquare.size / 2, lamp.x, lamp.y) < 50;

    return redOnFaucet && greenOnLamp; // Retorna true se ambos os quadrados estiverem na posição correta
  }
  
  // Verifica se o mouse está sobre a área da torneira
  isMouseOver() {
    return mouseX > this.x -20 && mouseX < this.x + this.width +40 &&
           mouseY > this.y -20 && mouseY < this.y + this.height +40;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7); // Tamanho aleatório da partícula
    this.speedX = random(-2, 2); // Velocidade em X (aumentada)
    this.speedY = random(-2, 2); // Velocidade em Y (aumentada)
    this.life = 255; // Vida da partícula (de 255 a 0)
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 5; // A partícula vai ficando mais transparente com o tempo
  }

  display() {
    noStroke();
    fill(255, 255, 0, this.life); // Cor amarela e com transparência
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.life <= 0; // Verifica se a partícula morreu
  }
}

// Lâmpada que acende e apaga
class Lamp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 30;
    this.particles = [];  // Inicializando o array de partículas
  }
  
  display() {
    // Simula a lâmpada acesa e apagada
    if (lampOn) {
      fill(255, 255, 0); // Lâmpada acesa
      ellipse(this.x, this.y, this.diameter, this.diameter);  // Desenha a lâmpada
      
      // Gerar novas partículas
      this.createParticles();
    } else {
      fill(100); // Lâmpada apagada
      ellipse(this.x, this.y, this.diameter, this.diameter);  // Desenha a lâmpada apagada
    }

    // Atualiza e exibe as partículas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.update();
      particle.display();
      
      // Remove partículas que já morreram (ficaram transparentes)
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  // Cria novas partículas a partir da lâmpada
  createParticles() {
    // Aumentei a frequência de criação de partículas (gerando mais partículas)
    if (frameCount % 1 === 0) { // A cada quadro, cria uma nova partícula
      this.particles.push(new Particle(this.x, this.y));
    }
  }
}
// Classe para os quadrados
class Square {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = col;
    this.isDragging = false;
  }

  display() {
    
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    
    if (this.color.levels[0] === 255) { // Quadrado Vermelho
      push(); // Salva o estado atual do sistema de coordenadas
      translate(this.x + this.size / 2, this.y + this.size / 2); // Move o sistema de coordenadas para o centro do quadrado
      rotate(magnet.angle); // Aplica a rotação do imã à pilha magnética
      image(magneticPileImg, -this.size / 2 - 25, -13, this.size + 45, this.size - 25); // Desenha a pilha magnética girando com o imã
      pop(); // Restaura o estado do sistema de coordenadas
    }
    
    // Se o quadrado é verde, exibe a imagem da lâmpada ilustrativa dentro dele
    if (this.color.levels[1] === 255) { // Verde tem um valor alto em "G" (green)
      image(illustrativeLampImg, this.x-25, this.y-25, this.size+50, this.size+50);
    }
  }

  startDrag() {
    this.isDragging = true;
  }

  stopDrag() {
    this.isDragging = false;
  }

  update() {
    if (this.isDragging) {
      this.x = mouseX - this.size / 2;
      this.y = mouseY - this.size / 2;
    } else {
      // Se o quadrado está perto do imã (volante) ou lâmpada, gruda automaticamente
      if (this.color.levels[0] === 255 && dist(this.x + this.size / 2, this.y + this.size / 2, magnet.x, magnet.y) < 50) {
        this.x = magnet.x - this.size / 2;
        this.y = magnet.y - this.size / 2;
      }
      // Se o quadrado verde está perto da lâmpada, gruda automaticamente
      if (this.color.levels[1] === 255 && dist(this.x + this.size / 2, this.y + this.size / 2, lamp.x, lamp.y) < 50) {
        this.x = lamp.x - this.size / 2;
        this.y = lamp.y - this.size / 2;
      }
    }
  }
}

// Gerenciador de arrasto para os quadrados
class DragManager {
  constructor(squares) {
    this.squares = squares;
  }

  update() {
    for (let square of this.squares) {
      if (mouseIsPressed && !square.isDragging && this.isMouseOverSquare(square)) {
        square.startDrag();
      }
      if (!mouseIsPressed && square.isDragging) {
        square.stopDrag();
      }
      square.update();
    }
  }

  display() {
    for (let square of this.squares) {
      square.display();
    }
  }

  isMouseOverSquare(square) {
    return mouseX > square.x && mouseX < square.x + square.size && mouseY > square.y && mouseY < square.y + square.size;
  }
}
