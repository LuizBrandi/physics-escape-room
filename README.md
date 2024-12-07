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

## 🔮 **Futuras Melhorias**

1. Adicionar mais fases com diferentes conceitos físicos.
2. Implementar um sistema de pontuação.
3. Introduzir desafios mais complexos, como obstáculos ou temporizadores.

---

## 📝 **Notas**

Este projeto foi desenvolvido como uma ferramenta educativa para estudantes de Física e Computação, oferecendo uma abordagem interativa para o aprendizado de conceitos teóricos.
