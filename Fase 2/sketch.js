let pontos = []; // Matriz de pontos na malha
let conexoesHorizontais = []; // Conexões horizontais entre os pontos
let conexoesVerticais = []; // Conexões verticais entre os pontos
let objetivoHorizontais = []; // Objetivo das conexões horizontais
let objetivoVerticais = []; // Objetivo das conexões verticais
let componenteSelecionado = 'fio'; // Componente atualmente selecionado
let faseConcluida = false; // Indica se a fase foi concluída
let verificarButton; // Botão para verificar o circuito
const TAMANHO_MALHA = 4; // Tamanho da malha 4x4
const ESPACO_ENTRE_PONTOS = 100; // Espaço entre pontos na malha
let pilhaDisponivel = true; // Indica se a pilha está disponível para uso
let resistoresDisponiveis = 2; // Número de resistores disponíveis
let larguraComponente = 60; // Largura padrão das imagens dos componentes
let alturaComponente = 60; // Altura padrão das imagens dos componentes
let imgLampada;
let resistorParaLampada = false; // Controla se o resistor foi transformado em lâmpada
// let telaInicial = true; // Variável para controlar se está na tela inicial
let estadoAtual = "inicial"; // "inicial" ou "jogo"

let imagemDeFundo;
let imagemAdicional;

function preload() {
  // Carregar a imagem de fundo e a imagem adicional
  imagemDeFundo = loadImage('circuit.jpeg');
  imagemAdicional = loadImage('blueprint.jpg');
  imagemResistor = loadImage('lampada_apagada.png');
  imagemLampada = loadImage('2_pendant_lights.png');
  imagemPilha = loadImage('battery.png');
  imagemPilhaCircuito = loadImage('battery_circuit.png')
  somCircuitoCorreto = loadSound('light-switch-flip.mp3');
  somCircuitoIncorreto = loadSound('shock.mp3');

}

function setup() {
  createCanvas(800, 600);
  criarMalha();
  inicializarConexoes();
  inicializarObjetivo();

  botaoVerificar = createButton("Verificar Circuito");
  botaoVerificar.position(20, height / 2 - 20); // Lado esquerdo, centralizado verticalmente
  botaoVerificar.size(150, 40); // Tamanho do botão
  botaoVerificar.mousePressed(verificarCircuito); // Função chamada ao clicar no botão
  botaoVerificar.hide(); // Esconde o botão no início
}


function draw() {
  if (estadoAtual === "inicial") {
    telaInicial();
  } else if (estadoAtual === "jogo") {
    telaDoJogo();
  } else if (estadoAtual === "fim") {
    telaFinal();
  }
}


function telaInicial() {
  background(240); // Cor de fundo da tela inicial
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
    text(
    "Bem-vindo à sala de Circuitos Elétricos!\n\n" +
    "Para passar desse desafio,\n monte o circuito que corresponde às lâmpadas \nindicadas na imagem.\n\n\n\n\n\n\n" +
    "Escolha componentes na barra inferior\n e clique nos pontos para conectá-los.\n" +
    "Observação: Para este caso, se uma das lâmpadas for removida,\n a outra continuará funcionando.\n\n" +
    "Clique em qualquer lugar para começar.",
    width / 2,
    height / 2
  );

  // Desenhar a imagem com as lâmpadas
  let posicaoX = width / 2 - 100; // Ajuste de posição horizontal
  let posicaoY = height / 2 + 100; // Ajuste de posição vertical
  image(imagemLampada, posicaoX-50, posicaoY-200, 300, 150); // Ajuste de tamanho da imagem
}

function telaDoJogo() {
  background(240); // Apenas como fallback
  image(imagemDeFundo, 0, 0, width, height); // Fundo ocupando todo o canvas
  let posicaoX = width / 2 - 200;
  let posicaoY = height / 2 - 200;
  image(imagemAdicional, posicaoX, posicaoY, 500, 400); // Desenha imagem adicional

  desenharCircuito();
  desenharComponentes();

  if (faseConcluida) {
    fill(0, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Fase Concluída!", width / 2, height / 2);
  }

  botaoVerificar.show(); // Mostra o botão na tela do jogo
}




function criarMalha() {
  let offsetX = width / 2 - (TAMANHO_MALHA - 1) * ESPACO_ENTRE_PONTOS / 2;
  let offsetY = height / 2 - (TAMANHO_MALHA - 1) * ESPACO_ENTRE_PONTOS / 2;

  for (let i = 0; i < TAMANHO_MALHA; i++) {
    pontos[i] = [];
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      pontos[i][j] = {
        x: offsetX + j * ESPACO_ENTRE_PONTOS,
        y: offsetY + i * ESPACO_ENTRE_PONTOS
      };
    }
  }
}

