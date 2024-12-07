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


## 🔮 **Futuras Melhorias**

1. Adicionar mais fases com diferentes conceitos físicos.
2. Implementar um sistema de pontuação.
3. Introduzir desafios mais complexos, como obstáculos ou temporizadores.

---

## 📝 **Notas**

Este projeto foi desenvolvido como uma ferramenta educativa para estudantes de Física e Computação, oferecendo uma abordagem interativa para o aprendizado de conceitos teóricos.
