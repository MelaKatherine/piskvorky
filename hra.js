import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const gameArea = document.querySelector('.game__area');
const iconPlayer = document.querySelector('.game__icon--player');
const btnRestart = document.querySelector('.game__btn--restart');

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
  setTimeout(whoIsWinner, 300);
};

//pridat policka

const addArea = () => {
  gameArea.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    const button = document.createElement('button');
    button.classList.add('game__box');
    button.addEventListener('click', addPlayer);
    gameArea.appendChild(button);
  }
};

addArea();

/*const addArea = () => {
  gameArea.innerHTML = '';
  for (let i = 0; i < 100; i++) {
    gameArea.innerHTML += `<button class="game__box"></button>`;
  }
};*/

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

const whoIsWinner = async () => {
  const gameField = getField();
  const winner = findWinner(gameField);
  if (winner === 'o' || winner === 'x') {
    alert(`Vyhrál hráč se symbolem ${winner}.`);
    location.reload();
  } else if (winner === 'tie') {
    alert(`Hra skončila nerozhodně.`);
    location.reload();
  } else if (currentPlayer === 'cross') {
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          board: gameField,
          player: 'x', // Hledá tah pro křížek.
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    const { x, y } = data.position;
    const field = gameBox[x + y * 10];
    console.log('policko', field);
    field.click();
  }
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