function inicializarConexoes() {
  // Inicializa as conexões horizontais
  for (let i = 0; i < TAMANHO_MALHA; i++) {
    conexoesHorizontais[i] = [];
    for (let j = 0; j < TAMANHO_MALHA - 1; j++) {
      conexoesHorizontais[i][j] = 0; // Sem conexão
    }
  }

  // Inicializa as conexões verticais
  for (let i = 0; i < TAMANHO_MALHA - 1; i++) {
    conexoesVerticais[i] = [];
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      conexoesVerticais[i][j] = 0; // Sem conexão
    }
  }

  // Adicionar conexões horizontais predefinidas
  conexoesHorizontais[0][0] = 1; 
  conexoesHorizontais[0][1] = 1;
  conexoesHorizontais[0][2] = 1;
  conexoesHorizontais[3][2] = 1;
  conexoesHorizontais[3][1] = 1;
  conexoesHorizontais[3][0] = 1;

  // Adicionar conexões verticais predefinidas
  conexoesVerticais[0][3] = 1;
  conexoesVerticais[0][2] = 1;
  conexoesVerticais[1][2] = 1;
  conexoesVerticais[1][3] = 1;
  conexoesVerticais[1][0] = 1;
  conexoesVerticais[2][0] = 1;
}

function inicializarObjetivo() {
  // Inicializa as matrizes objetivo
  for (let i = 0; i < TAMANHO_MALHA; i++) {
    objetivoHorizontais[i] = [];
    for (let j = 0; j < TAMANHO_MALHA - 1; j++) {
      objetivoHorizontais[i][j] = 0;
    }
  }

  for (let i = 0; i < TAMANHO_MALHA - 1; i++) {
    objetivoVerticais[i] = [];
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      objetivoVerticais[i][j] = 0;
    }
  }

  // Definir conexões obrigatórias
  objetivoHorizontais[0][0] = 1; 
  objetivoHorizontais[0][1] = 1;
  objetivoHorizontais[0][2] = 1;
  objetivoHorizontais[3][2] = 1;
  objetivoHorizontais[3][1] = 1;
  objetivoHorizontais[3][0] = 1;

  objetivoVerticais[0][3] = 1;
  objetivoVerticais[0][2] = 1;
  objetivoVerticais[1][2] = 1;
  objetivoVerticais[1][3] = 1;
  objetivoVerticais[1][0] = 1;
  objetivoVerticais[0][0] = 2; // Pilha
  objetivoVerticais[2][0] = 1;
  objetivoVerticais[2][2] = 3; // Resistor
  objetivoVerticais[2][3] = 3; // Resistor
}

function desenharCircuito() {
  // Desenhar os pontos da malha
  for (let i = 0; i < TAMANHO_MALHA; i++) {
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      fill(255, 255, 255);
      ellipse(pontos[i][j].x, pontos[i][j].y, 20);
    }
  }

  strokeWeight(2);

  // Desenhar conexões horizontais
  for (let i = 0; i < TAMANHO_MALHA; i++) {
    for (let j = 0; j < TAMANHO_MALHA - 1; j++) {
      if (conexoesHorizontais[i][j] !== 0) {
        let cor = definirCorConexao(conexoesHorizontais[i][j]);
        stroke(cor);
        line(pontos[i][j].x, pontos[i][j].y, pontos[i][j + 1].x, pontos[i][j].y);

        // Adicionar o desenho da pilha se for do tipo 2
        if (conexoesHorizontais[i][j] === 2) {
          let xCentral = (pontos[i][j].x + pontos[i][j + 1].x) / 2;
          let yCentral = pontos[i][j].y;
          desenharPilha(xCentral, yCentral);
        }

        // Adicionar o desenho do resistor se for do tipo 3
        if (conexoesHorizontais[i][j] === 3) {
          let xCentral = (pontos[i][j].x + pontos[i][j + 1].x) / 2;
          let yCentral = pontos[i][j].y;
          desenharResistor(xCentral, yCentral, true); // Horizontal
        }
      }
    }
  }

  // Desenhar conexões verticais
  for (let i = 0; i < TAMANHO_MALHA - 1; i++) {
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      if (conexoesVerticais[i][j] !== 0) {
        let cor = definirCorConexao(conexoesVerticais[i][j]);
        stroke(cor);
        line(pontos[i][j].x, pontos[i][j].y, pontos[i + 1][j].x, pontos[i + 1][j].y);

        // Adicionar o desenho da pilha se for do tipo 2
        if (conexoesVerticais[i][j] === 2) {
          let xCentral = pontos[i][j].x;
          let yCentral = (pontos[i][j].y + pontos[i + 1][j].y) / 2;
          desenharPilha(xCentral, yCentral);
        }

        // Adicionar o desenho do resistor se for do tipo 3
        if (conexoesVerticais[i][j] === 3) {
          let xCentral = pontos[i][j].x;
          let yCentral = (pontos[i][j].y + pontos[i + 1][j].y) / 2;
          desenharResistor(xCentral, yCentral, false); // Vertical
        }
      }
    }
  }

  noStroke();
}

