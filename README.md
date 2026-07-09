# 🎬 CineList

**CineList** é um aplicativo mobile desenvolvido com **React Native (Expo)** para descobrir filmes, pesquisar títulos, visualizar informações detalhadas e criar uma **Watchlist** personalizada com notas e resenhas.

Os dados dos filmes são obtidos através da **API do TMDB (The Movie Database)**, enquanto as informações da Watchlist são armazenadas no **Firebase Firestore**.

---

## 📱 Funcionalidades

- 🎥 Explorar os filmes mais populares
- 🔍 Buscar filmes por título
- 📖 Visualizar detalhes (sinopse, nota, data de lançamento e pôster)
- ⭐ Adicionar filmes à Watchlist
- 📝 Avaliar filmes com nota e resenha
- ✏️ Editar avaliações e resenhas
- 🗑️ Remover filmes da Watchlist
- ✨ Animação no botão de adicionar
- 🧭 Navegação com Bottom Tabs e Stack Navigator

---

## 🛠️ Tecnologias

- React Native
- Expo
- React Navigation
- Firebase Firestore
- TMDB API
- React Native Animated

---

## 🚀 Como executar

### Pré-requisitos

- Node.js 16+
- npm
- Expo Go ou emulador Android/iOS
- Conta no TMDB
- Projeto no Firebase

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/CineList.git
cd CineList
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as APIs

Crie o arquivo:

```text
src/services/tmdbApi.js
```

Adicione sua API Key do TMDB.

Depois crie:

```text
src/firebase/firebaseConfig.js
```

e configure seu projeto Firebase.

### 4. Execute o aplicativo

```bash
npx expo start
```

Depois basta abrir o **Expo Go** e escanear o QR Code ou executar em um emulador.

---

## 📂 Estrutura do Projeto

```text
CineList
│
├── src
│   ├── firebase
│   │   └── firebaseConfig.js
│   │
│   ├── navigation
│   │   └── AppNavigator.js
│   │
│   ├── screens
│   │   ├── ExploreScreen.js
│   │   ├── DetailScreen.js
│   │   └── WatchlistScreen.js
│   │
│   ├── services
│   │   └── tmdbApi.js
│   │
│   └── components
│
├── App.js
├── app.json
├── package.json
└── README.md
```

---

## ☁️ Banco de Dados

O projeto utiliza o **Firebase Firestore** para armazenar:

- Filme salvo
- Nota do usuário
- Resenha
- Data de criação

---

## 🎬 API

Os dados dos filmes são fornecidos pela **The Movie Database (TMDB)**.

https://www.themoviedb.org/

---

## 👨‍💻 Autor

Pablo Henrique Dias Segundo

---
## 📄 Licença
Este projeto foi desenvolvido para fins educacionais.
