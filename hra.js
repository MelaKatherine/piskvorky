let currentPlayer = 'circle';

const gameArea = document.querySelector('.game__area');
const iconPlayer = document.querySelector('.game__icon--player');
const btnRestart = document.querySelector('.game__btn--restart');

const addArea = () => {
  for (let i = 0; i < 100; i++) {
    const gameBox = document.createElement('button');
    gameBox.classList.add('game__box');
    gameArea.appendChild(gameBox);
    gameBox.addEventListener('click', addPlayer);
  }
};

/*const addArea = () => {
  for (let i = 0; i < 100; i++) {
    gameArea.innerHTML = `<button class="game__box"></button>`;
  }
};*/

const addPlayer = (event) => {
  event.target.disabled = true;
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    iconPlayer.src = 'podklady/circle.svg';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    iconPlayer.src = 'podklady/cross.svg';
  }
};

const restart = (event) => {
  if (!window.confirm('Opravdu chceš začít znovu?')) {
    event.preventDefault();
  }
};

// gameBox.forEach((box) => {
//   box.addEventListener('click', addPlayer);
// });
addArea();
btnRestart.addEventListener('click', restart);