function desenharResistor(x, y, horizontal) {
  push();
  imageMode(CENTER); // Ajustar para centralizar a imagem
  if (horizontal) {
    image(imagemResistor, x, y, larguraComponente, alturaComponente); // Horizontal
  } else {
    push();
    translate(x, y);
    rotate(HALF_PI); // Rotaciona para vertical
    image(imagemResistor, 0, 0, larguraComponente, alturaComponente); // Vertical
    pop();
  }
  pop();
}




// Função para desenhar a representação da pilha
function desenharPilha(x, y) {
  stroke(255); // Cor branca
  strokeWeight(2);

  // Linha longa (abaixo)
  line(x - 10, y + 10, x + 10, y + 10);

  // Linha curta (acima)
  line(x - 5, y - 10, x + 5, y - 10);

  // Linha vertical saindo da linha curta (topo)
  line(x, y - 10, x, y - 45);

  // Linha vertical saindo da linha longa (inferior)
  line(x, y + 10, x, y + 45);
}



function definirCorConexao(tipo) {
  if (tipo === 1) return color(255, 255, 255); // Branco para conexões normais
  if (tipo === 2) return color(255, 255, 255); // Alterado de vermelho para branco
  if (tipo === 3) return color(255, 255, 255); // Azul para resistores
  return color(0); // Preto para sem conexão
}



function desenharComponentes() {
  const margemLateral = 50; // Espaçamento lateral
  const margemVertical = 20; // Espaçamento superior e inferior
  const larguraFundo = width - 2 * margemLateral; // Largura do retângulo de fundo
  const alturaFundo = 100 + 2 * margemVertical; // Altura do retângulo, incluindo margem superior e inferior
  const posicaoBase = height - 70; // Posição vertical dos componentes
  const espacamento = 100; // Espaçamento horizontal base
  const espaçamentoAdicional = 20; // Espaçamento adicional entre os resistores

  // Desenhar fundo para os componentes
  fill(0, 100, 0); // Cor verde escuro
  stroke(255); // Borda branca
  strokeWeight(4); // Espessura da borda
  rectMode(CORNER);
  rect(margemLateral, height - alturaFundo + 45, larguraFundo, alturaFundo - 65, 20); // Retângulo arredondado com bordas

  // Desativar borda para desenhar componentes
  noStroke();

  let contador = 0;

  // Desenhar Resistores disponíveis
  for (let i = 0; i < resistoresDisponiveis; i++) {
    let xPos = width / 2 - espacamento + contador * (50 + espaçamentoAdicional);
    image(imagemResistor, xPos, posicaoBase - 20, larguraComponente, alturaComponente);
    contador++;
  }

  // Desenhar Pilha disponível
  if (pilhaDisponivel) {
    let xPos = width / 2 + espacamento + contador * espaçamentoAdicional;
    image(imagemPilha, xPos - larguraComponente / 2, posicaoBase - alturaComponente / 2, larguraComponente, alturaComponente);
  }
}


