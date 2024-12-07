# Jogo de Física - README

Este é um jogo educativo desenvolvido para explorar conceitos de Física no contexto da Ciência da Computação. Ele é composto por minigames onde cada fase apresenta um desafio interativo relacionado a um conceito físico.

---

## 🎮 **Descrição do Jogo**

O jogador controla um personagem que deve interagir com o ambiente para alcançar um objetivo. Nesta fase específica, o objetivo é gerar atrito suficiente para acumular energia estática e, em seguida, tocar a maçaneta (representada por uma parede) para tomar um choque e completar o desafio. 

---

## 🚀 **Funcionalidades Principais**

### 1. **Movimentação do Personagem**
- O personagem se move pelas setas do teclado (`←` e `→`).
- Ao andar sobre o tapete, partículas são geradas para representar a acumulação de energia estática.

### 2. **Barra de Progresso**
- Uma barra no canto superior esquerdo mostra o progresso da acumulação de energia estática.
- Quando a barra chega a 100%, o jogador pode tocar na maçaneta.

### 3. **Colisão com a Maçaneta**
- Ao atingir a maçaneta com energia acumulada, partículas de choque são geradas, e o jogo exibe uma mensagem de "Você morreu!", simbolizando o efeito do choque.

### 4. **Menu Inicial**
- Tela inicial com um botão **Play** para iniciar o jogo.
- Um botão **Ajuda** exibe um popup com informações sobre o objetivo do jogo.

### 5. **Música e Efeitos Sonoros**
- Uma trilha sonora toca durante o jogo.
- Um som específico é reproduzido ao tocar a maçaneta.

---

## 📜 **Estrutura do Código**

### **1. Configuração Inicial**
- **`preload`**: Carrega as imagens e os sons necessários.
- **`setup`**: Configura o canvas e inicializa os botões e o popup.

### **2. Menu do Jogo**
- Desenha uma tela inicial com imagens de fundo e botões interativos.

### **3. Lógica do Jogo**
- O jogo começa ao clicar no botão **Play**.
- Durante o jogo, as funções principais incluem:
  - **Movimento do personagem**: Controlado pelas setas.
  - **Geração de partículas**: Representam o atrito ao andar no tapete.
  - **Detecção de colisão**: Identifica quando o personagem toca a maçaneta após acumular energia suficiente.
  
### **4. Partículas**
- A classe `Particle` cria partículas que representam energia estática ou partículas de choque.

---

## 🎯 **Objetivo**

O objetivo é ensinar conceitos de Física de forma lúdica, como o fenômeno de energia estática gerada por atrito. 

- **Como completar a fase**: Movimente o personagem para acumular energia ao andar no tapete e toque na maçaneta para experimentar o choque elétrico.

---

## 📖 **Como Jogar**

1. Abra o jogo.
2. Clique no botão **Play**.
3. Use as setas `←` e `→` para mover o personagem.
4. Acumule energia ao andar sobre o tapete.
5. Toque na maçaneta (parede) quando a barra de progresso atingir 100%.

---

## 🛠 **Tecnologias Utilizadas**

- **Linguagem:** JavaScript
- **Biblioteca:** p5.js (para gráficos e interação)
- **Áudio:** p5.sound para efeitos sonoros e música

---

## 📚 **Conceitos de Física Explorados**

- **Energia Estática:** Demonstrada pelo acúmulo de partículas ao caminhar no tapete.
- **Atrito:** Representado pelo movimento no tapete como fonte de energia.

---

 * FASE 2 * 
1. Estrutura do Jogo
O jogo é dividido em três telas:

Tela Inicial: Introduz o jogador ao jogo e oferece uma breve descrição sobre a missão.
Tela do Jogo: Onde o jogador interage, colocando componentes no circuito, como resistores e pilhas.
Tela Final: Aparece quando o jogador completa o circuito corretamente, mostrando uma mensagem de vitória.
2. Criação da Malha de Conexões
A função criarMalha() gera uma matriz de pontos para representar as conexões possíveis no circuito. Essa malha é 4x4 (com tamanho configurado na constante TAMANHO_MALHA), e os pontos são distribuídos de forma que eles possam ser conectados horizontal e verticalmente.

3. Função de Conexões e Objetivos
Conexões: Existem duas matrizes (conexoesHorizontais e conexoesVerticais) que armazenam as conexões entre os pontos. Cada célula dessas matrizes pode ter valores diferentes:
0 (sem conexão),
1 (conexão normal),
2 (pilha),
3 (resistor).
Objetivo: A função inicializarObjetivo() define as conexões corretas que o jogador deve criar para concluir o circuito corretamente.
4. Componente Selecionado
O jogador pode escolher entre três componentes para inserir no circuito:

Resistor: Representado pela imagem de um resistor.
Pilha: Representada por uma imagem de uma bateria.
Fio: Representado pela conexão básica entre os pontos.
Quando o jogador clica em um componente disponível (resistor ou pilha), ele se torna o componente "selecionado", e o próximo clique no ponto da malha vai adicionar esse componente.
5. Desenho do Circuito
A função desenharCircuito() desenha as conexões entre os pontos e desenha os componentes como a pilha e o resistor nas posições apropriadas. A cor das conexões é determinada pela função definirCorConexao().
6. Verificação do Circuito
A função verificarCircuito() verifica se as conexões feitas pelo jogador estão corretas. Se as conexões estiverem incorretas, o jogo toca um som de erro e não avança para a tela final. Se o circuito estiver correto, o jogo toca um som de sucesso e avança para a tela final.

7. Funções Auxiliares
desenharResistor(): Desenha um resistor nas coordenadas especificadas.
desenharPilha(): Desenha a representação da pilha (bateria).
mousePressed(): A lógica de clicar para selecionar os componentes e fazer as conexões é gerenciada aqui. Ela verifica se o clique foi em algum componente na barra inferior ou se foi em uma conexão da malha.
8. Som
Sons são usados para feedback durante o jogo:

Som de circuito correto: Tocado quando o circuito é montado corretamente.
Som de circuito incorreto: Tocado quando o jogador faz uma conexão errada.
Sugestões e Observações:
Aprimorar Interatividade: A parte de interação do jogador com a malha pode ser mais detalhada. Você pode adicionar uma lógica para que, se o jogador errar, ele consiga fazer ajustes facilmente.
Expandir Objetivos: A lógica de objetivos e regras do circuito pode ser expandida para incluir mais componentes e desafios.
Estado Final: A tela final pode ter um botão para reiniciar o jogo ou mostrar mais informações educativas sobre os conceitos de eletricidade.
Esse esboço de código já está bem estruturado, com uma divisão clara entre as fases do jogo, a lógica de construção do circuito e a verificação de resultados.

* FASE 3 *

Objetivo do Jogo: O objetivo deste jogo é interagir com diferentes elementos para controlar um fluxo de água e acionar uma lâmpada, com base em comportamentos físicos simulados no ambiente. O jogador precisa manipular dois quadrados coloridos (vermelho e verde), um imã rotativo, uma torneira e uma lâmpada para alcançar o funcionamento correto do sistema.

Elementos do Jogo:
Imã (Magnet):

O imã tem um eixo de rotação e gira quando a água está fluindo.
O imã é representado por uma linha com duas extremidades: uma vermelha (representando o norte) e uma azul (representando o sul).
O movimento do imã é controlado pelo estado da água fluindo.
Torneira (Faucet):

A torneira controla o fluxo de água. Quando acionada, ela libera água que preenche um retângulo representando o nível de água.
A água só pode fluir se um quadrado vermelho (chave para o imã) estiver na posição correta, e o quadrado verde (chave para a lâmpada) também estiver posicionado corretamente.
Lâmpada (Lamp):

A lâmpada acende automaticamente quando o imã começa a girar, e apaga quando o imã para de girar.
O controle da lâmpada está diretamente vinculado à rotação do imã.
Quadrados (Squares):

Dois quadrados (vermelho e verde) podem ser arrastados pelo jogador. O quadrado vermelho deve ser colocado perto do imã, enquanto o quadrado verde deve ser colocado perto da lâmpada.
Quando os quadrados são posicionados corretamente, eles permitem a ativação do fluxo de água.
Água:

A água flui da torneira quando esta é acionada. O nível da água aumenta até um limite máximo, simulando o fluxo.
A água é representada visualmente como um retângulo azul que cresce à medida que o fluxo de água aumenta.
Mecânica do Jogo:
Manipulação dos Quadrados:

O jogador pode arrastar os quadrados com o mouse. Cada quadrado "gruda" automaticamente no imã ou na lâmpada quando está suficientemente próximo.
O quadrado vermelho deve ser colocado perto do imã, enquanto o quadrado verde deve ser posicionado perto da lâmpada.
Fluxo de Água:

O fluxo de água só é ativado quando ambos os quadrados estão na posição correta (vermelho no imã e verde na lâmpada).
A torneira pode ser ligada ou desligada clicando sobre ela. Quando ligada, a água começa a fluir, e o nível de água aumenta até o limite máximo.
Rotação do Imã:

Quando a água está fluindo, o imã começa a girar, o que acende a lâmpada automaticamente.
A lâmpada simula um comportamento de acendimento ou apagamento com base na rotação do imã.
Interação e Desafios:
O jogador precisa posicionar corretamente os quadrados para acionar o fluxo de água e fazer com que o imã gire, ativando a lâmpada.
A física dos quadrados que "grudam" no imã ou na lâmpada torna a interação mais dinâmica, exigindo que o jogador mova os quadrados de maneira estratégica.
O objetivo final é criar uma sequência de eventos onde a água flui, o imã gira e a lâmpada acende.
Tecnologias Utilizadas:
P5.js: A biblioteca de JavaScript para visualizações interativas foi usada para criar o ambiente visual, controlar os elementos e a física do jogo, além da interação com o mouse.


