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


function setup() {
  createCanvas(600, 400);
  
  // Carrega a imagem da mesa (supondo que ela esteja na pasta 'assets' com o nome 'table.png')
  tableImage = loadImage('cenario2.png');  // Substitua pelo caminho correto da sua imagem
  
  copperImg = loadImage('copper.png');  // Substitua pelo caminho correto da sua imagem
  
  // Criação do imã com eixo de rotação
  magnet = new Magnet(width / 2-25, height / 2+50, 100);
  
  // Criação da torneira
  faucet = new Faucet(faucetX+170, faucetY-100);
  
  // Criação da lâmpada
  lamp = new Lamp(width - 450, 150);

  // Criando dois quadrados com cores diferentes
  squares.push(new Square(100, 300, 50, color(255, 0, 0)));  // Quadrado Vermelho
  squares.push(new Square(300, 300, 50, color(0, 255, 0)));  // Quadrado Verde

  // Inicializando o gerenciador de arraste
  dragManager = new DragManager(squares);
}

function draw() {
  background(220);
  
   // Desenha a imagem da mesa como fundo
  image(tableImage, 0, 0, width, height+50);  // Ajusta a imagem para cobrir todo o fundo
  
  // Defina o ângulo de rotação (em radianos)
  let angle = PI / 2; // Exemplo de rotação de 45 graus (PI/4 radianos)

  // Traduza o sistema de coordenadas para o centro da imagem
  push(); // Salva o estado atual do sistema de coordenadas
  translate(width / 2, height / 2); // Move o sistema de coordenadas para o centro
  rotate(angle); // Aplica a rotação
  
  // Desenha a imagem, ajustando sua posição para centralizar a rotação
  image(copperImg, -copperImg.width / 2+200, -copperImg.height / 2+350, width - 675, height - 500);
  
  pop(); // Restaura o estado anterior do sistema de coordenadas
  
  
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
  }
  
  // Simula a água fluindo para baixo
  if (waterAmount > 0) {
    fill(0, 0, 255);
    rect(faucetX + 170, faucetY -60, 20, waterAmount);
  }

  // Atualiza e exibe os quadrados
  dragManager.update();
  dragManager.display();
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
    stroke(255, 0, 0); // Cor do Norte
    ellipse(this.len, 0, 10, 10); // Ponto do Norte
    stroke(0, 0, 255); // Cor do Sul
    ellipse(-this.len, 0, 10, 10); // Ponto do Sul
    pop();
  }
}

// Torneira que libera água
class Faucet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.clicked = false;  // Variável para controlar o clique
  }
  
  display() {
    fill(150);
    rect(this.x, this.y, this.width, this.height);
    fill(255, 0, 0);
    ellipse(this.x + this.width / 2, this.y + this.height, 10, 10);
    
    // Verifica se a torneira pode ser acionada
    if (this.canTurnOnWater()) {
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
    let redOnFaucet = dist(redSquare.x + redSquare.size / 2, redSquare.y + redSquare.size / 2, faucet.x + faucet.width/ 2-100, faucet.y + faucet.height / 2 +150) < 25;

    // Verifica se o quadrado verde está grudado na lâmpada
    let greenOnLamp = dist(greenSquare.x + greenSquare.size / 2, greenSquare.y + greenSquare.size / 2, lamp.x, lamp.y) < 50;

    return redOnFaucet && greenOnLamp; // Retorna true se ambos os quadrados estiverem na posição correta
  }
}

// Lâmpada que acende e apaga
class Lamp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 30;
  }
  
  display() {
    // Simula a lâmpada acesa e apagada
    if (lampOn) {
      fill(255, 255, 0); // Lâmpada acesa
    } else {
      fill(100); // Lâmpada apagada
    }
    ellipse(this.x, this.y, this.diameter, this.diameter);
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