// Modificar `mousePressed` para trabalhar com as imagens
function mousePressed() {
  if (estadoAtual === "inicial") {
    estadoAtual = "jogo"; // Muda para o estado do jogo
  } else if (estadoAtual === "fim") {
    estadoAtual = "fim"; // Reinicia o jogo
  } else {
    // Restante da lógica de mousePressed
    const posicaoBase = height - 70; // Posição vertical da barra
    const espacamento = 100; // Espaçamento horizontal entre os componentes

    // Detectar clique no Resistor
    for (let i = 0; i < resistoresDisponiveis; i++) {
      let xResistor = width / 2 - espacamento + i * 50;
      if (mouseX > xResistor && mouseX < xResistor + larguraComponente &&
          mouseY > posicaoBase - 20 && mouseY < posicaoBase - 20 + alturaComponente) {
        componenteSelecionado = 'resistor';
        return;
      }
    }

    // Detectar clique na Pilha
    let xPilha = width / 2 + espacamento - larguraComponente / 2;
    if (pilhaDisponivel &&
        mouseX > xPilha && mouseX < xPilha + larguraComponente &&
        mouseY > posicaoBase - alturaComponente / 2 && mouseY < posicaoBase + alturaComponente / 2) {
      componenteSelecionado = 'pilha';
      return;
    }

    // Código original para adicionar/remover conexões no circuito
    for (let i = 0; i < TAMANHO_MALHA; i++) {
      for (let j = 0; j < TAMANHO_MALHA - 1; j++) {
        if (dist(mouseX, mouseY, (pontos[i][j].x + pontos[i][j + 1].x) / 2, pontos[i][j].y) < 10) {
          if (conexoesHorizontais[i][j] !== 0) {
            if (conexoesHorizontais[i][j] === 2) pilhaDisponivel = true;
            if (conexoesHorizontais[i][j] === 3) resistoresDisponiveis++;
            conexoesHorizontais[i][j] = 0;
          } else {
            conexoesHorizontais[i][j] =
              componenteSelecionado === 'resistor' ? 3 :
              componenteSelecionado === 'pilha' ? 2 :
              1;

            if (componenteSelecionado === 'pilha') pilhaDisponivel = false;
            if (componenteSelecionado === 'resistor') resistoresDisponiveis--;
          }
          return;
        }
      }
    }

    for (let i = 0; i < TAMANHO_MALHA - 1; i++) {
      for (let j = 0; j < TAMANHO_MALHA; j++) {
        if (dist(mouseX, mouseY, pontos[i][j].x, (pontos[i][j].y + pontos[i + 1][j].y) / 2) < 10) {
          if (conexoesVerticais[i][j] !== 0) {
            if (conexoesVerticais[i][j] === 2) pilhaDisponivel = true;
            if (conexoesVerticais[i][j] === 3) resistoresDisponiveis++;
            conexoesVerticais[i][j] = 0;
          } else {
            conexoesVerticais[i][j] =
              componenteSelecionado === 'resistor' ? 3 :
              componenteSelecionado === 'pilha' ? 2 :
              1;

            if (componenteSelecionado === 'pilha') pilhaDisponivel = false;
            if (componenteSelecionado === 'resistor') resistoresDisponiveis--;
          }
          return;
        }
      }
    }
  }
}






function verificarCircuito() {
  for (let i = 0; i < TAMANHO_MALHA; i++) {
    for (let j = 0; j < TAMANHO_MALHA - 1; j++) {
      if (objetivoHorizontais[i][j] !== 0 && conexoesHorizontais[i][j] !== objetivoHorizontais[i][j]) {
        faseConcluida = false;
        somCircuitoIncorreto.play();
        setTimeout(() => {
          somCircuitoIncorreto.stop();  // Para o som após 2 segundos
        }, 2000);  // 2000 milissegundos = 2 segundos

        return;
      }
    }
  }

  for (let i = 0; i < TAMANHO_MALHA - 1; i++) {
    for (let j = 0; j < TAMANHO_MALHA; j++) {
      if (objetivoVerticais[i][j] !== 0 && conexoesVerticais[i][j] !== objetivoVerticais[i][j]) {
        faseConcluida = false;
        somCircuitoIncorreto.play();
        setTimeout(() => {
          somCircuitoIncorreto.stop();  // Para o som após 2 segundos
        }, 2000);  // 2000 milissegundos = 2 segundos
        return;
      }
    }
  }
  somCircuitoCorreto.play();
  estadoAtual = "fim";
  // faseConcluida = true;
   // Muda o estado para "fim" após completar o circuito corretamente
}


function telaFinal() {
  botaoVerificar.hide();
  background(240); // Cor de fundo da tela final
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(0);
  text(
    "Parabéns! Você concluiu o esse desafio!\n\n" +
    "O circuito que você montou demonstra o conceito de resistores em paralelo.\n\n" +
    "Em um circuito paralelo, os componentes estão conectados de forma que\n" +
    "cada um deles recebe a mesma tensão da fonte de energia. \n\n" +
    "Essa configuração permite que, mesmo se um resistor for desconectado ou\n" +
    "falhar, a corrente continue a fluir pelos outros caminhos.\n\n" +
    "Clique para voltar à tela inicial.",
    width / 2,
    height / 2
  );
}

