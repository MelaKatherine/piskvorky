import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const gameArea = document.querySelector('.game__area');
const iconPlayer = document.querySelector('.game__icon--player');
const btnRestart = document.querySelector('.game__btn--restart');

/*const addArea = () => {
  for (let i = 0; i < 100; i++) {
    const gameBox = document.createElement('button');
    gameBox.classList.add('game__box');
    gameArea.appendChild(gameBox);
    gameBox.addEventListener('click', addPlayer);
  }
};
*/
//pridat policka

const addArea = () => {
  gameArea.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    gameArea.innerHTML += `<button class="game__box"></button>`;
  }
};
addArea();

const gameBox = document.querySelectorAll('.game__box');

// pole tahu
const getField = () => {
  let field = [];
  gameBox.forEach((box) => {
    if (box.classList.contains('board__field--circle')) {
      field.push('o');
    } else if (box.classList.contains('board__field--cross')) {
      field.push('x');
    } else {
      field.push('_');
    }
  });
  return field;
};

//kontrola vyherce

const whoIsWinner = () => {
  const gameField = getField();
  const winner = findWinner(gameField);
  if (winner === 'o' || winner === 'x') {
    alert(`Vyhrál hráč se symbolem ${winner}.`);
    location.reload();
  }
};

//pridavame krizek nebo kolecko
const addPlayer = (event) => {
  event.target.disabled = true;
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    iconPlayer.src = 'podklady/cross.svg';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    iconPlayer.src = 'podklady/circle.svg';
  }
  setTimeout(whoIsWinner, 3000);
};

//restart hry ano nebo ne
const restart = (event) => {
  if (!window.confirm('Opravdu chceš začít znovu?')) {
    event.preventDefault();
  }
};

gameBox.forEach((box) => {
  box.addEventListener('click', addPlayer);
});

btnRestart.addEventListener('click', restart);