* FASE 4 *

Resumo:
O jogo "Refração Laser" é um jogo de física no qual o jogador deve usar um emissor de laser e um espelho para direcionar o feixe de laser até um alvo, utilizando refração e reflexão. O objetivo é atingir o alvo com precisão dentro de um tempo limitado, e o jogador pode interagir com os elementos do jogo arrastando o emissor e o espelho.

Componentes do Jogo:
Laser: O feixe de laser pode ser disparado a partir de um emissor. O ângulo de emissão pode ser ajustado, e a intensidade do feixe depende da interação com outros objetos no cenário.
Emissor de Laser: Um retângulo que o jogador pode arrastar para reposicionar o ponto de origem do laser. A direção do laser é controlada pelas teclas de seta.
Espelho: Um triângulo que pode ser arrastado para modificar a direção do laser. O feixe pode se refletir ou refratar dependendo da posição e da orientação do espelho.
Alvo: O objetivo do jogo é acertar o laser no alvo, representado por uma imagem circular no cenário.
Paredes: Obstáculos no cenário que podem desviar o laser se ele entrar em contato com eles.
Temporizador: O jogador tem um tempo limitado para completar o objetivo do jogo.
Estrutura do Código:
Variáveis Principais:

laserRect: Define a área clicável para mover o emissor de laser.
laserOrigin: Define a origem do laser.
laserAngle: Controle do ângulo do laser.
mirror: Representa o espelho e suas propriedades (posição e vértices).
target: Representa o alvo.
walls: Lista de paredes que podem refletir ou bloquear o laser.
timer: Temporizador para limitar o tempo do jogador.
laserColor: Cor do laser, que pode ser alterada pelo jogador.
Funções Importantes:

preload(): Carrega as imagens e fontes utilizadas no jogo.
setup(): Configura o ambiente de jogo (tela, variáveis, etc.).
setupGame(): Inicializa as variáveis específicas do jogo (posição inicial do laser, espelho, alvo e paredes).
draw(): Função principal de renderização, desenhando os elementos na tela e controlando o fluxo do jogo (começo, jogo, vitória).
drawLaser(): Desenha o laser e calcula as interações com objetos (reflexão, refração).
drawMirror(): Desenha o espelho.
drawTarget(): Desenha o alvo.
drawWalls(): Desenha as paredes no cenário.
mousePressed(), mouseDragged(), mouseReleased(): Controlam a interação do mouse com o emissor e o espelho.
keyPressed(): Controla as teclas para rotacionar o laser e ativar/desativar o feixe.
calculateMirrorVertices(): Calcula as posições dos vértices do espelho com base na sua posição e tamanho.
Interação:

O jogador pode mover o emissor de laser e o espelho com o mouse.
O laser pode ser ativado/desativado pressionando a tecla space.
O ângulo do laser pode ser ajustado usando as setas direita e esquerda.
O jogador deve ajustar a posição do espelho e do emissor para refletir ou refratar o laser até atingir o alvo.
Física:

Reflexão: O laser pode se refletir no espelho dependendo da sua orientação. A interação física é baseada na fórmula de reflexão de luz.
Refração: O laser também pode se refratar ao passar por um espelho, com base no índice de refração do material do espelho.
Fluxo do Jogo:
Tela Inicial:

Apresenta o título "Refração Laser" com um botão para começar o jogo.
O botão "Jogar" inicia o jogo e muda o estado para "game".
Durante o Jogo:

O jogador deve controlar o emissor e o espelho para guiar o laser até o alvo.
O temporizador é exibido, e o jogador deve acertar o alvo dentro do limite de tempo.
O jogo oferece instruções na tela e um seletor de cor para personalizar o laser.
Tela de Vitória:

Quando o alvo é atingido, o jogo muda para a tela de vitória.
O jogador é parabenizado e pode reiniciar o jogo ou voltar à tela inicial.
Conclusão:
"Refração Laser" é um jogo interativo que utiliza conceitos de física (reflexão e refração) e permite ao jogador experimentar com a direção e a cor do laser para atingir um alvo. Com um temporizador e um sistema de interações físicas, o jogo oferece um desafio interessante, combinando raciocínio lógico e precisão para vencer.

## 🔮 **Futuras Melhorias**

1. Adicionar mais fases com diferentes conceitos físicos.
2. Implementar um sistema de pontuação.
3. Introduzir desafios mais complexos, como obstáculos ou temporizadores.

---

## 📝 **Notas**

Este projeto foi desenvolvido como uma ferramenta educativa para estudantes de Física e Computação, oferecendo uma abordagem interativa para o aprendizado de conceitos teóricos.
